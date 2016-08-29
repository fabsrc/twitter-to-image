const test = require('ava')
const request = require('supertest')
const nock = require('nock')
const app = require('./server')

test.before(t => {
  nock('https://api.twitter.com/1.1')
    .persist()
    .get('/statuses/show/210462857140252672.json')
    .reply(200, {
      'created_at': 'Wed Jun 06 20:07:10 +0000 2012',
      'id_str': '210462857140252672',
      'text': 'Along with our new #Twitterbird, we\'ve also updated our Display Guidelines: https://t.co/Ed4omjYs  ^JC',
      'id': 210462857140252672,
      'user': {
        'name': 'Twitter API',
        'profile_image_url': 'http://a0.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png',
        'id_str': '6253282',
        'profile_image_url_https': 'https://si0.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png',
        'id': 6253282,
        'verified': true,
        'screen_name': 'twitterapi'
      }
    })
})

test.cb('display message when no tweet id is given', t => {
  request(app)
    .get('/')
    .end((err, res) => {
      t.falsy(err)
      t.is(res.status, 404)
      t.is(res.text, 'Please enter a valid tweet id.')
      t.end()
    })
})

test.cb('return png image for a tweet id', t => {
  request(app)
    .get('/statuses/210462857140252672')
    .end((err, res) => {
      t.falsy(err)
      t.is(res.status, 200)
      t.is(res.header['content-type'], 'image/png')
      t.end()
    })
})

test.cb('return svg image for a tweet id', t => {
  request(app)
    .get('/statuses/210462857140252672.svg')
    .end((err, res) => {
      t.falsy(err)
      t.is(res.status, 200)
      t.is(res.header['content-type'], 'image/svg+xml')
      t.end()
    })
})

test.cb('return jpg image for a tweet id', t => {
  request(app)
    .get('/statuses/210462857140252672.jpg')
    .end((err, res) => {
      t.falsy(err)
      t.is(res.status, 200)
      t.is(res.header['content-type'], 'image/jpeg')
      t.end()
    })
})
