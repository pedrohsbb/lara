---
title: API Reference

language_tabs:
- bash
- javascript

includes:

search: true

toc_footers:
- <a href='http://github.com/mpociot/documentarian'>Documentation Powered by Documentarian</a>
---
<!-- START_INFO -->
# Info

Welcome to the generated API reference.
[Get Postman Collection](http://localhost/docs/collection.json)
<!-- END_INFO -->

#Example

Longer description
<!-- START_72d1791455793d429e1806564265eca6 -->
## This iaas the short description [and should be unique as anchor tags link to this in navigation menu]

This can be an optional longer description of your API call, used within the documentation.

> Example request:

```bash
curl -X GET "http://dev.laravel/api/v1/example/foo" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://dev.laravel/api/v1/example/foo",
    "method": "GET",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

> Example response:

```json
{
    "message": "The given data was invalid.",
    "errors": {
        "title": [
            "The title field is required."
        ],
        "body": [
            "The body field is required."
        ]
    }
}
```

### HTTP Request
`GET api/v1/example/foo`

`HEAD api/v1/example/foo`


<!-- END_72d1791455793d429e1806564265eca6 -->

