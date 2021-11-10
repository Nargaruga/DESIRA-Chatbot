  const { MongoClient } = require('mongodb')

  /**
   * Applies the edits made to the report created in date temp.to_edit
   * @title Edit report
   * @category Database
   */
  const editReport = async () => {
    var client
    try {
      const uri = await bp.kvs.forBot(event.botId).get('db_uri')
      const dbName = await bp.kvs.forBot(event.botId).get('db_name')
      client = new MongoClient(uri)
      await client.connect()

      const reports = await client.db(dbName).collection('reports')
      const update = { $set: {}, $unset: {} }

      //Check if the location was edited
      if (temp.location_edited) {
        //Check whether the user sent coordinates or text
        if (temp.is_coordinates) {
          update['$unset']['location_desc'] = ''
          update['$set']['location'] = temp.location
        } else {
          update['$unset']['location'] = ''
          update['$set']['location_desc'] = temp.location
        }
      }

      //Check if the description was edited
      if (temp.description_edited) {
        update['$set']['description'] = temp.description
      }

      //Check if the photo array was edited
      if (temp.photos_edited) {
        update['$set']['photos'] = temp.photos
      }

      const result = await reports.updateOne({ date: temp.to_edit }, update)

      //Check if the operation was successful
      if (result.modifiedCount == 0) {
        temp.error = true
      }
    } catch (err) {
      bp.logger.error(err)
      temp.error = true
    } finally {
      await client.close()
    }
  }

  return editReport()