import React, { useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase.config";

const CreatePost = ({ uid, displayName }) => {
  const message = useRef();

  const handlePost = async (e) => {
    e.preventDefault();

    // on fait passer les élément pour qu'il soyent envoyer en BDD sur firebase
    const data = {
      author: displayName,
      authorId: uid,
      message: message.current.value,
      comments: null,
      date: Date.now(),
    };
    // permet de ce controller si on récupere bien le message
    // console.log(data);

    // on crée le create du crud en react , le addDoc ces cela qui permet d'envoyer les élément en BDD
    await addDoc(collection(db, "posts"), data);
    message.current.value = "";
  };

  return (
    <div className="new-post-modal">
      <form onSubmit={(e) => handlePost(e)}>
        <textarea placeholder="Message..." ref={message}></textarea>
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default CreatePost;
