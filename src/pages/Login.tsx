import { IonContent, IonPage, IonSpinner } from "@ionic/react";
import "./Login.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { signInWithGoogle } from "../api/auth";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");
    if (ref) {
      localStorage.setItem("referido_por", ref);
    }
  }, [location.search]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithGoogle();
      console.log("Resultado de la autenticación:", result);
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="login-background">
        <div className="login-container">
          {/* Logo */}
          <p>Pronostify</p>
          <h1 className="app-logo">¡LA COMPETENCIA <br /> INICIA AHORA!</h1>

          {/* Leyenda descriptiva */}
          <p className="app-description">
            Participa con solo $20 <br /> y llévate el gran premio en <br /> efectivo de la jornada.
          </p>

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
                Continuar con Google
              </>
            )}
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
