  /**
   * Asks the user to choose one of the photos in temp.photos
   * @title Choose photo
   * @category Choices
   */
  const choosePhoto = async () => {
    if (temp.photos == null || temp.photos.length == 0) return

    const choices = []

    //Add a choice for each photo, associating with each photo
    //  the number indicating its position in the array
    for (var i = 0; i < temp.photos.length; i++) {
      //Skip if the index belongs to a photo marked for deletion
      if (temp.to_delete == null || !temp.to_delete.includes(i)) {
        //i+1 to show numbers starting from 1 instead of 0
        choices.push({ title: (i + 1).toString(), value: (i + 1).toString() })
      }
    }

    //Add the choice for aborting
    choices.push({ title: 'Annulla modifica', value: 'abort_single' })

    //Build the payload and send the message
    const payload = await bp.cms.renderElement(
      'builtin_single-choice',
      { typing: true, text: 'Quale foto vorrebbe eliminare?', choices: choices },
      event
    )
    await bp.events.replyToEvent(event, payload)
  }

  return choosePhoto()