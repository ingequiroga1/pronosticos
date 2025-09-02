import { supabase } from "./supBaseClient";


export type Partido = {
  idpartido: number;
  equipo_local: string;
  equipo_visitante: string;
  fecha: string;
  status: "Open" | "Closed";
};


export async function getPartidosxJornada(idjornada:number): Promise<Partido[]> {
  const { data, error } = await supabase
    .from("partidos")   // 👈 nombre de la tabla en tu BD
    .select("*")
    .eq("jornadas_idjornada", idjornada) 
    .order("fecha", { ascending: true });

  if (error) {
    console.error("Error obteniendo partidos de jornada:", error.message);
    throw error;
  }

  return data || [];
}
