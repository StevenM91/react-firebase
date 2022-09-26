import React, { useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase.config";
import { useDispatch } from "react-redux";
import { addPost, getPosts } from "../actions/post.action";

const CreatePost = ({ uid, displayName }) => {
  const message = useRef();
  const dispatch = useDispatch();

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

    // Dispatch la fonction
    await dispatch(addPost(data));
    message.current.value = "";
    // On récupere la clé unique de chaque post directement
    dispatch(getPosts());
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
