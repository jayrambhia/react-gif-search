import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from '../components/FormRender';
import { connect } from 'react-redux';
import * as Actions from '../actions';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter your email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = "Please enter your password";
  }

  return errors;
};

class Login extends React.Component {

  handleFormSubmit = (values) => {
    this.props.signInUser(values);
  }

  render() {
    return(
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">Log In</h2>
          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <Field name="email" component={renderField} className="form-control" type="text" label="Email"/>
            <Field name="password" component={renderField} className="form-control" type="password" label="Password" />
            <button action="submit" className="btn btn-primary">Sign In</button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, Actions)(reduxForm({ form: 'login', validate })(Login));
