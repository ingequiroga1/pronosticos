import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab2.css";
import { useAuth } from "../context/AuthContext";
import { logOutOutline } from "ionicons/icons";
import { useEffect } from "react";


const Tab2: React.FC = () => {
  const { pronosticos,logout,fetchPronXUsuario } = useAuth();
  useEffect(() => {
      async function fetchData() {
        try {
          fetchPronXUsuario();
        } catch (err) {
          console.error("No se pudieron cargar las jornadas:", err);
        }
      }
      fetchData();
    }, []);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Resultados</IonTitle>
          {/* Botón de logout en la esquina derecha */}
          <IonButtons slot="end">
            <IonButton onClick={logout}>
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Resultados</IonTitle>
          </IonToolbar>
        </IonHeader>
        {pronosticos && pronosticos.map((jornada, i) => (
          <IonCard key={i}>
            <IonCardHeader>
              <IonCardTitle>{jornada.nombre}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                {jornada.partidos.map((partido, j) => {
                  const acerto = partido.pronostico === partido.resultado;
                  return (
                    <IonItem key={j} color={acerto ? "success" : undefined}>
                      <IonLabel>
                        <h2>
                          {partido.equipo_local} vs {partido.equipo_visitante}
                        </h2>
                        <p>
                          Pronóstico:{" "}
                          <IonBadge color="medium">
                            {partido.pronostico}
                          </IonBadge>
                        </p>
                      </IonLabel>

                      {/* Resultado al final del item */}
                      <IonBadge
                        slot="end"
                        color={acerto ? "light" : "tertiary"}
                      >
                        {partido.resultado}
                      </IonBadge>
                    </IonItem>
                  );
                })}
              </IonList>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
