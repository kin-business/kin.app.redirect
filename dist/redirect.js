var links = {};
links["web"] = {
    store: "http://download/test{qpenc}",
    launch: "http://open/test{qp}",
    redirect: "/clickfrommobile"
};
links["android"] = {
    store: "https://play.google.com/store/apps/details?id=com.thekinapp.dev&pcampaignid=fdl_long&url=https://thekinapp.com/invitation{qpenc}",
    launch: "https://thekinapp.com/group",
    redirect: null
};
links["ios"] = {
    store: "https://itunes.apple.com/app/id1437611153",
    launch: "com.thekinapp.dev://group{qp}",
    redirect: null
};
var LinkOptions = /** @class */ (function () {
    function LinkOptions() {
    }
    return LinkOptions;
}());
function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.window.opera;
    if (/android/i.test(userAgent)) {
        return "android";
    }
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.window.MSStream) {
        return "ios";
    }
    return "web";
}
function prepareLinks(linkCheck, newUrl) {
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
var channel = getMobileOperatingSystem();
if (links[channel]) {
    console.log(channel);
    if (links[channel].redirect !== null) {
        window.location.href = links[channel].redirect;
    }
    prepareLinks("itunes.apple.com", links[channel].store);
    prepareLinks("com.thekinapp", links[channel].launch);
}
