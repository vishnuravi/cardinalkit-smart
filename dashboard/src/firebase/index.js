import app from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  iOSAppBundleId: "",
};

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(config);
    }

    this.db = app.firestore();
    this.surveys = (userID) => this.db.collection(`studies/${config.iOSAppBundleId}/users/${userID}/surveys/`);
  }
}

export default Firebase;
