  const { MongoClient } = require('mongodb')

  /**
   * Fetches all the photos associated with the report created in date temp.to_edit
   *  and saves them in the array temp.photos
   * @title Fetch photos
   * @category Database
   */
  const fetchPhotos = async () => {
    var client
    try {
      const uri = await bp.kvs.forBot(event.botId).get('db_uri')
      const dbName = await bp.kvs.forBot(event.botId).get('db_name')
      client = new MongoClient(uri)
      await client.connect()

      //Fetch the photo array associated with the report submitted on date to_edit['date']
      const reports = await client.db(dbName).collection('reports')
      const result = await reports.findOne({ date: temp.to_edit }, { photos: 1, _id: 0 })
      
      if (result != null && result['photos'] != null && result['photos'].length > 0) {
        temp.photos = []
        //Push the photos in temp.photos
        for (var i = 0; i < result['photos'].length; i++) {
          temp.photos.push(result['photos'][i])
        }
      }

    } catch (err) {
      bp.logger.error(err)
      temp.error = true
    } finally {
      await client.close()
    }
  }

  return fetchPhotos()