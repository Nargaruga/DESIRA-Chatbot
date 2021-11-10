  /**
   * Checks if the e-mail address sent by the user is valid,
   *  setting temp.is_email_address accordingly.
   * @title Validate e-mail address
   * @category Validation
   */
  const regex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}/
  temp.is_email_address = regex.test(event.payload.text)