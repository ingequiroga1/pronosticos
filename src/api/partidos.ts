import { supabase } from "./supBaseClient";


export type Partido = {
  idpartido: number;
  equipo_local: string;
  equipo_visitante: string;
  fecha: string;
  status: "Open" | "Closed";
};


export async function getPartidosxJornada(idjornada:number,idusuario:string): Promise<Partido[]> {

  const { data, error } = await supabase
  .rpc("partidos_sin_pronostico", { uid: idusuario });

  // const { data, error } = await supabase
  // .from("partidos")
  // .select("*, pronosticos!left(idpronostico)")
  // .is("pronosticos.idpronostico", null) // solo los partidos sin pronóstico
  // .eq("jornadas_idjornada", idjornada)
  // .order("fecha", { ascending: true });


  if (error) {
    console.error("Error obteniendo partidos de jornada:", error.message);
    throw error;
  }

  return data || [];
}
