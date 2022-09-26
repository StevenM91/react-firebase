import React from "react";

const Post = ({ post, user }) => {
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
            <span>
              <i className="fa-solid fa-pen-to-square"></i>
            </span>
            <span>DELETE</span>
          </div>
        )}
      </div>
      <p>{post.message}</p>
    </div>
  );
};

export default Post;
