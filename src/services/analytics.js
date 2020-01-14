import analytics, { firebase } from '@react-native-firebase/analytics';

class Analytics {
  static init() {
    if (firebase.app().utils().isRunningInTestLab) {
      analytics().setAnalyticsCollectionEnabled(false);
    } else {
      analytics().setAnalyticsCollectionEnabled(true);
    }
  }

  static onSignIn = async userObject => {
    const { id, email } = userObject;
    await Promise.all([
      analytics().setUserId(id),
      analytics().setUserProperty('email', email),
    ]);
  };

  static onSignUp = async userObject => {
    const { id, email } = userObject;
    await Promise.all([
      analytics().setUserId(id),
      analytics().setUserProperty('email', email),
      analytics().setUserProperty('created_at', new Date()),
    ]);
  };

  static setCurrentScreen = async screenName => {
    console.log('setting', screenName);
    await analytics().setCurrentScreen(screenName, screenName);
  };

  static logEvent = async (eventName, propertyObject) => {
    await analytics().logEvent(eventName, propertyObject);
  }

  static onSignOut = async () => {
    await analytics().resetAnalyticsData();
  };
}

export default Analytics;