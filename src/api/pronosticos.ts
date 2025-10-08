import { PetPronostico } from "../types/pronosticos";
import { supabase } from "./supBaseClient";

type Partido = {
  equipo_local: string;
  equipo_visitante: string;
  pronostico: "L" | "E" | "V";
  resultado: "L" | "E" | "V";
  acertado: boolean;
  fecha?: string;
  status?: "Open" | "Closed" | "Started";
};

type PronosticoDet = {
  auth_user_id: string;
  espagado: boolean;
  idpronostico: number;
  partidos: Partido[];
}

type pronUsuarioActual = {
  nombre: string;
  fecha_inicio?: string;
  pronosticos_det: PronosticoDet[];
  espagado: boolean;
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

export async function getPronXUsuario(idusuario: string): Promise<pronUsuarioActual> {
  const { data, error } = await supabase
    .from("jornadas")
    .select(
      `
      nombre,
      status,
      fecha_inicio,
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
  

  //Calcular campo "acertado"
  // const result = data.flatMap((jor) =>
  //   jor.pronosticos.flatMap((pro) =>
  //     pro.pronosticos_det.map((prd) => ({
  //       equipo_local: prd.partidos?.equipo_local,
  //       equipo_visitante: prd.partidos?.equipo_visitante,
  //       pronostico: prd.pronostico,
  //       resultado: prd.partidos?.resultado,
  //       acertado: prd.partidos?.resultado === prd.pronostico,
  //       fecha: prd.partidos?.fecha,
  //       status: prd.partidos?.status,
  //     }))
  //   )
  // );

  
const result = data.flatMap((jor) =>
  jor.pronosticos.map((pro) => ({
    idpronostico: pro.idpronostico,
    auth_user_id: pro.auth_user_id,
    espagado: pro.espagado,
    partidos: pro.pronosticos_det.map((prd) => ({
         equipo_local: prd.partidos?.equipo_local,
         equipo_visitante: prd.partidos?.equipo_visitante,
         pronostico: prd.pronostico,
         resultado: prd.partidos?.resultado,
         acertado: prd.partidos?.resultado === prd.pronostico,
         fecha: prd.partidos?.fecha,
         status: prd.partidos?.status,
       }))
  }))
)
 

   // Calcular campo "acertado"

  

// const result = data[0].pronosticos.map((pro) => ({
//   idpronostico: pro.idpronostico,
//   auth_user_id: pro.auth_user_id,
//   espagado: pro.espagado,
//   partidos: pro.pronosticos_det.map((prd) => ({
//     equipo_local: prd.partidos?.equipo_local,
//     equipo_visitante: prd.partidos?.equipo_visitante,
//     pronostico: prd.pronostico,
//     resultado: prd.partidos?.resultado,
//     acertado: prd.partidos?.resultado === prd.pronostico,
//     fecha: prd.partidos?.fecha,
//     status: prd.partidos?.status,
//   })),
// }));
  

  const pronostico: pronUsuarioActual = {
    nombre: data[0]?.nombre || "",
    fecha_inicio: data[0]?.fecha_inicio || "",
    espagado: result[0]?.espagado || false,
    pronosticos_det: result,
  };

  console.log("pronostico",pronostico);
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


