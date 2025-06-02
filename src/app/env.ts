// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyAwqAL5AQzEyqvBeKKO2LTeaudO0MuOCZk',
    authDomain: 'dzire-1ec0f.firebaseapp.com',
    projectId: 'dzire-1ec0f',
    storageBucket: 'dzire-1ec0f.firebasestorage.app',
    messagingSenderId: '97266561150',
    appId: '1:97266561150:web:5867d712aab58168d9e82f',
    measurementId: 'G-V29BML2N4X',
  },
};

// Initialize Firebase
export const app = initializeApp(environment.firebaseConfig);
