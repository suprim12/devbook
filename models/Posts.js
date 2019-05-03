const mongoose = require("mongoose");
const Joi = require("joi");
// Schema
const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});
// Model
const Posts = new mongoose.model("posts", postSchema);
// Validation
function postValidation(post) {
  const schema = {
    text: Joi.string()
      .required()
      .min(3)
      .max(300)
  };
  return Joi.validate(post, schema);
}
exports.Posts = Posts;  
exports.Validate = postValidation;
