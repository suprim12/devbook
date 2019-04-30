const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
// Models
const { Users } = require("../../models/Users");
const {
  Profile,
  Validate,
  ValidateExp,
  ValidateEdu
} = require("../../models/Profile");
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
    newProfile.social = {
      youtube: req.body.youtube,
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      linkedin: req.body.linkedin,
      behance: req.body.behance,
      instagram: req.body.instagram
    };
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
          //-- Check Handle
          Profile.findOne({ handle: newProfile.handle })
            .then(profile => {
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
// Route profile by handle
router.get("/handle/:handle", (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        return res.status(404).send("No profile found for this user.");
      }
      res.json(profile);
    })
    .catch(err => res.status(400).json(err));
});
// Route profile by id
router.get("/user/:id", (req, res) => {
  Profile.findOne({ user: req.params.id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        return res.status(404).send("No profile found for this user.");
      }
      res.json(profile);
    })
    .catch(err => res.status(400).json({ profile: "No Profile for users" }));
});
// All profiles
router.get("/all", (req, res) => {
  Profile.find()
    .populate("users", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        return res.status(404).send("No Profils Found.00");
      }
      res.json(profiles);
    })
    .catch(err => res.status(400).json({ profile: "No Profiles found" }));
});
// route experience
router.post(
  "/exprience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error } = ValidateExp(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        current: req.body.current,
        from: req.body.from,
        to: req.body.to,
        description: req.body.description
      };
      // Add Exprience array
      profile.exprience.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
  }
);
// route Education
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error } = ValidateEdu(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        field: req.body.field,
        location: req.body.location,
        current: req.body.current,
        from: req.body.from,
        to: req.body.to,
        description: req.body.description
      };
      // Add Exprience array
      profile.education.unshift(newEdu);
      profile.save().then(profile => res.json(profile));
    });
  }
);
// route to delete exprience
router.delete(
  "/exprience/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      // Get remove index
      const removeIndex = profile.exprience
        .map(item => item.id)
        .indexOf(req.params.id);
      // Splice out of arrat
      if (removeIndex >= 0) {
        profile.exprience.splice(removeIndex, 1);
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => res.status(404).json(err));
      } else {
        res.status(404).send("Invalid Id don't do hacking we will find you.");
      }
    });
  }
);
// route to delete education
router.delete(
  "/education/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      // Get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.id);
      console.log(removeIndex);
      // Splice out of arrat
      if (removeIndex >= 0) {
        profile.education.splice(removeIndex, 1);
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => res.status(404).json(err));
      } else {
        res.status(404).send("Invalid Id don't do hacking we will find you.");
      }
    });
  }
);
// route to delete profile & users (account)
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      // Users.findOneAndRemove({ _id: req.user.id }).then(() => {
      //   res.json({ success: true });
      // });
      res.json({ success: true });
    });
  }
);
module.exports = router;
