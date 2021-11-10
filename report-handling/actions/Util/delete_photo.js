  /**
   * Delete from temp.photos the photos which index appears in temp.to_delete
   * @title Delete photo
   * @category Utility
   */
  if (temp.photos == null || temp.photo_index < 0 || temp.photo_index > temp.photos.length) {
    return
  }

  //Sort the array so we can iterate backwards over the elements to delete
  //  while avoiding changes in the indexes we haven't processed yet
  temp.to_delete.sort(function(a, b) {
    return b - a
  })

  //Remove the elements while iterating backwards
  for (var i = temp.to_delete.length - 1; i >= 0; i--) temp.photos.splice(i, 1)

  //Clear the temp.to_delete array
  temp.to_delete = []