import React, { createContext, useState, ReactNode, useContext } from "react";
import { signOut } from "../api/auth";
import { getJornadas } from "../api/jornadas";
import { getPartidosxJornada } from "../api/partidos";
import { PetPronostico } from "../types/pronosticos";
import { enviarPronostico, getPronosticosJornada, getPronXUsuario } from "../api/pronosticos";

export type Jornada = {
  idjornada: number;
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
  status: "Open" | "Closed";
};

export type Partido = {
  idpartido: number;
  equipo_local: string;
  equipo_visitante: string;
  fecha: string;
  status: "Open" | "Closed";
};

export type Usuario = {
  id: string;
  nombre: string;
  imagen: string;
};

type AuthContextType = {
  usuario: Usuario | null;
  jornadas: Jornada[];
  pronosticos?: pronostico[];
  idJornadaActual?: number;
  partidosxjornada?: Partido[];
  pronosticosConAciertos?: pronosticoUsuario[];
  login: (iduser:string,username: string,imagen:string) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
  fetchJornadas: () => Promise<void>;
  fetchpartidosxjornada: (idJornada: number) => Promise<void>;
  guardarPronostico: (pronostico: PetPronostico) => Promise<void>;
  fetchPronXUsuario: () => Promise<void>;
  fetchPronXJornada: () => Promise<void>;
};

type pronosticoPartido = {
  equipo_local: string;
  equipo_visitante: string;
  pronostico: "L" | "E" | "V";
  resultado: "L" | "E" | "V";
  acertado: boolean;
};

type pronostico = {
  nombre: string;
  partidos: pronosticoPartido[];
};

type pronosticoUsuario = {
  nombre: string;
  pronosticos: string[];
  aciertos: number;
};




const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUser] = useState<Usuario | null>(null);
  const [jornadas, setJornadas] = useState<Jornada[]>([]);
  const [idJornadaActual, setIdJornadaActual] = useState<number | undefined>(
    undefined
  );
  const [partidosxjornada, setPartidosxjornada] = useState<Partido[]>([]);

  const [pronosticos,setPronosticos] = useState<pronostico[]>([]);

  const [pronosticosConAciertos,setPronosticosConAciertos] = useState<pronosticoUsuario[]>([]);

  const login = (iduser: string, username: string, imagen: string) =>
    setUser({
      id: iduser,
      nombre: username,
      imagen,
    });

  const logout = async () => {
    const error = await signOut();
    if (!error) {
      console.log("Sesión cerrada");
      setUser(null);
    }
  };

  const fetchJornadas = async () => {
    try {
      const data = await getJornadas();
      setJornadas(data);
    } catch (error) {
      console.error("No se pudieron cargar las jornadas:", error);
    }
  };

  const fetchpartidosxjornada = async (idJornada: number) => {
    setIdJornadaActual(idJornada);
    const data = await getPartidosxJornada(idJornada);
    setPartidosxjornada(data);
    console.log("Partidos de la jornada:", data);
  };

  const fetchUser = async () => {
    console.log("Fetching user session...");
  };

  const guardarPronostico = async (pronostico: PetPronostico) => {
    const result = await enviarPronostico(pronostico); 
    
    if (result) {
      console.log("Pronóstico guardado:");
    } else {
      console.error("Error al guardar el pronóstico");
    }
  }

  const fetchPronXUsuario = async () => {
    if (usuario?.id !== undefined) {
      const data = await getPronXUsuario(usuario.id);
      setPronosticos([data]);
      console.log("Pronósticos del usuario:", data);
    } else {
      console.error("Usuario o idJornadaActual no definido");
    }
  }

    const fetchPronXJornada = async () => {
      const data = await getPronosticosJornada();
      setPronosticosConAciertos(data);
      console.log("Pronósticos con aciertos:", data);
  }




  return (
    <AuthContext.Provider
      value={{
        usuario,
        jornadas,
        idJornadaActual,
        pronosticos,
        partidosxjornada,
        pronosticosConAciertos,
        login,
        logout,
        fetchUser,
        fetchJornadas,
        fetchpartidosxjornada,
        guardarPronostico,
        fetchPronXUsuario,
        fetchPronXJornada
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para usar el contexto más fácil
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};
