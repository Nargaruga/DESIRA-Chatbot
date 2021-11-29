  //URI of the MongoDB instance
  const DB_URI = ''
  //Name of the database
  const DB_NAME = ''
  //Path to which images will be temporarily saved
  const IMAGE_PATH = ''

  const initialConfig = async () => {
    await bp.kvs.forBot(botId).set('db_uri', DB_URI)
    await bp.kvs.forBot(botId).set('db_name', DB_NAME)
    await bp.kvs.forBot(botId).set('image_path', IMAGE_PATH)
  }

  return initialConfig()
