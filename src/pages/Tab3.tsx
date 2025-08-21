import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab3.css";

type Usuario = {
  nombre: string;
  pronosticos: ("L" | "E" | "V")[];
  aciertos: number;
};

const Tab3: React.FC = () => {
  const usuarios: Usuario[] = [
    { nombre: "Xime", pronosticos: ["L", "V", "E", "L"], aciertos: 3 },
    { nombre: "Victor", pronosticos: ["E", "L", "L", "V"], aciertos: 2 },
    { nombre: "Ana", pronosticos: ["V", "E", "L", "V"], aciertos: 1 },
  ];

  // Ordenamos de mayor a menor aciertos
  const posiciones = [...usuarios].sort((a, b) => b.aciertos - a.aciertos);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Posición</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Posición</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Tabla de Posiciones</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {posiciones.map((usuario, index) => {
                const esUsuarioLogueado = usuario.nombre === "Xime"; // Cambia "Xime" por el nombre del usuario logueado
                return(
                <IonItem 
                key={index}
                color={esUsuarioLogueado ? "primary" : undefined} >
                  <IonLabel>
                    <h2>
                      #{index + 1} - {usuario.nombre}
                    </h2>
                    <p>
                      {" "}
                      {usuario.pronosticos.map((p, i) => (
                        <IonBadge
                          key={i}
                          color="medium"
                          style={{ marginRight: 4 }}
                        >
                          {p}
                        </IonBadge>
                      ))}
                    </p>
                  </IonLabel>

                  {/* Número de aciertos al final */}
                  <IonBadge slot="end" color="success">
                    {usuario.aciertos}
                  </IonBadge>
                </IonItem>
              )})}
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
