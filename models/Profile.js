const mongoose = require("mongoose");
const Joi = require("joi");
// Schema
const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  exprience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      field: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
    linkedin: {
      type: String
    },
    behance: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});
// Model
const Profile = new mongoose.model("profile", profileSchema);
// Validation
function profileValidation(profile) {
  const schema = {
    handle: Joi.string()
      .min(3)
      .max(40)
      .required(),
    company: Joi.allow(),
    website: Joi.allow(),
    location: Joi.allow(),
    status: Joi.string()
      .min(3)
      .required(),
    skills: Joi.string().required(),
    bio: Joi.allow(),
    githubusername: Joi.allow(),
    youtube: Joi.allow(),
    facebook: Joi.allow(),
    twitter: Joi.allow(),
    instagram: Joi.allow(),
    linkedin: Joi.allow(),
    behance: Joi.allow()
  };

  return Joi.validate(profile, schema);
}
function exprienceValidation(exp) {
  const schema = {
    title: Joi.string().required(),
    company: Joi.string().required(),
    location: Joi.string(),
    current: Joi.optional(),
    from: Joi.string().required(),
    to: Joi.optional(),
    description: Joi.optional()
  };
  return Joi.validate(exp, schema);
}
function educationValidationteEdu(exp) {
  const schema = {
    school: Joi.string().required(),
    degree: Joi.string().required(),
    field: Joi.string(),
    location: Joi.string(),
    current: Joi.optional(),
    from: Joi.string().required(),
    to: Joi.optional(),
    description: Joi.optional()
  };
  return Joi.validate(exp, schema);
}

exports.Profile = Profile;
exports.Validate = profileValidation;
exports.ValidateExp = exprienceValidation;
exports.ValidateEdu = educationValidationteEdu;
