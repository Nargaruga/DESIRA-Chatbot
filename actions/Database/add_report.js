  const { MongoClient } = require('mongodb')

  /**
   * Adds the current report to the Database
   * @title Add report
   * @category Database
   */
  const insert = async () => {
    const date_obj = new Date()
    const day = ('0' + date_obj.getDate()).slice(-2)
    const month = ('0' + date_obj.getMonth()).slice(-2)
    const year = date_obj.getFullYear()
    const hours = ('0' + date_obj.getHours()).slice(-2)
    const minutes = ('0' + date_obj.getMinutes()).slice(-2)
    const seconds = ('0' + date_obj.getSeconds()).slice(-2)

    var client
    try {
      const uri = await bp.kvs.forBot(event.botId).get('db_uri')
      const dbName = await bp.kvs.forBot(event.botId).get('db_name')
      client = new MongoClient(uri)
      await client.connect()

      const reports = await client.db(dbName).collection('reports')
      //The document to be stored in the DB
      const doc = {
        user_id: user.id,
        date: `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`,
        description: temp.description,
        status: 'In elaborazione'
      }

      //Check if the user sent his position as coordinates or as text
      if (temp.is_coordinates) {
        doc['location'] = temp.location
      } else {
        doc['location_desc'] = temp.location
      }

      //Check if the user sent any photo
      if (temp.count > 0) {
        doc['photos'] = []
        //Add all photos to the document
        for (var i = 0; i < temp.count; i++) {
          doc['photos'].push(temp.photos[i])
        }
      }

      const result = await reports.insertOne(doc)

      //Check if the operation was successful
      if (result.insertedCount == 0) {
        temp.error = true
      }
    } catch (err) {
      bp.logger.error(err)
      temp.error = true
    } finally {
      await client.close()
    }
  }

  return insert()