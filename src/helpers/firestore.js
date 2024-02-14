import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const fetchData = async (collectionName, id, data) => {
  try {
    const records = await getDoc(doc(db, collectionName, id));
    if (records.exists()) {
      if (data) {
        return records.get(data);
      }
      return records.data();
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const saveData = async (collectionName, id, data, merge = true) => {
  try {
    await setDoc(doc(db, collectionName, id), { ...data, timestamp: Timestamp.now() }, { merge });
  } catch (error) {
    console.log(error);
  }
};

export const updateCollectionData = async (collectionName, id, data) => {
  try {
    await updateDoc(doc(db, collectionName, id), { ...data });
  } catch (error) {
    console.log(error);
  }
};

export const removeData = async (collectionName, id) => {
  try {
    await deleteDoc(doc(db, collectionName, id));
  } catch (error) {
    console.log(error);
  }
};

export const getRealtimeUpdate = (collectionName, id, callback) => {
  try {
    onSnapshot(doc(db, collectionName, id), (doc) => {
      callback(doc.data());
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllUserData = async (collectionName, userId) => {
  try {
    const q = query(collection(db, collectionName), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUserData = (collectionName, userId, callback) => {
  try {
    const q = query(collection(db, collectionName), where('userId', '==', userId));
    getDocs(q).then((snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, data: doc.data() });
      });
      callback(data);
    });
  } catch (error) {
    console.log(error);
  }
};
