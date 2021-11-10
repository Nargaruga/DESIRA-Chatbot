  /**
   * Asks the user to choose one of his active reports, read from temp.reports
   * @title Choose report
   * @category Choices
   */
  const chooseReport = async () => {
    const choices = []

    if (temp.reports.length > 0) {
      //Add a choice for each report
      temp.reports.forEach(async report => {
        choices.push({ title: report.date, value: report.date })
      })

      //Add the choice of aborting
      choices.push({ title: 'Annulla modifiche', value: 'abort' })

      //Build the payload and send the message
      const payload = await bp.cms.renderElement(
        'builtin_single-choice',
        { typing: true, text: 'Quale segnalazione vorrebbe modificare?', choices: choices },
        event
      )
      await bp.events.replyToEvent(event, payload)
    }
  }

  return chooseReport()