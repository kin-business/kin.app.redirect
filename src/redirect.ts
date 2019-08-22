class LinkOptions {
  store: string;
  launch: string;
  redirect: string;
}

function getMobileOperatingSystem() {
  var userAgent =
    navigator.userAgent || navigator.vendor || (window as any).window.opera;
  if (/android/i.test(userAgent)) {
    return "android";
  }
  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).window.MSStream) {
    return "ios";
  }

  return "web";
}

function prepareLinks(linkCheck: string, slug: string, newUrl: string) {
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    var source = link.getAttribute("rel");

    const queryParams =
      window.location.search.indexOf("?") === 0
        ? window.location.search.substr(1, window.location.search.length - 1)
        : window.location.search;
    var search = location.search.substring(1);
    var d = JSON.parse(
      '{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
      function(key, value) {
        return key === "" ? value : decodeURIComponent(value);
      }
    );
    console.log("d", d);
    if (source != null && source.indexOf(linkCheck) >= 0) {
      link.href = newUrl
        .replace("{qp}", queryParams)
        .replace("{slug}", slug)
        .replace("{qpenc}", encodeURIComponent(queryParams))
        .replace("{uid}", d.uid);
      return true;
    }
  }
  return false;
}

function readSlug() {
  return window.location.pathname.replace(/\//g, "") || "home";
}

function injectLinks() {
  const channel = getMobileOperatingSystem();
  const slug = readSlug();
  const links = buildLinks();

  // console.log("channel", channel);
  // console.log("slug", slug);
  // console.log("links", links);

  if (links[channel]) {
    if (links[channel].redirect !== null) {
      console.log("Redirect:" + links[channel].redirect);
    }
    prepareLinks("download", slug, links[channel].store);
    prepareLinks("open-app", slug, links[channel].launch);
  }
}

function getParameterByName(name: string, url: string): string {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function buildLinks(): { [id: string]: LinkOptions } {
  var links: { [id: string]: LinkOptions } = {};

  const env = getParameterByName("env", window.location.href);

  if (env == "dev") {
    links["android"] = {
      store:
        "https://play.google.com/store/apps/details?id=com.thekinapp.dev&pcampaignid=fdl_long&url=https://thekinapp.com/{slug}?{qpenc}",
      launch: "https://thekinapp.com/{slug}?{qp}",
      redirect: null
    };
    links["ios"] = {
      store: "https://itunes.apple.com/app/id1437611153",
      launch: "com.thekinapp.dev://{slug}?{qp}",
      redirect: null
    };
    links["web"] = {
      store:
        "https://web.dev.thekinapp.com/home/kins/{slug}/{uid}?&redirect={qpenc}",
      launch:
        "https://web.dev.thekinapp.com/home/kins/{slug}/{uid}?&redirect={qpenc}",
      redirect: "/clickfrommobile"
    };
  } else {
    links["android"] = {
      store:
        "https://play.google.com/store/apps/details?id=com.thekinapp.prod&pcampaignid=fdl_long&url=https://thekinapp.com/{slug}?{qpenc}",
      launch: "https://thekinapp.com/{slug}?{qp}",
      redirect: null
    };
    links["ios"] = {
      store: "https://itunes.apple.com/app/id1437611153",
      launch: "com.thekinapp://{slug}?{qp}",
      redirect: null
    };
    links["web"] = {
      store:
        "https://web.thekinapp.com/home/kins/{slug}/{uid}?&redirect={qpenc}",
      launch:
        "https://web.thekinapp.com/home/kins/{slug}/{uid}?&redirect={qpenc}",
      redirect: "/clickfrommobile"
    };
  }
  return links;
}
