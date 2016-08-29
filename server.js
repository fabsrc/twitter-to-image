const app = require('express')()
const phantom = require('phantom')
const Datastore = require('nedb')
const Twit = require('twit')
const dot = require('dot')
const fs = require('fs')
const config = require('./config.json')
const template = fs.readFileSync('./templates/default.dot', 'utf8')
const svgTemplate = fs.readFileSync('./templates/svg.dot', 'utf8')

let render = dot.template(template)
let renderSvg = dot.template(svgTemplate)
let T = new Twit(config.twitter)
let db = new Datastore({ filename: 'tweets.db', autoload: true })
let phInstance
phantom.create().then(ph => { phInstance = ph })

app.get('/:id', (req, res) => {
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
    let content = render(tweet)

    if (req.query.format === 'html') {
      return res.end(content)
    } else if (req.query.format === 'svg') {
      let svgContent = renderSvg({ content: content })
      res.writeHead(200, {'Content-Type': 'image/svg+xml'})
      return res.end(svgContent)
    } else {
      let page

      phInstance.createPage().then(p => {
        page = p
        page.on('onLoadFinished', success => {
          page.renderBase64('PNG').then(image => {
            page.close()

            let imageBuffer = new Buffer(image, 'base64')
            res.writeHead(200, {'Content-Type': 'image/png'})
            res.end(imageBuffer, 'binary')
          })
        })
        page.setContent(content, 'localhost')
      })
    }
  })
  .catch(console.error)
})

app.get('/', (req, res) => res.send('Please enter a tweet id.'))
app.listen(3000, console.log('Started server on port 3000!'))
module.exports = app
