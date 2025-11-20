import React, { useState } from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonText,
  IonItem,
  IonLabel,
  IonInput,
  IonToast,
} from "@ionic/react";
import { closeOutline, copyOutline, shareSocialOutline } from "ionicons/icons";

interface InviteFriendsModalProps {
  isOpen: boolean;
  onClose: () => void;
  nombre: string;
}

const InviteFriendsModal: React.FC<InviteFriendsModalProps> = ({
  isOpen,
  onClose,
  nombre,
}) => {
  const inviteLink = `https://pronostify.com/login?ref=${nombre}`;
  //const inviteLink = `http://localhost:8100/login?ref=${nombre}`;
  const [showToast, setShowToast] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setShowToast(true);
    } catch (err) {
      console.error("Error copying link:", err);
    }
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Pronóstify",
          text: "Únete a Pronóstify y compite conmigo ⚽🔥",
          url: inviteLink,
        });
      } catch (err) {
        console.error("Error sharing link:", err);
      }
    } else {
      copyLink();
    }
  };

  return (
    <>
      <IonModal
        isOpen={isOpen}
        onDidDismiss={onClose}
        initialBreakpoint={0.5}
        breakpoints={[0, 0.5, 0.8]}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Invita a tus amigos</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={onClose}>
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonText color="primary">
            <p>
              💪Comparte tu enlace y
              reta a tus amigos a pronosticar contigo. ⚽ ¡Cada jornada se vive
              mejor con tu banda en Pronóstify!
            </p>
          </IonText>

          <IonItem>
            <IonLabel position="stacked">Tu enlace de invitación</IonLabel>
            <IonInput readonly value={inviteLink}></IonInput>
          </IonItem>

          <div className="ion-text-center" style={{ marginTop: "1.5rem" }}>
            <IonButton expand="block" color="primary" onClick={copyLink}>
              <IonIcon icon={copyOutline} slot="start" />
              Copiar enlace
            </IonButton>

            <IonButton expand="block" color="danger" onClick={shareLink}>
              <IonIcon icon={shareSocialOutline} slot="start" />
              Compartir
            </IonButton>
          </div>
        </IonContent>
      </IonModal>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="¡Enlace copiado al portapapeles!"
        duration={1500}
        color="warning"
      />
    </>
  );
};

export default InviteFriendsModal;
