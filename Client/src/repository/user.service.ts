import { db } from "@/firebaseConfig";
import { ProfileResponse, UserProfile } from "@/types";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";

const COLLECTION_NAME = "users";

export const createUserProfile = (user: UserProfile) => {
  try {
    return addDoc(collection(db, COLLECTION_NAME), user);
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("userId", "==", userId)
    );
    const querySnapShot = await getDocs(q);
    let tempData: ProfileResponse = {};
    if (querySnapShot.size > 0) {
      querySnapShot.forEach((doc) => {
        const userData = doc.data() as UserProfile;
        tempData = {
          id: doc.id,
          ...userData,
        };
      });
      return tempData;
    } else {
      console.log("No documents found");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUserProfile=async(id:string,user:UserProfile)=>{
    const docRef=doc(db,COLLECTION_NAME,id);
    return updateDoc(docRef,{...user});
}

export const getAllUsers=async(userId:string)=>{
  try {
    const querySnapShot = await getDocs(collection(db,COLLECTION_NAME));
    const tempArr:ProfileResponse[]=[];
    if(querySnapShot.size>0){
      querySnapShot.forEach((doc) => {
        const userData = doc.data() as UserProfile;
        const responseObj: ProfileResponse = {
          id: doc.id,
          ...userData,
        };
        tempArr.push(responseObj);
      });
      return tempArr.filter((item)=>item.userId!=userId);
    }else{
      console.log("No snapshots available");
    }
  } catch (error) {
    console.log(error);
  }
}