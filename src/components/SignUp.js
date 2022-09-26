import React, { useRef, useState } from "react";
import { auth } from "../utils/firebase.config";

const SignUp = () => {
  // On va récuperer ce qui est taper dans les inputs cela servira pour l'envoie en bdd à firebase
  const registerEmail = useRef();
  const registerPassword = useRef();
  const [displayName, setDisplayName] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // on va crée la logique pour que quand l'utilisateur s'inscrie cela permettra à ce que on envoie les information en bdd
    // cela en appelant auth va nous permettre d'envoyer les information àla base de donnée de firebase
    // dans le try on va mettre pour passer les donnée du pseudo
    try {
      auth
        .createUserWithEmailAndPassword(
          registerEmail.current.value,
          registerPassword.current.value
        )
        .then(async (userAuth) => {
          await userAuth.user.updateProfile({
            displayName,
          });
        });
    } catch (error) {
      console.log(error.message);
    }
    // le log va permettre de vérifier si on récupere bien nos information dans notre useRef
    // console.log(registerEmail.current.value, registerPassword.current.value);
  };

  return (
    <div className="signup-container">
      <div className="signup">
        <h3>S'inscrire</h3>
        <form onSubmit={(e) => handleRegister(e)}>
          <input
            type="text"
            placeholder="Pseudo"
            required
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            ref={registerEmail}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            required
            ref={registerPassword}
          />
          <input type="submit" value="Valider l'inscription" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
