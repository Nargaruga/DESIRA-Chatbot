  const { MongoClient } = require('mongodb')

  /**
   * Queries the database to check if the user is registered
   * @title Check user
   * @category Database
   */
  const query = async () => {
    var client
    try {
      const uri = await bp.kvs.forBot(event.botId).get('db_uri')
      const dbName = await bp.kvs.forBot(event.botId).get('db_name')
      client = new MongoClient(uri)
      await client.connect()

      const users = await client.db(dbName).collection('users')
      const user = await users.findOne({ id: event.target }, { id: 1, _id: 0 })

      //Check if we found the user on the DB
      if (user == null) {
        temp.registered = false
      } else {
        temp.registered = true
      }

      temp.error = false
    } catch (err) {
      bp.logger.error(err)
      temp.error = true
    } finally {
      await client.close()
    }
  }

  return query()