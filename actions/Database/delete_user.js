  const { MongoClient } = require('mongodb')

  /**
   * Delete the current user from the database
   * @title Delete user
   * @category Database
   */
  const deleteUser = async () => {
    var client
    try {
      const uri = await bp.kvs.forBot(event.botId).get('db_uri')
      const dbName = await bp.kvs.forBot(event.botId).get('db_name')
      client = new MongoClient(uri)
      await client.connect()

      const users = await client.db(dbName).collection('users')
      const result = await users.deleteOne({ id: user.id })

      //Check if the operation was successful
      if (result.deletedCount == 0) {
        temp.error = true
      }
    } catch (err) {
      bp.logger.error(err)
      temp.error = true
    } finally {
      await client.close()
    }
  }

  return deleteUser()