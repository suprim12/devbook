import React, { Component } from "react";

class InputField extends Component {
  render() {
    const {
      type,
      className,
      placeholder,
      name,
      value,
      onChange,
      ...rest
    } = this.props;
    return (
      <React.Fragment>
        <input
          type={type}
          className={className}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          {...rest}
        />
      </React.Fragment>
    );
  }
}

export default InputField;
