import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

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
import Tabs from "./pages/Tabs";
import { Redirect, Route } from "react-router";
import Login from "./pages/Login";
import AuthGuard from "./guards/AuthGuard";
import { checkSession } from "./api/auth";
import { useEffect, useState } from "react";


setupIonicReact();

function App() {

  const [user, setUser] = useState<string | null>(null);
   const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function fetchUser() {
    const responseuser = await checkSession(); 
    console.log("Usuario actual:", responseuser?.id);
      
      if (responseuser) {
        setUser(responseuser.id); // si ya devuelve el id, úsalo directo
      } else {
        setUser(null);
      }
       setLoading(false); 
    }
    fetchUser();
  }, []);

   if (loading) {
    return <div>Cargando sesión...</div>; // evita redirección prematura
  }

  return (
    <IonApp>
      <IonReactRouter>
        <Route exact path="/login" component={Login} />
        <Route path="/tabs">
          <AuthGuard isAuthenticated={!!user}>
            <Tabs />
          </AuthGuard>
        </Route>
        <Route exact path="/">
          <Redirect to={user != null ? "/tabs/tab1" : "/login"} />
        </Route>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
