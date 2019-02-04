var links: { [id: string]: LinkOptions } = {};
links["web"] = {
  store: "http://download/test{qpenc}",
  launch: "http://open/test{qp}",
  redirect: "/clickfrommobile"
};
links["android"] = {
  store:
    "https://play.google.com/store/apps/details?id=com.thekinapp.dev&pcampaignid=fdl_long&url=https://thekinapp.com/invitation{qpenc}",
  launch: "https://thekinapp.com/group",
  redirect: null
};
links["ios"] = {
  store: "https://itunes.apple.com/app/id1437611153",
  launch: "com.thekinapp.dev://group{qp}",
  redirect: null
};

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

function prepareLinks(linkCheck: string, newUrl: string) {
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    var source = link.getAttribute("href");
    if (source.indexOf(linkCheck) >= 0) {
      link.href = newUrl
        .replace("{qp}", window.location.search)
        .replace("{qpenc}", encodeURIComponent(window.location.search));
    }
  }
}

(function() {
  // your page initialization code here
  // the DOM will be available here
  const channel = getMobileOperatingSystem();
  if (links[channel]) {
    console.log(channel);
    if (links[channel].redirect !== null) {
      // window.location.href = links[channel].redirect;
    }
    prepareLinks("itunes.apple.com", links[channel].store);
    prepareLinks("com.thekinapp", links[channel].launch);
  }
})();
