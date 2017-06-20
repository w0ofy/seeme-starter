import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { registerUser } from '../../actions/auth';
import asyncValidate from './validate/asyncValidate'



const renderField = ({ input, placeholder, type, meta: { asyncValidating, touched, error } }) => (
  <div className={asyncValidating ? 'async-validating' : ''}>
    <input {...input} type={type} placeholder={placeholder} />
    {touched && error && <span className="err-inp">{error}</span>}
  </div>
);

const validate = values => {
  const errors = {}

  if (!values.firstName) {
    errors.firstName = 'Please enter your first name';
  }

  if (!values.lastInitial) {
    errors.lastInitial = 'Please enter your last initial';
  }

  if (!values.email) {
    errors.email = 'Please enter an email';
  }

  if (!values.password) {
    errors.password = 'Please enter a password';
  }
  if (!values.age) {
    errors.age = 'Please enter your age';
  }
  if (!values.is_male) {
    errors.is_male = 'Please enter your gender';
  }
  if (!values.seeking_male) {
    errors.is_male = 'Please enter the gender of your future partner';
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

            <Field placeholder="First Name" name="firstName" component={renderField} type="text" />
          </div>
          <div className="col-md-6">

            <Field name="lastInitial" component={renderField} type="text" placeholder="Last Initial" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">

            <Field name="email" component={renderField} type="text" placeholder="Email" />
          </div>
          <div className="col-md-6">

            <Field name="password" type="password" component="input" placeholder="Password" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Field name="age" component={renderField} type="text" placeholder="Age" />
          </div>
          <div className="col-md-6">
            <Field name="is_male" component="select">
              <option></option>
              <option value="true">Male</option>
              <option value="false">Female</option>
            </Field>
          </div>
          <div className="col-md-6">
            <Field name="seeking_male" component="select">
              <option>Looking to meet a</option>
              <option value="true">Guy</option>
              <option value="false">Girl</option>
            </Field>
          </div>
        </div>
        <button type="submit" className="btn btn-success">Sign Up</button>
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

const form = reduxForm({
  form: 'Register',
  validate,
  asyncValidate,
  asyncBlurFields: [ 'email' ]
});

export default connect(mapStateToProps, { registerUser })(form(Register));
