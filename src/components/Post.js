import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editPost } from "../actions/post.action";
import CommentPost from "./CommentPost";
import Delete from "./Delete";

const Post = ({ post, user }) => {
  // on crée le state qui va nous permettre d'éditer le posts
  const [edit, setEdit] = useState(false);
  const [editMess, setEditMess] = useState(null);
  const dispatch = useDispatch();

  // on va crée une fonction qui va nous permettre de traiter la date
  const dateFormater = (date) => {
    let days = Math.floor((new Date() - new Date(date)) / (1000 * 3600 * 24));

    if (days === 0) {
      return "aujourd'hui";
    } else if (days === 1) {
      return "il y'a un jour";
    } else {
      return "il y'a " + days + "jours";
    }
  };

  //   on crée une fonction qui permettra quand on fais une modification que la modification sois aussi fais en BDD
  const handleEdit = () => {
    setEdit(false);

    if (editMess) {
      // dispatchEdit
      dispatch(
        editPost({
          id: post.id,
          message: editMess,
        })
      );
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="left-part">
          <div className="title">
            <span>{post.author[0]}</span>
            <h2>{post.author}</h2>
          </div>
          <h5>Posté {dateFormater(post.date)}</h5>
        </div>
        {/* On va crée un affiche conditionel qui va permettre de voir qu'elle utilisateur est connecter et donc lui donnée les droit de supprimer que sont post */}
        {post.authorId === user?.uid && (
          <div className="right-part">
            <span onClick={() => setEdit(!edit)}>
              <i className="fa-solid fa-pen-to-square"></i>
            </span>
            <Delete postId={post.id} />
          </div>
        )}
      </div>
      {/* on va tester si édit et sur true si oui on affichera une text area du message pour que l'utilisateur puisse modifier le message si il est sur false il y aura juste le post */}
      {edit ? (
        <>
          <textarea
            autoFocus
            value={editMess ? editMess : post.message}
            onChange={(e) => setEditMess(e.target.value)}
          ></textarea>
          <button className="edit-btn" onClick={() => handleEdit()}>
            Modifier Message
          </button>
        </>
      ) : (
        <p>{editMess ? editMess : post.message}</p>
      )}
      <CommentPost post={post} />
    </div>
  );
};

export default Post;
