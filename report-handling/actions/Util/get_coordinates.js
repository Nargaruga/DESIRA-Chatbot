  /**
   * Retrieves the coordinates sent by the user and saves them in temp.location
   * @title Get coordinates
   * @category Utility
   */
  var message = event.payload.text

  if (message.includes('[$COORDS]')) {
    temp.is_location = true
    //Remove the protocol string from the message
    temp.location = message.replace('[$COORDS]', '')
  } else {
    temp.is_location = false
  }