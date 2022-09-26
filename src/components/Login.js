import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../utils/firebase.config";

const Login = () => {
  // On crée la logique de connexion qui va permettre d'aller chercher les donnée dans la bdd et vérifier si l'utilisateur existe pour qu'il puisse avoir acces à l'application

  const loginEmail = useRef();
  const loginPassword = useRef();
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail.current.value,
        loginPassword.current.value
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <h3>Se connecter</h3>
        <form className="form-login" onSubmit={(e) => handleLogin(e)}>
          <input type="email" placeholder="Email" required ref={loginEmail} />
          <input
            type="password"
            placeholder="Mot de passe"
            required
            ref={loginPassword}
          />
          <input type="submit" value="Se connecter" />
          {/* on crée la logique de l'erreur au cas ou l'email ou le mot de passe sois incorrect */}
          <span>
            {error && "Le mail ou le mot de passe ne correspondent pas"}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
