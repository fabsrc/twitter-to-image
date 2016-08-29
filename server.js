const dots = require('dot').process({ path: './templates' })
const Datastore = require('nedb')
const app = require('express')()
const Twit = require('twit')
const render = require('./lib/render')
const config = require('./config.json')

let T = new Twit(config.twitter)
let db = new Datastore({ filename: 'tweets.db', autoload: true })

app.get('/:id.:format?', (req, res) => {
  new Promise((resolve, reject) => {
    db.findOne({ _id: req.params.id }, (err, cachedTweet) => {
      if (err) {
        console.error(err)
        return res.status(500).end(err)
      }

      if (cachedTweet) {
        console.info(`Get ${req.params.id} from cache!`)
        resolve(cachedTweet)
      } else {
        console.info(`Get ${req.params.id} from Twitter!`)

        T.get('statuses/show/' + req.params.id, (err, tweet, response) => {
          if (err) {
            console.error(err)
            return res.status(err.statusCode).send(err)
          }

          if (tweet) {
            tweet._id = tweet.id_str
            db.insert(tweet)
            resolve(tweet)
          }
        })
      }
    })
  })
  .then(tweet => {
    let content = dots.default(tweet)

    switch (String(req.params.format).toLowerCase()) {
      case 'html':
        return res.end(content)
      case 'svg':
        let svgContent = dots.svg({ content: content })
        res.writeHead(200, {'Content-Type': 'image/svg+xml'})
        return res.end(svgContent)
      case 'jpg':
        req.params.format = 'jpeg' // Fallthrough!
      case 'jpeg': // eslint-disable-line
      case 'png':
      case 'gif':
      case 'undefined':
        req.params.format = req.params.format || 'png'
        return render(content, req.params.format).then(imageBuffer => {
          res.writeHead(200, {'Content-Type': `image/${req.params.format}`})
          return res.end(imageBuffer, 'binary')
        })
      default:
        return res.status(415).send(`Format ${req.params.format} not supported!`)
    }
  })
  .catch(console.error)
})

app.get('/', (req, res) => res.status(404).send('Please enter a valid tweet id.'))
app.listen(process.env.PORT || 3000, function () {
  console.log(`Started server on port ${this.address().port}!`)
})

module.exports = app
