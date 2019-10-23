var LinkOptions = /** @class */ (function() {
  function LinkOptions() {}
  return LinkOptions;
})();

function readSlug() {
  return window.location.pathname.replace(/\//g, "") || "home";
}

function injectLinks() {
  var slug = readSlug();
  if (slug == "group" || slug == "invite") {
    var env = getParameterByName("env", window.location.href);
    var uid = getParameterByName("uid", window.location.href);
    var link =
      slug == "group"
        ? `https://web.kin.me/home/kins/group/${uid}`
        : `https://web.kin.me/invite/${uid}`;
    if (env == "dev") {
      var link =
        slug == "group"
          ? `https://web.dev.kin.me/home/kins/group/${uid}`
          : `https://web.dev.kin.me/invite/${uid}`;
    }
    console.log("Redirect to ", link);
    document.location = link;
  }
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
