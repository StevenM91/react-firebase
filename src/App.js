import { useEffect, useState } from "react";
import ConnectModal from "./components/ConnectModal";
import "./styles/index.scss";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./utils/firebase.config";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./actions/post.action";

function App() {
  //on crée une variable pour stocker nos donnée utilisateur
  const [user, setUser] = useState(null);

  // On va aller chercher les donnée dans la base de donnée pour les récuperer puis les afficher grâce a map
  const posts = useSelector((state) => state.postReducer);

  const dispatch = useDispatch();

  // on crée une methode pour vérifier si l'utilisateur est connecter
  // cela nous permet de vérifier n'importe ou dans notre site si notre utilisateur est connecter
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  // paramettre de la déconnexion
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <div className="app-header">
        {/* la on lui demande si user existe alors si oui mais moi sa */}
        {user && (
          <div className="user-infos">
            <span>{user?.displayName[0]}</span>
            <h4>{user?.displayName}</h4>
            <button onClick={() => handleLogout()}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        )}
        {/* on crée une condition d'afficher qui va demander si user existe et biensur connecter affiche moi cela sinon affiche connexion ou inscription */}
        {/* dans créate posts on passe en propos les élément car cela à était coder plus haut cela permettra de récuperer les information utilisateur */}
        {user ? (
          <CreatePost uid={user.uid} displayName={user.displayName} />
        ) : (
          <ConnectModal />
        )}
      </div>
      <div className="posts-container">
        {posts.length > 0 &&
          posts
            .sort((a, b) => b.date - a.date)
            .map((post) => <Post post={post} key={post.id} user={user} />)}
      </div>
    </div>
  );
}

export default App;
