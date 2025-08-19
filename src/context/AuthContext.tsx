// import { createContext, useEffect, useState } from "react";
// import { checkSession } from "../api/auth";

// interface AuthContextType{
//     user: unknown;
//     loading: boolean;
// }

// const AuthContext = createContext<AuthContextType>({
//     user: null,
//     loading: false
// });

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [user, setUser] = useState<unknown>(null);
//     const [loading, setLoading] = useState<boolean>(false);

//     useEffect(() => {
//         const getInitialSession = async () => {
//             const resultado = await checkSession();
//             console.log(resultado);
            
//         }
//     }
// }