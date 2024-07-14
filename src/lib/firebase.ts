// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
    apiKey: "AIzaSyA1LZ90oFV_cIPdgATUqRyjx-T_IOLmozM",
    authDomain: "good-dentist-e685f.firebaseapp.com",
    databaseURL: "https://good-dentist-e685f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "good-dentist-e685f",
    storageBucket: "good-dentist-e685f.appspot.com",
    messagingSenderId: "395371135494",
    appId: "1:395371135494:web:02a51c8384c307ffadb987",
    measurementId: "G-VT56H14P40"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const realtimeDB = getDatabase(app);
