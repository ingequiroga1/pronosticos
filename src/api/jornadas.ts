import { supabase } from "./supBaseClient";


export type Jornada = {
  id: number;
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
  status: "Open" | "Closed";
};


export async function getJornadas(): Promise<Jornada[]> {
  const { data, error } = await supabase
    .from("jornadas")   // 👈 nombre de la tabla en tu BD
    .select("*")
    .order("fecha_inicio", { ascending: true });

  if (error) {
    console.error("Error obteniendo jornadas:", error.message);
    throw error;
  }

  return data || [];
}

