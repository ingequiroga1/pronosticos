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


const Tab2: React.FC = () => {
  const { pronosticos,logout } = useAuth();
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
                  const acerto = partido.pronostico === partido.resultadoReal;
                  return (
                    <IonItem key={j} color={acerto ? "success" : undefined}>
                      <IonLabel>
                        <h2>
                          {partido.local} vs {partido.visitante}
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
                        {partido.resultadoReal}
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
