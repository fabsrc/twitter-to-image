# Twitter to Image
[![Build Status](https://img.shields.io/travis/fabsrc/twitter-to-image.svg?style=flat-square)](https://travis-ci.org/fabsrc/twitter-to-image)
[![Dependencies](https://img.shields.io/david/fabsrc/twitter-to-image.svg?style=flat-square)](https://david-dm.org/fabsrc/twitter-to-image)
[![Development Dependencies](https://img.shields.io/david/dev/fabsrc/twitter-to-image.svg?style=flat-square)](https://david-dm.org/fabsrc/twitter-to-image?type=dev)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)



Creates images from tweets.

## Install

```bash
npm install
```

## Start

```bash
npm start
```

Use the `PORT` environment variable to set a custom port. Default port is `3000`.

## Usage

The application is able to return multiple formats which can be specified in the url. The default is `png`.

```
http://localhost:3000/statuses/:tweet_id.:format?
http://localhost:3000/:screenname/status/:tweet_id.:format?
```

### Examples

#### PNG

```
http://localhost:3000/statuses/210462857140252672
http://localhost:3000/twitterapi/status/210462857140252672
http://localhost:3000/statuses/210462857140252672.png
http://localhost:3000/twitterapi/status/210462857140252672.png
```

#### JPEG

```
http://localhost:3000/statuses/210462857140252672.jpeg
http://localhost:3000//twitterapi/status/210462857140252672.jpg
http://localhost:3000/statuses/210462857140252672.jpeg
http://localhost:3000//twitterapi/status/210462857140252672.jpg
```

#### HTML

```
http://localhost:3000/statuses/210462857140252672.html
http://localhost:3000/twitterapi/status/210462857140252672.html
```

#### SVG

```
http://localhost:3000/statuses/210462857140252672.svg
http://localhost:3000/twitterapi/status/210462857140252672.svg
```

*Makes use of the `foreignObject` element which is currently not supported by Internet Explorer.*


## Test

```bash
npm test
```

## License

Licensed under the [MIT License](http://opensource.org/licenses/mit-license.php).