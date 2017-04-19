import React from 'react';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
    <label className="control-label">{label}</label>
    <div>
      <input {...input} placeholder={label} className="form-control" type={type} />
      {touched && error && <div className="help-block">{error}</div>}
    </div>
  </fieldset>
);

export default renderField;
