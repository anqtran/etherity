const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAuctionInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.organization = !isEmpty(data.organization) ? data.organization : '';
  data.basePrice = !isEmpty(data.basePrice) ? data.basePrice : '';
  data.shortDescription = !isEmpty(data.shortDescription)
    ? data.shortDescription
    : '';
  data.description = !isEmpty(data.description) ? data.description : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.organization)) {
    errors.organization = 'Organization field is required';
  }

  if (Validator.isEmpty(data.basePrice)) {
    errors.basePrice = 'Base Price field is required';
  }

  if (Validator.isEmpty(data.shortDescription)) {
    errors.shortDescription = 'Short Description field is required';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
