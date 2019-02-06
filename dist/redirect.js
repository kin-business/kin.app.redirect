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
function prepareLinks(linkCheck, slug, newUrl) {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        var source = link.getAttribute("href");
        var queryParams = window.location.search.indexOf("?") === 0
            ? window.location.search.substr(1, window.location.search.length - 1)
            : window.location.search;
        if (source.indexOf(linkCheck) >= 0) {
            link.href = newUrl
                .replace("{qp}", queryParams)
                .replace("{slug}", slug)
                .replace("{qpenc}", encodeURIComponent(queryParams));
            return true;
        }
    }
    return false;
}
function injectLinks(slug) {
    var channel = getMobileOperatingSystem();
    var links = buildLinks();
    if (links[channel]) {
        if (links[channel].redirect !== null) {
            console.log("Redirect:" + links[channel].redirect);
        }
        prepareLinks("itunes.apple.com", slug, links[channel].store);
        prepareLinks("com.thekinapp.dev://", slug, links[channel].launch);
    }
}
function getParameterByName(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function buildLinks() {
    var links = {};
    links["web"] = {
        store: "https://thekinapp.com/clickfrommobile?s={slug}&redirect={qpenc}",
        launch: "https://thekinapp.com/clickfrommobile?s={slug}&{qp}",
        redirect: "/clickfrommobile"
    };
    var env = getParameterByName("env", window.location.href);
    console.log(env);
    if (env == "dev") {
        links["android"] = {
            store: "https://play.google.com/store/apps/details?id=com.thekinapp.dev&pcampaignid=fdl_long&url=https://thekinapp.com/{slug}?{qpenc}",
            launch: "https://thekinapp.com/{slug}?{qp}",
            redirect: null
        };
        links["ios"] = {
            store: "https://itunes.apple.com/app/id1437611153",
            launch: "com.thekinapp.dev://{slug}?{qp}",
            redirect: null
        };
    }
    else {
        links["android"] = {
            store: "https://play.google.com/store/apps/details?id=com.thekinapp.prod&pcampaignid=fdl_long&url=https://thekinapp.com/{slug}?{qpenc}",
            launch: "https://thekinapp.com/{slug}?{qp}",
            redirect: null
        };
        links["ios"] = {
            store: "https://itunes.apple.com/app/id1437611153",
            launch: "com.thekinapp://{slug}?{qp}",
            redirect: null
        };
    }
    return links;
}
