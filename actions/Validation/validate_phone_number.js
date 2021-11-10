
  /**
   * Checks if the phone number sent by the user is valid, setting
   *  temp.is_phone_number accordingly.
   * @title Validate phone number
   * @category Validation
   */
  const parsePhoneNumber = require('libphonenumber-js')

    const phoneNumber = parsePhoneNumber(event.payload.text, "IT")
    if (phoneNumber != null && phoneNumber.isValid()) {
      temp.is_phone_number = true
    } else {
      temp.is_phone_number = false
    }