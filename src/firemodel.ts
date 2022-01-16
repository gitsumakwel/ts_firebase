import { db } from './firebase'
import { setDoc, addDoc, doc, getDoc, collection, updateDoc } from "firebase/firestore";

const collectionId = "counters";
const documentId = "counter";
type n = number;

const getDocument = async() => {
  return await getDoc(doc(db, collectionId, documentId));
}

const setDocument = async (count:n) => {
  const value = { count: count };
  setDoc(doc(db, collectionId, documentId), value)
}

const updateDocx = async (count:n)=> {
  const value = { count: count };
  const docref = await doc(db,collectionId,documentId);
  updateDoc(docref,value)

  //docref.update(value)
}

const addDocument = async (count:n) => {
  const value = { count: count };  
  await addDoc(collection(db,collectionId),value)
}
export{
  setDocument,
  addDocument,
  getDocument,
  updateDocx,
}
