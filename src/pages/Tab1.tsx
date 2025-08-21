import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab1.css";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Tab1: React.FC = () => {
  const { usuario, jornadas, fetchJornadas } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        fetchJornadas();
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
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Bienvenido</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <h2>Bienvenido {usuario}</h2>
            Aquí puedes ver las jornadas y sus estatus.
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            {/* Lista de jornadas */}
            <IonList>
              {jornadas.map((jornada, index) => (
                <IonItem key={index}>
                  <IonLabel>
                    <h2>{jornada.nombre}</h2>
                    <p>Fecha fin: {jornada.fecha_fin}</p>
                  </IonLabel>
                  {/* Estatus como badge */}
                  <IonBadge
                    color={jornada.status === "Open" ? "success" : "primary"}
                  >
                    {jornada.status}
                  </IonBadge>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
