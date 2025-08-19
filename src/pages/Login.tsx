import {
  IonContent,
  IonPage,
  IonSpinner
} from "@ionic/react";
import "./Tab1.css";
import { useState } from "react";

import './Login.css'; 
import { signInWithGoogle } from "../api/auth";
import { useHistory } from "react-router";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithGoogle();
      //const error = result?.error;
      console.log("Resultado de la autenticación:", result);
      

       if (result?.error) {
             console.log("Error al iniciar sesión:", result.error.message);
            
           }else{
            history.push("/tabs/tab1");
           }

    } catch (error) {
      console.error("Error al iniciar sesión", error);
    } finally {
      setLoading(false);
    }
  };

  return (
     <IonPage>
      <IonContent fullscreen>
        <div className="login-container">
          {/* Icono */}
          <img
            src="/assets/images/app-icon.png"
            alt="App Icon"
            className="app-icon"
          />

          {/* Botón */}
          <button
            className="google-btn"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {loading ? (
              <IonSpinner name="crescent" color="light" />
            ) : (
              <>
                <img
                  src="/assets/images/google-icon.png"
                  alt="Google Icon"
                  className="google-icon"
                />
                Iniciar sesión con Google
              </>
            )}
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
