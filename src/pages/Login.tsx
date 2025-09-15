import { IonContent, IonPage, IonSpinner } from "@ionic/react";
import "./Tab1.css";
import { useState } from "react";

import "./Login.css";
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
      } else {
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="150"
            height="150"
            viewBox="0 0 150 150"
          >
            <circle
              cx="75"
              cy="75"
              r="70"
              stroke="#000"
              stroke-width="6"
              fill="white"
            />
            <polygon points="75,35 95,60 85,90 65,90 55,60" fill="#000" />
            <line
              x1="75"
              y1="35"
              x2="75"
              y2="115"
              stroke="#000"
              stroke-width="4"
            />
            <line
              x1="35"
              y1="75"
              x2="115"
              y2="75"
              stroke="#000"
              stroke-width="4"
            />

            <rect
              x="55"
              y="120"
              width="40"
              height="20"
              rx="3"
              ry="3"
              fill="#007BFF"
            />
            <text
              x="75"
              y="135"
              font-family="monospace"
              font-size="12"
              text-anchor="middle"
              fill="white"
            >
              2 - 1
            </text>
          </svg>

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
