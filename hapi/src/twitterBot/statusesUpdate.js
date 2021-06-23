const os = require('os')
const config = require('./config') // env variables
const fs = require('fs')
const path = require('path')
const request = require('request').defaults({ encoding: null })
const Twit = require('twit')

const tweet = (message, file) => {
  var T = new Twit( config )
  var localname = `tempFile${Date.now()}`;
  var PATH = path.join(
    os.tmpdir(),
    `./${localname}`
  );
  var mediaUrl = file
  request.get(mediaUrl, function (error, response, body) {
    fs.writeFile(PATH, body, function(error) {
      // step ONE
      T.postMediaChunked({ file_path: PATH }, function (err, data, response) {
        const mediaIdStr = data.media_id_string;
        const meta_params = { media_id: mediaIdStr };
        //  step TWO
        T.post('media/metadata/create', meta_params, function (err, data, response) {
          if (!err) {
            const params = { status: message, media_ids: [mediaIdStr] };
            // step THREE
            T.post('statuses/update', params, function (err, tweet, response) {
              console.log(tweet);
              fs.unlinkSync(PATH); // Deletes media from /tmp folder
              const base = 'https://twitter.com/';
              const handle = 'edgarparra2';
              const tweet_id = tweet.id_str;

              return `${base}${handle}/status/${tweet_id}`
          }) // end '/statuses/update'
          } // end if(!err)
        }) // end '/media/metadata/create'
      }) // end T.postMedisChunked
    }) //end fs.writeFile
  }) // end request.get
}
module.exports = { tweet }