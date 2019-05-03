const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const { Posts, Validate } = require("../../models/Posts");
const { Profile } = require("../../models/Profile");
// Create post route protected
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { error } = Validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const newPosts = new Posts({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    await newPosts.save().then(post => res.json(post));
  }
);
// Create fetch all
router.get("/", (req, res) => {
  Posts.find()
    .sort({ date: -1 })
    .then(post => res.json(post))
    .catch(err => res.status(404).send("No posts found."));
});
// single post
router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).send("No post found."));
});
// delete
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Posts.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res.status(401).send(() => res.json("Not authorized"));
          }
          // delete
          post
            .delete()
            .then(() => res.json({ sucess: true }))
            .catch(err => res.status(404).json("No posts found."));
        })
        .catch(err => res.status(404).send("delete No post found."));
    });
  }
);
// Like posts
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Posts.findById(req.params.id)
        .then(post => {
          // Check liked or not
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .lenght > 0
          ) {
            return res.status(400).json("Already liked the posts.");
          }
          // Add user id to liked array
          post.likes.unshift({ user: req.user.id });
          // Save
          post.save().then(() => res.json({ sucess: true }));
        })
        .catch(err => res.status(404).json("No posts found for like."));
    });
  }
);
// unlike posts
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Posts.findById(req.params.id)
        .then(post => {
          // Check liked or not
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .lenght === 0
          ) {
            return res.status(400).json("Not yet liked posts");
          }
          // remove Index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          // remove from like array
          post.likes.splice(removeIndex, 1);
          // Save
          post.save().then(() => res.json({ sucess: true }));
        })
        .catch(err => res.status(404).json("No posts found for like."));
    });
  }
);
// add a comment
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error } = Validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    Profile.findOne({ user: req.user.id }).then(profile => {
      Posts.findById(req.params.id).then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };
        // add to array
        post.comments.unshift(newComment);
        // save
        post
          .save()
          .then(post => res.json({ success: true, post }))
          .catch(err => res.status(404).json("No posts found"));
      });
    });
  }
);
// delete a comment
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Posts.findById(req.params.id)
      .then(post => {
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).lenght === 0
        ) {
          return res.status(404).send("Comment not exists");
        }
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);
        post.comments.splice(removeIndex, 1);
        post.save().then(() => res.send("comment deleted"));
      })
      .catch(err => res.status(404).send("No comment found"));
  }
);
module.exports = router;
