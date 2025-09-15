import { PetPronostico } from "../types/pronosticos";
import { supabase } from "./supBaseClient";

type pronosticoPartido = {
  equipo_local: string;
  equipo_visitante: string;
  pronostico: "L" | "E" | "V";
  resultado: "L" | "E" | "V";
  acertado: boolean;
};

type pronostico = {
  nombre: string;
  idpronostico: number;
  espagado: boolean;
  partidos: pronosticoPartido[];
};

type pronosticoUsuario = {
  nombre: string;
  pronosticos: {pronostico: string, acierto: boolean}[];
  aciertos: number;
};


export async function enviarPronostico(
  peticion: PetPronostico
): Promise<boolean> {
  const response = await supabase.rpc("insertar_pronostico", {
    p_idusuario: peticion.idusuario,
    p_idjornada: peticion.idjornada,
    p_partidos: peticion.pronosticos,
  });

  if (response.error) {
    console.error(
      "Error obteniendo partidos de jornada:",
      response.error.message
    );
    throw response.error;
  }
  return response.error == null ? true : false;
}

export async function getPronXUsuario(idusuario: string): Promise<pronostico> {
  const { data, error } = await supabase
    .from("jornadas")
    .select(
      `
      nombre,
      status,
      pronosticos!inner (
        idpronostico,
        auth_user_id,
        espagado,
        pronosticos_det (
          pronostico,
          partidos (
            idpartido,
            equipo_local,
            equipo_visitante,
            resultado,
            fecha,
            status
          )
        )
      )
    `
    )
    .eq("status", "Open")
    .eq("pronosticos.auth_user_id", idusuario);

  if (error) {
    console.error("Error obteniendo jornadas:", error.message);
    throw error;
  }
  //console.log("data",data);

  // Calcular campo "acertado"
  const result = data.flatMap((jor) =>
    jor.pronosticos.flatMap((pro) =>
      pro.pronosticos_det.map((prd) => ({
        equipo_local: prd.partidos?.equipo_local,
        equipo_visitante: prd.partidos?.equipo_visitante,
        pronostico: prd.pronostico,
        resultado: prd.partidos?.resultado,
        acertado: prd.partidos?.resultado === prd.pronostico,
        fecha: prd.partidos?.fecha,
        status: prd.partidos?.status,
      }))
    )
  );

  //console.log("data",data);
  

  const pronostico: pronostico = {
    nombre: data[0]?.nombre || "",
      idpronostico: data[0]?.pronosticos[0]?.idpronostico || 0,
      espagado: data[0]?.pronosticos[0]?.espagado || false,
    partidos: result,
  };
  return pronostico;
}

export async function getPronosticosJornada(): Promise<pronosticoUsuario[]> {
   
const { data, error } = await supabase
  .rpc('obtener_pronosticos_con_aciertos');

  if (error) {
    console.error("Error obteniendo pronosticos:", error.message);
    throw error;
  }
  console.log("data",data);
  return data;
}


