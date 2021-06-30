const os = require('os')
const twitterConfig = require('../config/twitter.config')
const fs = require('fs')
const path = require('path')
const request = require('request').defaults({ encoding: null })
const Twit = require('twit')

const tweet = (message, file) => {
  var T = new Twit( twitterConfig )
  var localname = `tempFile${Date.now()}`;
  var PATH = path.join(
    os.tmpdir(),
    `./${localname}`
  );
  var mediaUrl = file
  var responseReturn = {}
  var metadataData = {}

  request.get(mediaUrl, function (error, response, body) {
    responseReturn = Object.assign(response)
    if (error) console.error(error)

    fs.writeFile(PATH, body, function(error) {
      if (error) console.error(error)

      T.postMediaChunked({ file_path: PATH }, function (error, data, response) {
        if (error) console.error(error)
        responseReturn = Object.assign(response)
        const mediaIdStr = data.media_id_string;
        const meta_params = { media_id: mediaIdStr }

        T.post('media/metadata/create', meta_params, function (error, data, response) {
          metadataData = data
          responseReturn = Object.assign(response)
          if (!error) {
            const params = { status: message, media_ids: [mediaIdStr] }

            T.post('statuses/update', params, function (error, response) {
              responseReturn = Object.assign(response)
              if (error) console.error(error)

              fs.unlinkSync(PATH);
              return responseReturn
            })
          }
          else console.error(error)
        }) 
      })
    }) 
  }) 
}
module.exports = { tweet }