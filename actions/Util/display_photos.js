  const fs = require('fs')

  /**
   * Sends a path to all the photos of the report currently being modified, if any
   * @title Display photos
   * @category Utility
   */
  const display_photos = async () => {
    var base_path
    try {
      if (temp.photos == null || temp.photos.length == 0) return

      base_path = await bp.kvs.forBot(event.botId).get('image_path')

      if (!fs.existsSync(base_path)) {
        throw 'The directory specified in the IMAGE_PATH variable does not exist.'
      }

      var paths = '' //String in which to store the paths to the photos, separated by '|'
      //Construct the list of paths by concatenation
      for (var i = 0; i < temp.photos.length; i++) {
        //Paths are in the form basePath/id_n, where id is the user's id and n is the photos' number
        paths += base_path + user.id + '_' + i
        if (i < temp.photos.length - 1) paths += '|'
      }

      const payload = await bp.cms.renderElement('builtin_text', { type: 'text', text: '[$PATHS]' + paths }, event)
      await bp.events.replyToEvent(event, payload)
    } catch (err) {
      bp.logger.error(err)
      temp.error = true
    }
  }

  return display_photos()