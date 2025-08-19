import { Redirect } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';

interface AuthGuardProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <IonRouterOutlet>{children}</IonRouterOutlet>;
};

export default AuthGuard;