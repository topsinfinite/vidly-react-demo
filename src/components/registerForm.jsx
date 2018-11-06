import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", fullname: "" },
    errors: {}
  };
  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    fullname: Joi.string()
      .min(3)
      .label("Name")
      .required()
  };

  doSubmit = () => {
    //handle API calls
    const { fullname, username } = this.state.data;
    console.log(`Username:${username}  fullname:${fullname}`);
    const data = { ...this.state.data };
    data.username = "";
    data.password = "";
    data.fullname = "";
    this.setState({ data });
  };
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("fullname", "Name")}
          {this.renderSubmit("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
