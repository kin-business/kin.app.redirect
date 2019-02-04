function getMobileOperatingSystem() {
  var userAgent =
    navigator.userAgent || navigator.vendor || (window as any).window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  // if (/windows phone/i.test(userAgent)) {
  //   return 'Windows Phone';
  // }

  if (/android/i.test(userAgent)) {
    return "android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).window.MSStream) {
    return "ios";
  }

  return "web";
}
//document.body.innerHTML = getMobileOperatingSystem();
const channel = getMobileOperatingSystem();
console.log(channel);
