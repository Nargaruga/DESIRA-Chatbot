  const fs = require('fs')
  const base_path = '/home/leonardo/Pictures/'

  /**
   * Saves the images contained in temp.photos on the local filesystem
   * @title Store photos locally
   * @category Utility
   */
  const storePhotosLocally = async () => {
    if (temp.photos == null) return

    //Save each photo to file with a filename in the form id_n, where id is the user's id and n is the photo's number
    for (var i = 0; i < temp.photos.length; i++) {
      await fs.writeFile(base_path + user.id + '_' + i, temp.photos[i], 'base64', function(err) {
        if(err != null) {
          console.log(err)
          temp.error = true
        }
      })
    }
  }

  return storePhotosLocally()