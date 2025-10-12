import {
  IonAlert,
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
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab1.css";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import PronosticoModal from "../components/PronosticoModal";
import ModalReglas from "../components/modalReglas";
import { addCircleOutline, logOutOutline } from "ionicons/icons";
import { useHistory } from "react-router";

const Tab1: React.FC = () => {
  const { usuario, jornadas, logout, fetchJornadas, fetchpartidosxjornada } =
    useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reglasOpen, setReglasOpen] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const history = useHistory();

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

  const onClicJornada = async (idJornada: number, fechaIni: string) => {
    const fechaActual = new Date();
    const fechaInicioJornada = new Date(fechaIni);
    if (fechaActual > fechaInicioJornada) {
      setIsOpenAlert(true);
      return;
    }

    try {
      await fetchpartidosxjornada(idJornada);
      setIsModalOpen(true);
    } catch (error) {
      console.error("No se pudieron cargar las jornadas:", error);
    }
  };

  const mostrarReglas = () => {
    setReglasOpen(true);
  };

  const handleLogout = async () => {
    logout();
    history.replace("/login"); 
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle color="cancha">Home</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard className="ion-padding custom-card">
          <IonCardHeader>
            <IonCardTitle>Bienvenido {usuario?.nombre}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText color="dark">
              <h2 style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                ⚽️ ¡Hora de participar! 🎉
              </h2>
              <p style={{ marginTop: "8px", fontSize: "0.95rem" }}>
                Selecciona la <strong>jornada</strong> que prefieras y envía tu
                pronóstico 📝. ¡Cada jugada puede acercarte a la victoria 🏆!
              </p>
            </IonText>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            {/* Lista de jornadas */}
            <IonList>
              {jornadas.map((jornada, index) => (
                <IonItem
                  key={index}
                  button={jornada.status === "Open"}
                  onClick={() =>
                    onClicJornada(jornada.idjornada, jornada.fecha_inicio)
                  }
                >
                  <IonLabel>
                    <h2>{jornada.nombre}</h2>
                    <p>Fecha inicio: {jornada.fecha_inicio}</p>
                  </IonLabel>
                  {/* Estatus como badge */}
                  {jornada.status === "Open" ? (
                    <IonIcon
                      icon={addCircleOutline}
                      color="success"
                      style={{ fontSize: "24px" }}
                    />
                  ) : (
                    <div style={{ color: "var(--ion-color-medium)" }}>
                      {jornada.status}
                    </div>
                  )}
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            <IonButton
              expand="block"
              shape="round"
              className="ion-margin-top custom-boton"
              onClick={mostrarReglas}
            >
              Reglas de la jornada
            </IonButton>
          </IonCardContent>
        </IonCard>
        <PronosticoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <ModalReglas isOpen={reglasOpen} onClose={() => setReglasOpen(false)} />
        <IonAlert
          isOpen={isOpenAlert}
          header="⚽ La jornada ya inició"
          message={`
                  Lo sentimos, la jornada seleccionada ya ha iniciado y no puedes enviar pronósticos.
          `}
          buttons={[
            {
              text: "Aceptar",
              cssClass: "alert-button-confirm",
              handler: () => {
                setIsOpenAlert(false);
              },
            },
          ]}
          onDidDismiss={() => setIsOpenAlert(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
