  /**
   * Displays the reports listed in temp.reports
   * @title Display reports
   * @category Utility
   */
  const displayReports = async () => {
    //Send a message for each report containing info about it
    temp.reports.forEach(async report => {
      const doc = {
        type: 'text',
        text: `Data: ${report.date}\nDescrizione: ${report.description}\n`
      }

      if (report.location_desc != null) {
        doc.text += `Posizione: ${report.location_desc}\n`
      } else {
        doc.text += `Posizione: ${report.location}\n`
      }

      doc.text += `Status: ${report.status}\n`

      const payload = await bp.cms.renderElement('builtin_text', doc, event)
      await bp.events.replyToEvent(event, payload)
    })
  }

  return displayReports()