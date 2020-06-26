// vendors
import * as yup from 'yup';

function getRegexByCountry(country) {
  switch (country) {
    case 'CA':
      return /^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z] ?[0-9][ABCEGHJ-NPRSTV-Z][0-9]$/;
    default:
      return /.*/;
  }
}

function validatePostalCode(country, message) {
  const regex = getRegexByCountry(country);

  return this.transform((value) => {
    return this.isType(value) && value !== null ? value.toUpperCase() : value;
  }).matches(regex, message);
}

export default (() => {
  yup.addMethod(yup.string, 'postalCode', validatePostalCode);
})();
