# wtfisthis

WTFisthis is a super simple http server that handles any URL and returns a JSON with some
information about that URL, such as content type, length, url parts, if it's an image, a
video, and so on.

## How to use

Make a call to the API endpoint:

`GET /api/:url`

The URL must be encoded, so `https://images.org/image.jpg` becomes `https%3A%2F%2Fimages.org%2Fimage.jpg`

The response will be like this:

```
{
  "error": false,
  "code": 200,
  "is": {
    "image": true,
    "audio": false,
    "video": false,
    "html": false,
    "xml": false,
    "css": false,
    "javascript": false
  },
  "content": {
    "type": "image/jpeg",
    "length": "106820"
  },
  "url": {
    "isSsl": false,
    "isHttp": true,
    "protocol": "http",
    "host": "images.org",
    "port": null,
    "hostName": "images.org",
    "hash": null,
    "search": null,
    "query": null,
    "queryParams": {},
    "pathName": "/image.jpg",
    "path": "/image.jpg",
    "href": "http://images.org/image.jpg"
  }
}

```

## TO DO

- Get OpenGraph information from Facebook tags in a page (those used as metadata when you share a link)

- A client library to abstract the API calls with a simple function call
