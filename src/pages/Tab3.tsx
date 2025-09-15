import {
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
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab3.css";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { logOutOutline } from "ionicons/icons";
import { useHistory } from "react-router";


const Tab3: React.FC = () => {
    const { pronosticosConAciertos,logout,fetchPronXJornada } = useAuth();
    const history = useHistory();


   useEffect(() => {
        async function fetchData() {
          try {
            fetchPronXJornada();
          } catch (err) {
            console.error("No se pudieron cargar las jornadas:", err);
          }
        }
        fetchData();
      }, []);

  // Ordenamos de mayor a menor aciertos
  const posiciones = [...(pronosticosConAciertos ?? [])].sort((a, b) => b.aciertos - a.aciertos);

  const loadItems = async () => {
    try {
      await fetchPronXJornada();
    } catch (err) {
      console.error("No se pudieron recargar los resultados:", err);
    }
    
  };


  const handleRefresh = async (event: CustomEvent) => {
    await loadItems();
    (event.target as HTMLIonRefresherElement).complete(); // 👈 indica que terminó
  };

   const handleLogout = async () => {
    logout();
    history.replace("/login"); // 👈 aquí rediriges
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Posición</IonTitle>
          <IonButtons slot="end">
                      <IonButton onClick={handleLogout}>
                        <IonIcon icon={logOutOutline} />
                      </IonButton>
                    </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Posición</IonTitle>
          </IonToolbar>
        </IonHeader>
         <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent
            pullingText="Desliza para actualizar"
            refreshingSpinner="circles"
          />
        </IonRefresher>
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
                          color={p.acierto ? "success" : "medium"}
                          style={{ marginRight: 4 }}
                        >
                          {p.pronostico} 
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
