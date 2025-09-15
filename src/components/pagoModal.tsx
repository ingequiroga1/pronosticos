import React from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonText,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";

interface ModalPagoProps {
  isOpen: boolean;
  idpronostico?: number;
  onClose: () => void;
}

const ModalPago: React.FC<ModalPagoProps> = ({ isOpen, idpronostico, onClose }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Instrucciones de pago</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonText>
          <h2 className="ion-text-center">Opciones disponibles</h2>
          <p className="ion-text-center">
            Elige el método que prefieras para completar tu pago ✅
          </p>
        </IonText>

        <IonList>
          {/* Transferencia bancaria */}
          <IonItem lines="full">
            <IonLabel className="ion-text-wrap">
              <h3>🏦 Transferencia bancaria</h3>
              <p>
                <strong>Banco:</strong> Santander
                <br />
                {/* <strong>Cuenta:</strong> 1234567890
                <IonButton
                  size="small"
                  fill="outline"
                  color="primary"
                  onClick={() => navigator.clipboard.writeText("1234567890")}
                >
                  Copiar
                </IonButton> */}
                <br />
                <strong>TARJETA:</strong> 5579 1002 5062 2352
                <IonButton
                  size="small"
                  fill="outline"
                  color="primary"
                  onClick={() =>
                    navigator.clipboard.writeText("5579100250622352")
                  }
                >
                  Copiar
                </IonButton>
                <br />
                <strong>Concepto:</strong> Pronóstico {idpronostico}
                <IonButton
                  size="small"
                  fill="outline"
                  color="primary"
                  onClick={() =>{
                    const referencia = `Pronóstico ${idpronostico}`;
                    navigator.clipboard.writeText(referencia)
                  }}
                >
                  Copiar
                </IonButton>
              </p>

              <p className="ion-margin-top">
                <strong>📲 Envía tu comprobante al número:</strong>
                <br />
                <IonButton
                  color="primary"
                  size="default"
                  shape="round"
                  onClick={() =>
                    window.open("https://wa.me/524771731602", "_blank")
                  }
                >
                  Enviar por WhatsApp
                </IonButton>
                <br />
                Tiempo de respuesta: <strong>~5 min</strong>.
              </p>
            </IonLabel>
          </IonItem>

          {/* Centro de pago
          <IonItem>
            <IonLabel className="ion-text-wrap">
              <h3>📍 Centro de pago</h3>
              <p>
                Dirección: Av. Siempre Viva 742, Ciudad
                <br />
                Horario: Lunes a Viernes 9:00 a 18:00 hrs
                <br />
                Solo debes indicar tu referencia de pago.
              </p>
            </IonLabel>
          </IonItem> */}
        </IonList>

        <div className="ion-text-center ion-margin-top">
          <IonButton color="primary" onClick={onClose}>
            Entendido 🚀
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default ModalPago;
