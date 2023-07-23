import { initializeApp } from "firebase/app";
import {getStorage, uploadBytes, ref, getDownloadURL} from "firebase/storage";
import {v4} from 'uuid'

const firebaseConfig = {
  apiKey: "AIzaSyDyCrsKDHfiqGdUwP0SUMyi8tL0cC0Szos",
  authDomain: "festejandoando-c9a75.firebaseapp.com",
  projectId: "festejandoando-c9a75",
  storageBucket: "festejandoando-c9a75.appspot.com",
  messagingSenderId: "857280273012",
  appId: "1:857280273012:web:66349a27f276844f420f21",
  measurementId: "G-R804F6KJJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file) {
    const storageRef = ref(storage, v4());
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef)
}
