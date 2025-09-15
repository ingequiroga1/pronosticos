import React from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
  IonList,
  IonItem,
  IonLabel,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from "@ionic/react";

interface ModalReglasProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalReglas: React.FC<ModalReglasProps> = ({ isOpen, onClose }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>⚽ Reglas de la Jornada</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        
          <IonCardHeader>
            <IonCardTitle>📋 Información importante</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList lines="none">
              <IonItem>
                <IonLabel className="ion-text-wrap">
                  <h3>1. Cuota de participación</h3>
                  <IonText color="medium">
                    La participación tiene un costo de <strong>$20 MXN</strong>.
                    Una vez pagado, no hay cancelaciones ni reembolsos.
                  </IonText>
                </IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel className="ion-text-wrap">
                  <h3>2. Pronósticos</h3>
                  <IonText color="medium">
                    Debes registrar tus pronósticos antes del inicio del primer
                    partido. Una vez cerrada la jornada, no se podrán modificar.
                  </IonText>
                </IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel className="ion-text-wrap">
                  <h3>3. Bolsa de premios</h3>
                  <IonText color="medium">
                    El 75% de la recaudación se destina al premio y el 25% al
                    mantenimiento de la app. 
                  </IonText>
                </IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel className="ion-text-wrap">
                  <h3>4. Empates</h3>
                  <IonText color="medium">
                    En caso de empate, el premio se divide en partes iguales
                    entre los ganadores.
                  </IonText>
                </IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel className="ion-text-wrap">
                  <h3>5. Entrega del premio</h3>
                  <IonText color="medium">
                    El premio se entregará mediante transferencia o depósito en
                    un máximo de <strong>3 días hábiles</strong>.
                  </IonText>
                </IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel className="ion-text-wrap">
                  <h3>6. Carácter recreativo</h3>
                  <IonText color="medium">
                    Esta dinámica es de entretenimiento y no constituye una
                    apuesta regulada.
                  </IonText>
                </IonLabel>
              </IonItem>
            </IonList>
             <div className="ion-text-center ion-margin-top">
                      <IonButton color="success" onClick={onClose}>
                        Entendido 🚀
                      </IonButton>
                    </div>
          </IonCardContent>
       
      </IonContent>
    </IonModal>
  );
};

export default ModalReglas;
