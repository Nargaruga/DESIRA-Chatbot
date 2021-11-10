  const axios = require('axios')

  /**
   * Downloads the image sent by the user (if applicable), encodes it in base64
   *  and saves it in the temp.photos array
   * @title Download photo
   * @category Utility
   */
  const downloadPhoto = async () => {
    var message = event.payload.text

    //Create the photo array if necessary
    if (temp.photos == null) {
      temp.photos = []
    }
    try {
      if (message.includes('[$PHOTO]')) {
        temp.is_photo = true
        var url = message.replace('[$PHOTO]', '')

        //Get the photo as byte array
        var response = await axios.get(url, {
          responseType: 'arraybuffer'
        })

        //Add it the the photo array
        temp.photos.push(response.data.toString('base64'))
      } else {
        temp.is_photo = false
      }
    } catch (err) {
      bp.logger.error(err)
      temp.error = true
    }
  }

  return downloadPhoto()