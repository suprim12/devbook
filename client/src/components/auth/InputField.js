import React, { Component } from "react";
import PropTypes from "prop-types";
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
InputField.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
export default InputField;
