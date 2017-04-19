import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from '../components/FormRender';
import { connect } from 'react-redux';
import * as Actions from '../actions';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!values.password) {
    errors.password = "Please enter a password";
  } else if (values.password.length < 6) {
    errors.password = "Please enter a strong password";
  }

  if (values.password != values.passwordConfirmation) {
    errors.password = "Passwords do not match";
  }

  return errors;
};

class Signup extends React.Component {

  handleFormSubmit = (values) => {
    this.props.signInUser(values);
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">Sign Up</h2>
          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <Field name="email" type="text" component={renderField} label="Email" />
            <Field name="password" type="password" component={renderField} label="Password" />
            <Field name="passwordConfirmation" type="password" component={renderField} label="Confirm Password" />

            <button action="submit" className="btn btn-primary">Sign up</button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, Actions)(reduxForm({ form: 'signup', validate })(Signup));
