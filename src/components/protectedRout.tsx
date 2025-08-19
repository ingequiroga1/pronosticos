// components/ProtectedRoute.tsx
// import { navigate } from 'react-router-dom';


// interface ProtectedRouteProps {
//   children: JSX.Element;
// }

// export function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const { user, loading } = useAuth();
  

//   if (loading) {
//     return <div>Loading...</div>; // spinner mientras carga
//   }

//   if (!user) {
//     return <Navigate to="/" replace />; // redirige al login
//   }

//   cartStore.setUser(user); 
//   return children; // renderiza la ruta protegida
// }
