import "./styles/styles.css";
import { IonApp, setupIonicReact } from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
//import { checkSession } from "./api/auth";

import { AuthProvider} from "./context/AuthContext";
import AppRoutes from "./components/AppRoutes";
import { useEffect } from "react";


setupIonicReact();

function App() {
    useEffect(() => {
    // 1. Crea o reutiliza OneSignalDeferred
    window.OneSignalDeferred = window.OneSignalDeferred || [];

    // 2. Espera a que el SDK se cargue
    const checkSDK = setInterval(() => {
      if (typeof window.OneSignalDeferred.push === "function") {
        clearInterval(checkSDK);

        // 3. Inicializa OneSignal
        window.OneSignalDeferred.push(async function (OneSignal: any) {
          console.log("🟦 Inicializando OneSignal...");

          try {
            await OneSignal.init({
              appId: "925350e1-eaa0-438b-a5fd-a77af8c8e3a6",
              notifyButton: { enable: true },
              allowLocalhostAsSecureOrigin: true, // 👈 útil para pruebas locales
            });

            console.log("✅ OneSignal inicializado correctamente");

            const permiso = await OneSignal.Notifications.permission;
            console.log("🔔 Permiso actual:", permiso);

            if (permiso !== "granted") {
              console.log("🟡 Solicitando permiso...");
              await OneSignal.Notifications.requestPermission();
            }

            // Espera un poco a que se registre el usuario
            setTimeout(() => {
              const userId = OneSignal.User.PushSubscription.id;
              console.log("🆔 User ID:", userId);
            }, 2000);
          } catch (err) {
            console.error("❌ Error al inicializar OneSignal:", err);
          }
        });
      }
    }, 500); // revisa cada medio segundo
  }, []);
  return (
    <IonApp>
      <AuthProvider>
      <AppRoutes />
      </AuthProvider>
    </IonApp>
  );
}

export default App;
