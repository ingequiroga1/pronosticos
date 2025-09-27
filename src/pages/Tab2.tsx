import {
  IonAlert,
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
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab2.css";
import { useAuth } from "../context/AuthContext";
import { logOutOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import ModalPago from "../components/pagoModal";
import { useHistory } from "react-router";

const Tab2: React.FC = () => {
  const { pronosticos, logout, fetchPronXUsuario } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [id, setId] = useState(0);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        await fetchPronXUsuario();
        
      } catch (err) {
        console.error("No se pudieron cargar los pronosticos:", err);
      }
    }
    fetchData();
  }, []);

  const loadItems = async () => {
    try {
      await fetchPronXUsuario();
    } catch (err) {
      console.error("No se pudieron recargar los resultados:", err);
    }
  };

  const handleRefresh = async (event: CustomEvent) => {
    await loadItems();
    (event.target as HTMLIonRefresherElement).complete(); // 👈 indica que terminó
  };

  const mostrarInstruccionesPago = (idpronostico: number) => {
    if (pronosticos && new Date(pronosticos[0]?.fecha_inicio || "") < new Date()){
      setIsOpenAlert(true);
      return;
    }
    setId(idpronostico);
    setShowModal(true);
  };

  const handleLogout = async () => {
    logout();
    history.replace("/login"); // 👈 aquí rediriges
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pronostico</IonTitle>
          {/* Botón de logout en la esquina derecha */}
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent
            pullingText="Desliza para actualizar"
            refreshingSpinner="circles"
          />
        </IonRefresher>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Pronostico</IonTitle>
          </IonToolbar>
        </IonHeader>
        {pronosticos &&
          pronosticos.map((jornada, i) => (
            <IonCard key={i}>
              <IonCardHeader>
                <IonCardTitle>{jornada.nombre}</IonCardTitle>

              </IonCardHeader>
              <IonCardContent>
                {!jornada.espagado && (
                  <div style={{ marginBottom: "16px" }}>
                    <p>
                      Tu referencia de pago es:{" "}
                      <strong>{jornada.idpronostico}</strong>
                    </p>
                    <IonButton
                      expand="block"
                      color="primary"
                      shape="round"
                      className="ion-margin-top"
                      onClick={() =>
                        mostrarInstruccionesPago(jornada.idpronostico)
                      }
                    >
                      Realizar pago
                    </IonButton>
                  </div>
                )}
                <IonList>
                  {jornada.partidos.map((partido, j) => {
                    const acerto = partido.pronostico === partido.resultado;
                    const pendiente = partido.resultado.trim() === "";
                    return (
                      <IonItem key={j} color={acerto ? "success" : undefined}>
                        <IonLabel>
                          <h2 style={{ fontWeight: "600" }}>
                            {partido.equipo_local} vs {partido.equipo_visitante}
                          </h2>

                          <p>
                            Pronóstico:{" "}
                            <IonBadge color="medium">
                              {partido.pronostico}
                            </IonBadge>
                          </p>

                          <p>
                            Resultado:{" "}
                            <IonBadge color="large">
                              {pendiente ? "Pendiente" : partido.resultado}
                            </IonBadge>
                          </p>

                          <p>
                            {new Date(partido.fecha ?? "").toLocaleDateString(
                              "es-MX",
                              {
                                weekday: "long", // día de la semana
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </IonLabel>

                        {/* Estado del partido */}
                        {partido.status === "Started" ? (
                          <div
                            slot="end"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <IonSpinner name="dots" />
                            <IonLabel>En juego</IonLabel>
                            <IonBadge color={acerto ? "success" : "danger"}>
                              {acerto ? "✅" : "❌"}
                            </IonBadge>
                          </div>
                        ) : (
                          !pendiente && (
                            <IonBadge
                              slot="end"
                              color={acerto ? "success" : "danger"}
                            >
                              {acerto ? "✅" : "❌"}
                            </IonBadge>
                          )
                        )}
                      </IonItem>
                    );
                  })}
                </IonList>
              </IonCardContent>
            </IonCard>
          ))}
        <ModalPago
          isOpen={showModal}
          idpronostico={id}
          onClose={() => setShowModal(false)}
        />
        <IonAlert
                          isOpen={isOpenAlert}
                          header="⚽ La jornada ya inició"
                          message={`
                          Lo sentimos, la jornada seleccionada ya ha iniciado y no puedes realizar el pago.
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

export default Tab2;
