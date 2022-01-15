import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAamMEw1qc8WxkcH8IzWuzv0Tjx8vnFdD4",
  authDomain: "vi-education.firebaseapp.com",
  databaseURL: "https://wordle.europe-west1.firebasedatabase.app/",
  projectId: "vi-education",
  storageBucket: "vi-education.appspot.com",
  messagingSenderId: "195083905625",
  appId: "1:195083905625:web:ad4a861ff525d6073bdf48",
  measurementId: "G-Y1EDM0SPYT",
};

const app = initializeApp(firebaseConfig);

export const firedb = getDatabase(app);
