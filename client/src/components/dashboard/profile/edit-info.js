import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { updateProfile } from '../../../actions/auth';
// import InputRange from 'react-input-range';

const form = reduxForm({
  form: 'EditInfo'
});

const renderField = ({ label, input, type, meta: { asyncValidating, touched, error } }) => (
  <div className={asyncValidating ? 'async-validating' : ''}>
    <input {...input} type={type} placeholder={label} defaultValue={label} />
    {touched && error && <span className="err-inp">{error}</span>}
  </div>
);


const renderInvisibleEmail = ({ label, input, type, meta: { asyncValidating, touched, error } }) => (
  <div className={asyncValidating ? 'async-validating' : ''}>
    <input {...input} type={type} placeholder={label} value={label} />
    {touched && error && <span className="err-inp">{error}</span>}
  </div>
);


class EditInfo extends Component {

  handleFormSubmit(formProps) {
    this.props.updateProfile(formProps);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="edit-info">
        <form id="edit-info" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field name="emailQuery" component={renderInvisibleEmail} label={this.props.email} type="text" />
          <Field name="firstName" component={renderField} type="text" label={this.props.firstName} />
          <Field name="age" component={renderField} type="text" label={this.props.age} />
          <Field name="age_pref_min" id="min" className="inline" component={renderField} type="text" label={this.props.age_pref_min} />
          <Field name="age_pref_max" id="max" className="inline" component={renderField} type="text" label={this.props.age_pref_max} />
          <button type="submit" className="btn btn-success">Save Profile Info</button>
        </form>
      </div>
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



// export default EditInfo;
export default connect(mapStateToProps, { updateProfile })(form(EditInfo));