import React, { useEffect, useState } from 'react';
import { IonReactRouter } from "@ionic/react-router";
import Tabs from "../pages/Tabs";
import { Redirect, Route } from "react-router";
import Login from "../pages/Login";
import AuthGuard from "../guards/AuthGuard";
import { checkSession } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const AppRoutes: React.FC = () => {
  const {login} = useAuth();
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); 


      useEffect(() => {
         async function fetchUser() {
         const responseuser = await checkSession(); 
           if (responseuser) {
            //console.log(responseuser);
            
             setUser(responseuser.id); // si ya devuelve el id, úsalo directo
              login(responseuser.id, responseuser.user_metadata.full_name, responseuser.user_metadata.avatar_url); // usa el hook de login para establecer el usuario
            } 
            setLoading(false); 
         }
        fetchUser();
      }, []);

         if (loading) {
    return <div>Cargando sesión...</div>; // evita redirección prematura
  }
    

return (
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
)};

export default AppRoutes;