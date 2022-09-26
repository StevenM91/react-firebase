import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const ConnectModal = () => {
  // on va crée des state pour savoir si on va s'inscrire ou se connecter
  // on mais true pour permettre de m'ettre s'inscrire avant
  const [signUp, setSignUp] = useState(true);

  return (
    <div className="connect-modal">
      <div className="header-btn">
        {/* on va mettre du style conditionnel pour faire quand on change d'onglet pour savoir si on est sur se connecter ou s'inscrire */}
        {/* on va demander si s'inscrire est sur true alors tu m'affiche sa sinon tu m'affiche sa sinon sa sa sera pareille pour se connecter */}
        <button
          style={{ background: SignUp ? "rgb(28,28,28)" : "rgb(83,83,83)" }}
          onClick={() => setSignUp(true)}
        >
          S'inscrire
        </button>
        <button
          style={{ background: SignUp ? "rgb(83,83,83) " : "rgb(28,28,28)" }}
          onClick={() => setSignUp(false)}
        >
          Se connecter
        </button>
      </div>
      {/* La on demande si SignUp est sur true sinon affiche moi Login */}
      {signUp ? <SignUp /> : <Login />}
    </div>
  );
};

export default ConnectModal;
