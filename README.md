# kin.app.redirect
Used to redirect the app when the dynamic links fail.

  state = {
    operatingSystem: 'web',
    links: {
      web: {
        store: '',
        launch: ''
      },
      android: {
        store:
          'https://play.google.com/store/apps/details?id=com.thekinapp.dev&pcampaignid=fdl_long&url=https://thekinapp.com/invitation?uid%3D9f30c0c36a86404c92eacb7313659ebd',
        launch: 'https://thekinapp.com/invitation?uid=9f30c0c36a86404c92eacb7313659ebd'
      },
      ios: {
        store: 'https://itunes.apple.com/app/id1437611153',
        launch: 'com.thekinapp.dev://invitation?uid=9f30c0c36a86404c92eacb7313659ebd'
      }
    }
  };
  componentDidMount() {
    this.setState({ operatingSystem: this.getMobileOperatingSystem() });
  }

  getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    // if (/windows phone/i.test(userAgent)) {
    //   return 'Windows Phone';
    // }

    if (/android/i.test(userAgent)) {
      return 'android';
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'ios';
    }

    return 'web';
  }
