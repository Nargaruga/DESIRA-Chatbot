  /**
   * Checks if the last message sent by the user is plain text, setting temp.is_text accordingly
   * @title Check if message is text
   * @category Validation
   */
    const message = event.payload.text

    if (message.includes('[$COORDS]') || message.includes('[$PHOTO]') || message.includes('[$UNSUPPORTED]')) {
      temp.is_text = false
    } else {
      temp.is_text = true
    }