import { Timestamp, addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const fetchData = async (collectionName, id, data) => {
  console.log(collectionName, id, data);
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

export const saveData = async (collectionName, id, data) => {
  try {
    await setDoc(doc(db, collectionName, id), { ...data, timestamp: Timestamp.now() }, { merge: true });
  } catch (error) {
    console.log(error);
  }
};

export const addDataWithAutoId = async (collectionName, data) => {
  try {
    const record = await addDoc(collection(db, collectionName), data);
    return record.id;
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
    const unsubscribe = onSnapshot(doc(db, collectionName, id), (doc) => {
      console.log(doc.data());
      callback(doc.data());
    });
    return unsubscribe;
  } catch (error) {
    console.log(error);
  }
};
