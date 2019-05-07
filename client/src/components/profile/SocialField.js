import React from "react";
import InputField from "../auth/InputField";
const SocialField = props => {
  const { errors, name, onChange, value } = props;
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend ">
        <span className="input-group-text " id={name}>
          @
        </span>
      </div>
      <InputField
        type="text"
        placeholder={`${name.toUpperCase()} PROFILE URL`}
        name={name}
        className={
          errors.type === { name } ? "is-invalid form-control" : "form-control"
        }
        value={value}
        onChange={onChange}
        aria-describedby={name}
      />
      <span className="invalid-feedback">{errors.msg}</span>
    </div>
  );
};

export default SocialField;
