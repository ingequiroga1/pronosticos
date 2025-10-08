import React from "react";
import {
  IonItem,
  IonLabel,
  IonBadge,
  IonSpinner,
  IonIcon
} from "@ionic/react";
import {
  checkmarkCircle,
  closeCircle,
  timeOutline
} from "ionicons/icons";

interface Partido {
  equipo_local: string;
  equipo_visitante: string;
  pronostico: string;
  resultado: string;
  fecha?: string;
  status?: string;
}

interface PartidoItemProps {
  partido: Partido;
}

const PartidoItem: React.FC<PartidoItemProps> = ({ partido }) => {
  const acerto = partido.pronostico === partido.resultado;
  const pendiente = partido.resultado.trim() === "";

  const fechaFormateada = partido.fecha
    ? new Date(partido.fecha).toLocaleDateString("es-MX", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Fecha no disponible";

  // Color de fondo según el estado
  const backgroundColor = pendiente
    ? "rgba(200,200,200,0.2)" // gris claro
    : acerto
    ? "rgba(0,255,0,0.15)" // verde claro
    : "rgba(255,0,0,0.15)"; // rojo claro

  // Ícono según el estado
  const iconColor = pendiente ? "medium" : acerto ? "success" : "danger";
  const iconName = pendiente ? timeOutline : acerto ? checkmarkCircle : closeCircle;

  return (
    <IonItem
      style={{
        backgroundColor,
        borderRadius: "10px",
        marginBottom: "8px",
      }}
    >
      <IonLabel>
        <h2 style={{ fontWeight: 600 }}>
          {partido.equipo_local} vs {partido.equipo_visitante}
        </h2>

        <p>
          Pronóstico: <IonBadge color="medium">{partido.pronostico}</IonBadge>
        </p>

        <p>
          Resultado:{" "}
          <IonBadge color={pendiente ? "medium" : acerto ? "success" : "danger"}>
            {pendiente ? "Pendiente" : partido.resultado}
          </IonBadge>
        </p>

        <p>{fechaFormateada}</p>
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
        </div>
      ) : (
        <IonIcon
          icon={iconName}
          color={iconColor}
          slot="end"
          style={{ fontSize: "1.8rem" }}
        />
      )}
    </IonItem>
  );
};

export default PartidoItem;
