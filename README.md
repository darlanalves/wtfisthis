# wtfisthis

WTFisthis is a super simple http server that handles any URL and returns a JSON with some
information about that URL, such as content type, length, url parts, if it's an image, a
video, and so on.

## How to use

Make a call to this endpoint and you get a JSON with the good stuff, like this:

```
GET /api/[url-encoded]
```

## TO DO

- Get OpenGraph information from Facebook tags in a page (those used as metadata when you share a link)

- A client library to abstract the API calls with a simple function call
