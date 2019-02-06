# kin.app.redirect

Here are some guidelines to building dynamic links with fallbacks.

## Store links

Links to the IOS and android stores.

### Andoid

- Prod = https://play.google.com/store/apps/details?id=com.thekinapp.prod
- Dev = https://play.google.com/store/apps/details?id=com.thekinapp.dev

### Ios

- Prod = https://itunes.apple.com/app/id1437611153
- Dev = Buddy build?

## Share kin app

### Links

Link

- Prod = https://kinapp.page.link/kin
- Dev = https://thekinapp.page.link/kin

The fallback url is https://www.thekinapp.com/clickfrommobile

## Invites

Example link : https://thekinapp.page.link/aDD9P7ZCb5GQjw568?d=1

Links

- **Prod** Using firebase dynamic links as follow.

  ```json
  {
    "dynamicLinkInfo": {
      "domainUriPrefix": "https://kinapp.page.link",
      "link": "https://thekinapp.com/invite?uid=XXXXXXXXXXXXXXX",
      "androidInfo": {
        "androidPackageName": "com.thekinapp.prod"
      },
      "iosInfo": {
        "iosBundleId": "com.thekinapp"
      }
    }
  }
  ```

- **Dev** Using firebase dynamic links as follow.
  ```json
  {
    "dynamicLinkInfo": {
      "domainUriPrefix": "https://thekinapp.page.link",
      "link": "https://thekinapp.com/invite?uid=XXXXXXXXXXXXXXX&env=dev",
      "androidInfo": {
        "androidPackageName": "com.thekinapp.dev"
      },
      "iosInfo": {
        "iosBundleId": "com.thekinapp.dev"
      }
    }
  }
  ```

## Group

Example link : https://thekinapp.page.link/NvdDE7CB1Ea7KEEx5?d=1

Links

- **Prod** Using firebase dynamic links as follow.

  ```json
  {
    "dynamicLinkInfo": {
      "domainUriPrefix": "https://kinapp.page.link",
      "link": "https://thekinapp.com/group?uid=XXXXXXXXXXXXXXX",
      "androidInfo": {
        "androidPackageName": "com.thekinapp.prod"
      },
      "iosInfo": {
        "iosBundleId": "com.thekinapp"
      }
    }
  }
  ```

- **Dev** Using firebase dynamic links as follow.
  ```json
  {
    "dynamicLinkInfo": {
      "domainUriPrefix": "https://thekinapp.page.link",
      "link": "https://thekinapp.com/group?uid=XXXXXXXXXXXXXXX&env=dev",
      "androidInfo": {
        "androidPackageName": "com.thekinapp.dev"
      },
      "iosInfo": {
        "iosBundleId": "com.thekinapp.dev"
      }
    }
  }
  ```

## Adding js to website

```js
<script src="https://cdn.jsdelivr.net/gh/kin-business/kin.app.redirect/dist/redirect.js" type="text/javascript"></script>
<script type="text/javascript">
  window.onload = function () { injectLinks("group"); }
</script>
```

## Reference

- Firebase dynamic links: https://firebase.google.com/docs/dynamic-links/create-links
