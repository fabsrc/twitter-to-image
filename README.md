# Twitter to Image

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
http://localhost.3000/:tweet_id.:format?
```

### Examples

#### PNG

```
http://localhost.3000/210462857140252672.png
http://localhost.3000/210462857140252672
```

#### JPEG

```
http://localhost.3000/210462857140252672.jpeg
http://localhost.3000/210462857140252672.jpg
```

#### HTML

```
http://localhost.3000/210462857140252672.html
```

#### SVG

```
http://localhost.3000/210462857140252672.svg
```

*Makes use of the `foreignObject` element which is currently not supported by all versions of Internet Explorer.*


## Test

```bash
npm test
```

## License

Licensed under the [MIT License](http://opensource.org/licenses/mit-license.php).