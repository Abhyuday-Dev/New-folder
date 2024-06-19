import { db } from "@/firebaseConfig";
import { DocumentResponse, ProfileInfo, post } from "@/types";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  getDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const COLLECTION_NAME = "posts";

export const createPost = (post: post) => {
  return addDoc(collection(db, COLLECTION_NAME), post);
};

export const getPosts = async () => {
  const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"));
  const querySnapshot = await getDocs(q);
  const tempArr: DocumentResponse[] = [];
  if (querySnapshot.size > 0) {
    querySnapshot.forEach((doc) => {
      const data = doc.data() as post;
      const responseObj: DocumentResponse = {
        id: doc.id,
        ...data,
      };
      tempArr.push(responseObj);
    });
    return tempArr;
  } else {
    console.log("No documents");
  }
};

export const getPostByUserId = (id: string) => {
  const q = query(collection(db, COLLECTION_NAME), where("userId", "==", id));
  return getDocs(q);
};

export const getPost = (id: string) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return getDoc(docRef);
};

export const deletePost = (id: string) => {
  return deleteDoc(doc(db, COLLECTION_NAME, id));
};

export const updateLikesonPost = async (
  id: string,
  userlikes: string[],
  likes: number
) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  try {
    await updateDoc(docRef, {
      likes: likes,
      userlikes: userlikes,
    });
    console.log(
      `Likes updated successfully: ${likes} likes, UserLikes: ${userlikes}`
    );
  } catch (error) {
    console.error("Error updating likes:", error);
    throw error; // Re-throw the error to handle it in the caller function
  }
};

export const updateUserInfoOnPost = async (profileInfo: ProfileInfo) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("userId", "==", profileInfo.user?.uid)
  );
  const querySnapShot = await getDocs(q);
  if (querySnapShot.size > 0) {
    querySnapShot.forEach((document) => {
      const docRef = doc(db, COLLECTION_NAME, document.id);
      updateDoc(docRef, {
        username: profileInfo.displayName,
        photoURL: profileInfo.photoURL,
      });
    });
  } else {
    console.log("No snapshots found");
  }
};
