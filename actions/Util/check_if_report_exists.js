  /**
   * Checks if the report specified by the user is among the ones fetched from the DB
   * @title Check if report exists
   * @category Utility
   */
    var found = false
    var i = 0

    //Iterate over all of the user's reports
    while (i < temp.reports.length && !found) {
      const report = temp.reports[i]
      
      //Use the report's date as unique identification in order to find a match
      if (report['date'] === temp.to_edit) {
        found = true
      }
      
      i++
    }

    temp.is_report = found