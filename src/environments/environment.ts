import { initializeApp } from "firebase/app";

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDPBqmfIP6WJDB8WCLcKyjiFE_n2kCEG5Y",
    authDomain: "tellevo-a9c14.firebaseapp.com",
    projectId: "tellevo-a9c14",
    storageBucket: "tellevo-a9c14.appspot.com",
    messagingSenderId: "906252892202",
    appId: "1:906252892202:web:06805c6604c7eb752d2b53"
  },
  apiUrl:"https://uber-nodejs-server-git-d61f89-guillermovillacuratorres-projects.vercel.app/api/"
};



// Initialize Firebase
const app = initializeApp();
