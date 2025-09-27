import React, { useState } from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonList,
  IonAlert,
  IonCardHeader,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonListHeader,
} from "@ionic/react";
import { useAuth } from "../context/AuthContext";
import { Partido } from "../api/partidos";
import { PetPronostico } from "../types/pronosticos";


interface PronosticoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PronosticoModal: React.FC<PronosticoModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { usuario, idJornadaActual, partidosxjornada, guardarPronostico } =
    useAuth();
  const [pronosticos, setPronosticos] = useState<{ [id: number]: string }>({});
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [pronosticoUsuario, setPronosticoUsuario] = useState<PetPronostico>({
    idjornada: 0,
    idusuario: "",
    pronosticos: [],
  });

  const handlePronosticoChange = (id: number, value: string) => {
    setPronosticos((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCerrar = () => {
    console.log("Pronósticos guardados:", pronosticos);
    onClose();
  };

  const handleEnviar = () => {
    const tieneVacios =
      (partidosxjornada?.length ?? 0) !== Object.keys(pronosticos).length;
    if (tieneVacios) {
      alert("Por favor, completa todos los pronósticos antes de enviar.");
      return;
    }

    const arrpronosticos = Object.entries(pronosticos).map(([key, value]) => ({
      idpartido: Number(key),
      pronostico: value,
    }));

    setPronosticoUsuario({
      idjornada: idJornadaActual || 0,
      idusuario: usuario?.id || "",
      pronosticos: arrpronosticos,
    });
    setIsOpenAlert(true);
  };

  const handleConfirmarEnvio = () => {
    guardarPronostico(pronosticoUsuario);
    console.log("Enviando pronósticos:", pronosticoUsuario);
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Captura de Pronósticos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Pronostico</IonCardTitle>
          </IonCardHeader>
          {partidosxjornada && partidosxjornada.length > 0 ? (
            <IonCardContent>
              <IonList>
                {/* Encabezado */}
                <IonListHeader>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      fontWeight: "bold",
                    }}
                  >
                    <IonLabel style={{ flex: 1, textAlign: "left" }}>
                      Local
                    </IonLabel>

                   

                    <IonLabel style={{ flex: 1, textAlign: "right" }}>
                      Visitante
                    </IonLabel>
                  </div>
                </IonListHeader>

                {/* Lista de partidos */}
                {partidosxjornada &&
                  partidosxjornada.map((partido: Partido) => (
                    <IonItem key={partido.idpartido}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        {/* Equipo Local */}
                        <IonLabel style={{ flex: 1, textAlign: "left" }}>
                          {partido.equipo_local}
                        </IonLabel>

                        {/* Select centrado */}
                        <IonSelect
                        interface="popover"
                          value={pronosticos[partido.idpartido] || ""}
                          placeholder="Selecciona"
                          onIonChange={(e) =>
                            handlePronosticoChange(
                              partido.idpartido,
                              e.detail.value
                            )
                          }
                          style={{ flex: 1, textAlign: "center" }}
                        >
                          <IonSelectOption value="L">Local</IonSelectOption>
                          <IonSelectOption value="E">Empate</IonSelectOption>
                          <IonSelectOption value="V">Visitante</IonSelectOption>
                        </IonSelect>

                        {/* Equipo Visitante */}
                        <IonLabel style={{ flex: 1, textAlign: "right" }}>
                          {partido.equipo_visitante}
                        </IonLabel>
                      </div>
                    </IonItem>
                  ))}
              </IonList>

              <div  style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}>
                <IonButton color="success" shape="round" style={{ flex: 1}} onClick={handleEnviar}>Enviar</IonButton>
                <IonButton color="danger" shape="round"  style={{ flex: 1}} onClick={handleCerrar}>Cancelar</IonButton>
              </div>
            </IonCardContent>
          ) : (
            <IonCardContent>
              <p>✅ Ya registraste tu pronóstico de esta jornada.</p>
              <IonButton expand="block" onClick={handleCerrar}>
                Salir
              </IonButton>
            </IonCardContent>
          )}
        </IonCard>
        <IonAlert
          isOpen={isOpenAlert}
          header="⚽ Confirmación de pronóstico"
          message={`
    📌 Una vez enviados los pronósticos, no podrás modificarlos.
    💰 Recuerda que tu pronóstico debe estar pagado o no aparecera tu nombre en la lista.
    ✅ Solo los pronósticos pagados serán válidos.
  `}
          buttons={[
            {
              text: "❌ Cancelar",
              role: "cancel",
              cssClass: "alert-button-cancel",
              handler: () => {
                setIsOpenAlert(false);
              },
            },
            {
              text: "🚀 Enviar",
              cssClass: "alert-button-confirm",
              handler: () => {
                handleConfirmarEnvio();
                setIsOpenAlert(false);
                onClose();
              },
            },
          ]}
          onDidDismiss={() => setIsOpenAlert(false)}
        />
      </IonContent>
    </IonModal>
  );
};

export default PronosticoModal;
