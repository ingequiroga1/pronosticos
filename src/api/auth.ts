import { supabase } from "./supBaseClient";

export const signInWithGoogle = async () => {
  const apiurl = import.meta.env.VITE_API_HOME;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: apiurl,
    },
  });

  if (error) {
    return { error };
  } else {
    console.log("Inicia sesión con Google", data);
  }
};

export const addReferido = async (
  referido_por: string | null,
  idusuario: string
) => {
  const { error } = await supabase
    .from("usuarios")
    .update({ referido_por })
    .eq("auth_user_id", idusuario)
    .or("referido_por.is.null,referido_por.eq."); //Solo hace update si es nuevo

  if (error) {
    console.error("Error al agregar referido:", error.message);
  }
};

export const checkSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  //TODO Agregar datos de la tabla usuario
  // if (session) {
  //     const user = await obtenerUsuario(session.user.id);
  //     return user?.[0] || null;
  // }
  //console.log("session", session);

  return session ? session.user : null;
};

//Cierre de sesion del usuario
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log("Error al cerrar sesión:", error.message);
  }
  return error;
};
