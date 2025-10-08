import React from "react";
import { IonItem, IonLabel, IonBadge, IonIcon } from "@ionic/react";
import { trophyOutline } from "ionicons/icons";

interface Pronostico {
  pronostico: string;
  acierto: boolean;
}

interface Usuario {
  nombre: string;
  aciertos: number;
  pronosticos: Pronostico[];
  vecescampeon: number;
}

interface PosicionItemProps {
  usuario: Usuario;
  index: number;
}

const PosicionComponent: React.FC<PosicionItemProps> = ({ usuario, index }) => {
  const isTop1 = index === 0;
  const maxVisibleCrowns = 1; // 👑 Máximo número de coronas que se mostrarán directamente

  const crownDisplay =
    usuario.vecescampeon > maxVisibleCrowns
      ? (
          <>
            {"👑".repeat(maxVisibleCrowns)}
            <span style={{ fontSize: "0.9rem", marginLeft: "4px" }}>
              ×{usuario.vecescampeon}
            </span>
          </>
        )
      : (
          "👑".repeat(usuario.vecescampeon)
        );

  return (
    <IonItem
      style={{
        borderRadius: "12px",
        marginBottom: "10px",
        backgroundColor: isTop1 ? "rgba(255, 215, 0, 0.15)" : "transparent",
        boxShadow: isTop1 ? "0 0 12px 2px rgba(255, 215, 0, 0.6)" : "none",
      }}
    >
      <IonLabel>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2
              style={{
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
              }}
            >
              #{index + 1} - {usuario.nombre}
              {isTop1 && (
                <IonIcon
                  icon={trophyOutline}
                  color="warning"
                  style={{ marginLeft: "8px", fontSize: "1.4rem" }}
                />
              )}
            </h2>

            {/* 👑 Coronas en el extremo derecho, bien alineadas */}
            {usuario.vecescampeon > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "10px",
                  fontSize: "1.1rem",
                  color: "#FFD700",
                  whiteSpace: "nowrap",
                }}
              >
                {crownDisplay}
              </div>
            )}
          </div>

          <p style={{ marginTop: "6px" }}>
            {usuario.pronosticos.map((p, i) => (
              <IonBadge
                key={i}
                color={p.acierto ? "success" : "medium"}
                style={{ marginRight: 4 }}
              >
                {p.pronostico}
              </IonBadge>
            ))}
          </p>
        </div>
      </IonLabel>

      <IonBadge slot="end" color="success">
        {usuario.aciertos}
      </IonBadge>
    </IonItem>
  );
};

export default PosicionComponent;
