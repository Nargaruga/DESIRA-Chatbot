  //URI of the MongoDB instance
  const DB_URI = 'mongodb+srv://Example:atlasTest@chatbottest.onzoq.mongodb.net/exampleDB?retryWrites=true&w=majority'
  //Name of the database
  const DB_NAME = 'exampleDB'
  //Path to which images will be temporarily saved
  const IMAGE_PATH = '/home/leonardo/Pictures/'

  const initialConfig = async () => {
    await bp.kvs.forBot(botId).set('db_uri', DB_URI)
    await bp.kvs.forBot(botId).set('db_name', DB_NAME)
    await bp.kvs.forBot(botId).set('image_path', IMAGE_PATH)
  }

  return initialConfig()