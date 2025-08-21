import React, { createContext, useState, ReactNode, useContext } from "react";
import { signOut } from "../api/auth";
import { getJornadas } from "../api/jornadas";

export type Jornada = {
  id: number;
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
  status: "Open" | "Closed";
};

type AuthContextType = {
  usuario: string | null;
  jornadas: Jornada[];
  pronosticos?: pronostico[];
  login: (username: string) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
  fetchJornadas: () => Promise<void>;
};

type Partido = {
  local: string;
  visitante: string;
  pronostico: "L" | "E" | "V";
  resultadoReal: "L" | "E" | "V";
  acertado: boolean;
};

type pronostico = {
  nombre: string;
  partidos: Partido[];
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUser] = useState<string | null>(null);
  const [jornadas,setJornadas] = useState<Jornada[]>([]);

  const [pronosticos] = useState<pronostico[]>([
    {
      nombre: "Jornada 1",
      partidos: [
        {
          local: "Puebla",
          visitante: "San Luis",
          pronostico: "L",
          resultadoReal: "L",
          acertado: true,
        },
        {
          local: "Necaxa",
          visitante: "León",
          pronostico: "E",
          resultadoReal: "V",
          acertado: false,
        },
        {
          local: "Guadalajara",
          visitante: "Juarez",
          pronostico: "E",
          resultadoReal: "V",
          acertado: false,
        },
        {
          local: "Cruz Azul",
          visitante: "Santos",
          pronostico: "V",
          resultadoReal: "V",
          acertado: true,
        },
        {
          local: "Tigres",
          visitante: "America",
          pronostico: "E",
          resultadoReal: "V",
          acertado: false,
        },
        {
          local: "Pachuca",
          visitante: "Tijuana",
          pronostico: "E",
          resultadoReal: "E",
          acertado: true,
        }
      ],
    }
  ]);

  const login = (username: string) => setUser(username);

  const logout = async () => {
    const error = await signOut();
    if (!error) {
      console.log("Sesión cerrada");
      setUser(null);
    }
  };

  const fetchJornadas = async () => {
    try 
    {
      const data = await getJornadas();
      setJornadas(data);
    } 
    catch (error) 
    {
       console.error("No se pudieron cargar las jornadas:", error);
    }
  }

  const fetchUser = async () => {
    console.log("Fetching user session...");
  };

  return (
    <AuthContext.Provider
      value={{ usuario, jornadas,pronosticos, login, logout, fetchUser,fetchJornadas }}
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
