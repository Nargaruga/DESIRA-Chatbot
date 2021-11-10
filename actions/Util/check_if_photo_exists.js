  /**
   * Check if the index chosen by the user corresponds to an actual photo in the array
   * @title Check if photo exists
   * @category Utility
   */
    if (temp.photos == null || temp.photo_index < 0 || temp.photo_index > temp.photos.length) {
      temp.is_photo = false
    } else {
      temp.is_photo = true
    }