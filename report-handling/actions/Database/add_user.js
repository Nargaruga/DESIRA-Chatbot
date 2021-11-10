  const { MongoClient } = require('mongodb')

  /**
   * Adds the current user to the database
   * @title Add user
   * @category Database
   */
  const insert = async () => {
    var client
    try {
      const uri = await bp.kvs.forBot(event.botId).get('db_uri')
      const dbName = await bp.kvs.forBot(event.botId).get('db_name')
      client = new MongoClient(uri)
      await client.connect()

      const users = await client.db(dbName).collection('users')
      //The document to be stored in the DB
      const doc = {
        id: event.target,
        first_name: temp.first_name,
        last_name: temp.last_name,
        primary_contact: temp.primary_contact
      }

      //Check if the user added a secondary contact
      if (temp.secondary_contact.localeCompare('Non inserito') != 0) {
        doc['secondary_contact'] = temp.secondary_contact
      }

      const result = await users.insertOne(doc)

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