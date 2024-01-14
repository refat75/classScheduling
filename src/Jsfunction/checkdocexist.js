import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../Firebase/config';

const checkDocumentExists = async (collectionPath, documentId) => {
  const db = getFirestore(app);
  const docRef = doc(db, collectionPath, documentId);

  try {
    const docSnap = await getDoc(docRef);

    return docSnap.data();
  } catch (error) {
    console.error('Error checking document existence:', error.message);
    throw error;
  }
};
export default checkDocumentExists;
