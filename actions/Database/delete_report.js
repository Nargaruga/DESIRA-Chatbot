  const { MongoClient } = require('mongodb')

  /**
   * Deletes the user's report create in date temp.to_edit
   * @title Delete report
   * @category Database
   */
  const deleteReport = async () => {
    var client
    try {
      const uri = await bp.kvs.forBot(event.botId).get('db_uri')
      const dbName = await bp.kvs.forBot(event.botId).get('db_name')
      client = new MongoClient(uri)
      await client.connect()

      const reports = client.db(dbName).collection('reports')
      const result = await reports.deleteOne({ date: temp.to_edit })

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

  return deleteReport()