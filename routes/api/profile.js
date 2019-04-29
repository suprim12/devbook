const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
// Models
const { Users } = require("../../models/Users");
const { Profile, Validate } = require("../../models/Profile");
// Private Route for profile
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors } = Validate(req.body);
    if (errors) return res.status(400).send(errors.details[0].message);
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          return res.status(404).send("No profile");
        }
        res.json({ profile });
      })
      .catch(err => console.error(err));
  }
);
// Create or Edit Profile Route
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error } = Validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const newProfile = {};
    newProfile.user = req.user.id;
    newProfile.handle = req.body.handle;
    newProfile.company = req.body.company;
    newProfile.website = req.body.website;
    newProfile.location = req.body.location;
    newProfile.bio = req.body.bio;
    newProfile.status = req.body.status;
    newProfile.githubusername = req.body.githubusername;
    if (typeof req.body.skills !== "undefined") {
      newProfile.skills = req.body.skills.split(",");
    }
    // Social
    newProfile.social = {};
    newProfile.social.youtube = req.body.youtube;
    newProfile.social.facebook = req.body.facebook;
    newProfile.social.twitter = req.body.twitter;
    newProfile.social.linkedin = req.body.linkedin;
    newProfile.social.behance = req.body.behance;
    newProfile.social.instagram = req.body.instagram;
    // const result = new Profile(newProfile)
    //   .save()
    //   .then(profile => res.json(profile))
    //   .catch(err => res.json(err));
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // Update
          Profile.updateOne(
            { user: req.user.id },
            { $set: newProfile },
            { new: true }
          ).then(profile => res.json(profile));
        } else {
          // Create
          new Profile(newProfile)
            .save()
            .then(profile => res.json({ profile }))
            .catch(err => console.error(err));
          //-- Check Handle
          profile
            .findOne({ handle: req.user.handle })
            .then(profile => {
              console.log(profile);
              // Handle Already There
              if (profile) {
                res.status(400).json({ handle: "Handle Already Exist" });
              } else {
                // Save
                new Profile(newProfile)
                  .save()
                  .then(profile => res.json({ profile }))
                  .catch(err => console.error(err));
              }
            })
            .catch(err => console.error(err));
        }
      })
      .catch(err => console.error("findOne Error", err));
  }
);
console.log("will only be shown in profile api branch");
module.exports = router;
