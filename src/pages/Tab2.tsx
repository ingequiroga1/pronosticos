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
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab2.css";
import { useAuth } from "../context/AuthContext";
import { logOutOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import ModalPago from "../components/pagoModal";
import { useHistory } from "react-router";
import PartidoComponent from "../components/partidoComponent";

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
    (event.target as HTMLIonRefresherElement).complete();
  };

  const mostrarInstruccionesPago = (idpronostico: number, fecha_inicio: string) => {
    const fechaInicio = new Date(fecha_inicio);
    const fechaActual = new Date();

    if (fechaInicio > fechaActual) {
      setId(idpronostico);
      setShowModal(true);
      return;
    }
    setIsOpenAlert(true);
  };

  const handleLogout = async () => {
    logout();
    history.replace("/login");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pronósticos</IonTitle>
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
            <IonTitle size="large">Pronósticos</IonTitle>
          </IonToolbar>
        </IonHeader>

        {pronosticos?.map((jornada) =>
          
          jornada.pronosticos_det.map((pronostico) => (
            <IonCard key={pronostico.idpronostico}>
              <IonCardHeader>
                <IonCardTitle>{jornada.nombre}</IonCardTitle>
                {!pronostico.espagado && (
                  <IonBadge color="danger" style={{ marginTop: "4px" }}>
                    No pagado
                  </IonBadge>
                )}
                <h2>pronostico: {pronostico.idpronostico} </h2>
              </IonCardHeader>

              <IonCardContent>
                {!pronostico.espagado && (
                  <IonButton
                    expand="block"
                    color="primary"
                    shape="round"
                    onClick={() =>
                      mostrarInstruccionesPago(
                        pronostico.idpronostico,
                        jornada.fecha_inicio ?? ""
                      )
                    }
                    className="ion-margin-bottom"
                  >
                    Realizar pago
                  </IonButton>
                )}

                <IonList>
                  {pronostico.partidos.map((partido, j) => (
                    <PartidoComponent key={j} partido={partido} />
                  )
                  //{
                    // const acerto = partido.pronostico === partido.resultado;
                    // const pendiente = partido.resultado.trim() === "";
                    // return (
                    //   <IonItem key={j} color={acerto ? "success" : undefined}>
                    //     <IonLabel>
                    //       <h2 style={{ fontWeight: "600" }}>
                    //         {partido.equipo_local} vs {partido.equipo_visitante}
                    //       </h2>
                    //       <p>
                    //         Pronóstico: <IonBadge color="medium">{partido.pronostico}</IonBadge>
                    //       </p>
                    //       <p>
                    //         Resultado:{" "}
                    //         <IonBadge color={pendiente ? "medium" : acerto ? "success" : "danger"}>
                    //           {pendiente ? "Pendiente" : partido.resultado}
                    //         </IonBadge>
                    //       </p>
                    //       <p>
                    //         {partido.fecha
                    //           ? new Date(partido.fecha).toLocaleDateString("es-MX", {
                    //               weekday: "long",
                    //               year: "numeric",
                    //               month: "long",
                    //               day: "numeric",
                    //               hour: "2-digit",
                    //               minute: "2-digit",
                    //             })
                    //           : "Fecha no disponible"}
                    //       </p>
                    //     </IonLabel>
                    //     {/* Estado del partido */}
                    //     {partido.status === "Started" ? (
                    //       <div
                    //         slot="end"
                    //         style={{
                    //           display: "flex",
                    //           alignItems: "center",
                    //           gap: "6px",
                    //         }}
                    //       >
                    //         <IonSpinner name="dots" />
                    //         <IonLabel>En juego</IonLabel>
                    //         <IonBadge color={acerto ? "success" : "danger"}>
                    //           {acerto ? "✅" : "❌"}
                    //         </IonBadge>
                    //       </div>
                    //     ) : (
                    //       !pendiente && (
                    //         <IonBadge
                    //           slot="end"
                    //           color={acerto ? "success" : "danger"}
                    //         >
                    //           {acerto ? "✅" : "❌"}
                    //         </IonBadge>
                    //       )
                    //     )}
                    //   </IonItem>
                    // );
                  //}
                  )}
                </IonList>
              </IonCardContent>
            </IonCard>
          ))
        )}

        <ModalPago
          isOpen={showModal}
          idpronostico={id}
          onClose={() => setShowModal(false)}
        />

        <IonAlert
          isOpen={isOpenAlert}
          header="⚽ Pago no disponible"
          message={`Lo sentimos, finalizo el periodo de pago.`}
          buttons={[
            {
              text: "Aceptar",
              cssClass: "alert-button-confirm",
              handler: () => setIsOpenAlert(false),
            },
          ]}
          onDidDismiss={() => setIsOpenAlert(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
