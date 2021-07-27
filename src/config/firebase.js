import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
  apiKey: 'AIzaSyC1H1YSgFfvVXNBwJ4pRZ0XBdeW59PQKJg',
  authDomain: 'blog-30b4d.firebaseapp.com',
  projectId: 'blog-30b4d',
  storageBucket: 'blog-30b4d.appspot.com',
  messagingSenderId: '849863243750',
  appId: '1:849863243750:web:0a6194d0b25e1c3b058827',
  measurementId: 'G-GNJFG1ZVL3',
};
// Initialize Firebase

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.app = app.database();
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
}

export default new Firebase();
