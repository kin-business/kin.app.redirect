# kin.app.redirect

Used to redirect the app when the dynamic links fail.

When calling https://www.thekinapp.com/redirect?uid=123 we want to allow user to download app or go to link. This is just a fallback.

```js

<script src="https://cdn.jsdelivr.net/gh/kin-business/kin.app.redirect/dist/redirect.js" type="text/javascript"></script>
<script type="text/javascript">
  window.onload = function () { injectLinks("group"); }
</script>
```
