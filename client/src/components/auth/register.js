import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../../actions/auth';

const form = reduxForm({
  form: 'register',
  validate
});

const renderField = field => (
  <div>
    <input {...field.input} />
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

function validate(formProps) {
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = 'Please enter your first name';
  }

  if (!formProps.lastInitial) {
    errors.lastInitial = 'Please enter your last initial';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }
  if (!formProps.age) {
    errors.password = 'Please enter your age';
  }

  return errors;
}

class Register extends Component {
  handleFormSubmit(formProps) {
    this.props.registerUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form id="register" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderAlert()}
        <div className="row">
          <div className="col-md-6">
            <label>First Name</label>
            <Field name="firstName" component={renderField} type="text" />
          </div>
          <div className="col-md-6">
            <label>Last Initial</label>
            <Field name="lastInitial" component={renderField} type="text" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Email</label>
            <Field name="email" component={renderField} type="text" />
          </div>
          <div className="col-md-6">
            <label>Password</label>
            <Field name="password" component={renderField} type="password" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Age</label>
            <Field name="age" component={renderField} type="text" />
          </div>
          <div className="col-md-6">
            <label>Gender</label>
            <Field name="gender" component={renderField} type="text" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, { registerUser })(form(Register));
