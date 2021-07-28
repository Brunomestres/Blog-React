import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

let firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};
// Initialize Firebase

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.app = app.database();
    this.storage = app.storage();
  }

  login(email, password) {
    return app.auth().signInWithEmailAndPassword(email, password);
  }

  async register(nome, email, password) {
    await app.auth().createUserWithEmailAndPassword(email, password);
    const uid = app.auth().currentUser.uid;

    return app.database().ref('usuarios').child(uid).set({
      nome,
    });
  }

  isInitialized() {
    return new Promise((resolve) => {
      app.auth().onAuthStateChanged(resolve);
    });
  }

  getCurrent() {
    return app.auth().currentUser && app.auth().currentUser.email;
  }

  async getUserName(cb) {
    if (!app.auth().currentUser) {
      return null;
    }

    const uid = app.auth().currentUser.uid;
    await app.database().ref('usuarios').child(uid).once('value').then(cb);
  }

  getCurrentUid() {
    return app.auth().currentUser && app.auth().currentUser.uid;
  }

  logout() {
    return app.auth().signOut();
  }
}

export default new Firebase();
