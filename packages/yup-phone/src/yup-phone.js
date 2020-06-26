// vendors
import * as Yup from 'yup';
import { parsePhoneNumberFromString } from 'libphonenumber-js/max';

const regex = /(\+)?(1)?[- ]?\(?[1-9]\d\d\)?[- ]?\d\d\d[- ]?\d\d\d\d/;

function yupPhone(countryCode, message) {
  return this.matches(regex, message).test('phone', message, (value) => {
    if (!regex.test(value)) return false;

    const phoneNumber = parsePhoneNumberFromString(value, countryCode);

    if (phoneNumber === 'undefined') return false;

    return phoneNumber.isValid();
  });
}

export default (() => {
  Yup.addMethod(Yup.string, 'phone', yupPhone);
})();
