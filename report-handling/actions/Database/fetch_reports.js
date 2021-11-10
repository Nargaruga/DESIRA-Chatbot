  const { MongoClient } = require('mongodb')

  /**
   * Fetches general information about all of the user's reports and saves them in temp.reports
   * @title Fetch reports
   * @category Database
   */
  const fetchReports = async report_type => {
    var client
    try {
      const uri = await bp.kvs.forBot(event.botId).get('db_uri')
      const dbName = await bp.kvs.forBot(event.botId).get('db_name')
      client = new MongoClient(uri)
      await client.connect()

      const reports = await client.db(dbName).collection('reports')

      var query = { user_id: event.target }
      if (report_type == 'archived') {
        //Ask only for archived reports
        query['status'] = 'Archiviata'
      } else if (report_type == 'active') {
        //Ask only for active reports
        query['status'] = { $ne: 'Archiviata' }
      } //Else we ask for all reports

      temp.reports = await reports
        .find(query, {
          //Values we are interested in
          date: 1,
          description: 1,
          location_desc: 1,
          location: 1,
          status: 1,
          _id: 0
        })
        .toArray()

    } catch (err) {
      bp.logger.error(err)
      temp.error = true
    } finally {
      await client.close()
    }
  }

  return fetchReports(args.report_type)