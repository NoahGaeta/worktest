import * as firebase from 'firebase';
import 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDKJk5zF1BsfSXkGjovA1RXcrMwLhbOyLI",
  projectId: "task-manager-71b4c"
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

const firebasedb = firebase.firestore();
export default firebasedb;