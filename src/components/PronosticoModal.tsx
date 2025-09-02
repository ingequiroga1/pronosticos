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
  const { usuario, idJornadaActual, partidosxjornada,guardarPronostico } = useAuth();
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
    guardarPronostico(pronosticoUsuario) 
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
          <IonCardContent>
            <IonList>
              {partidosxjornada &&
                partidosxjornada.map((partido: Partido) => (
                  <IonItem key={partido.idpartido}>
                    <IonLabel>
                      {partido.equipo_local} vs {partido.equipo_visitante}
                    </IonLabel>
                    <IonSelect
                      value={pronosticos[partido.idpartido] || ""}
                      placeholder="Selecciona"
                      onIonChange={(e) =>
                        handlePronosticoChange(
                          partido.idpartido,
                          e.detail.value
                        )
                      }
                    >
                      <IonSelectOption value="L">L</IonSelectOption>
                      <IonSelectOption value="E">E</IonSelectOption>
                      <IonSelectOption value="V">V</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                ))}
            </IonList>
            <IonButton expand="block" onClick={handleEnviar}>
              Enviar Pronóstico
            </IonButton>
            <IonButton expand="block" onClick={handleCerrar}>
              Cancelar
            </IonButton>
          </IonCardContent>
        </IonCard>
        <IonAlert
          isOpen={isOpenAlert}
          header="Confirmación"
          message="Una vez enviados los pronósticos, no podrás modificarlos."
          buttons={[
            {
              text: "Cancelar",
              role: "cancel",
              handler: () => {
                setIsOpenAlert(false);
              },
            },
            {
              text: "Enviar",
              handler: () => {
                handleConfirmarEnvio();
                setIsOpenAlert(false);
                onClose();
              },
            },
          ]}
          onDidDismiss={() => setIsOpenAlert(false)}
        ></IonAlert>
      </IonContent>
    </IonModal>
  );
};

export default PronosticoModal;
