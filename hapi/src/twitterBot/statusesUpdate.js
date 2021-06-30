const os = require('os')
const twitterConfig = require('../config/twitter.config')
const fs = require('fs')
const path = require('path')
const request = require('request').defaults({ encoding: null })
const Twit = require('twit')

const tweet = (message, file) => {
  const T = new Twit(twitterConfig)
  const localname = `tempFile${Date.now()}`
  const PATH = path.join(os.tmpdir(), `./${localname}`)
  const mediaUrl = file
  let responseReturn = {}
  let metadataData = {}

  request.get(mediaUrl, (error, response, body) => {
    responseReturn = Object.assign(response)
    if (error) console.error(error)

    fs.writeFile(PATH, body, (error) => {
      if (error) console.error(error)

      T.postMediaChunked({ file_path: PATH }, (error, data, response) => {
        if (error) console.error(error)
        responseReturn = Object.assign(response)
        const mediaIdStr = data.media_id_string
        const meta_params = { media_id: mediaIdStr }

        T.post(
          'media/metadata/create',
          meta_params,
          (error, data, response) => {
            metadataData = data
            responseReturn = Object.assign(response)
            if (!error) {
              const params = { status: message, media_ids: [mediaIdStr] }

              T.post('statuses/update', params, (error, response) => {
                responseReturn = Object.assign(response)
                if (error) console.error(error)

                fs.unlinkSync(PATH)
                return responseReturn
              })
            }
          }
        )
      })
    })
  })
}
module.exports = { tweet }
