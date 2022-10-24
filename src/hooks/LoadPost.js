import { useState, useEffect } from "react";
import { database } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const LoadPost = (postCollection, id) => {
  const [post, setpost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadpost = async () => {

      try {
        const postRef = await doc(database, postCollection, id);
        const postSnap = await getDoc(postRef);

        setpost(postSnap.data());
      } catch (error) {
        setError(error.message);
      }

    };

    loadpost();
  }, [postCollection, id]);

  return { post, error };
};