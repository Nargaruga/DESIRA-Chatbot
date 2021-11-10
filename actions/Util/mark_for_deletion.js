  /**
   * Adds the index of the chosen photo to the array temp.to_delete,
   *  creating the array if necessary.
   * @title Mark for deletion
   * @category Util
   */
  if (temp.to_delete == null || temp.to_delete.length == 0) temp.to_delete = []

  //The index is decremented by one because the values shown in the choice
  //  were incremented by one in order to have them start from one instead of zero.
  temp.to_delete.push(parseInt(temp.photo_index) - 1)