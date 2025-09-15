import { IonTabBar, IonTabButton, IonTabs, IonRouterOutlet, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { analyticsOutline, football, reader} from 'ionicons/icons';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';

const Tabs: React.FC = () => {
    return (
        <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tabs/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tabs/tab2">
            <Tab2 />
          </Route>
          <Route path="/tabs/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/tabs">
            <Redirect to="/tabs/tab1" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tabs/tab1">
            <IonIcon aria-hidden="true" icon={football} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tabs/tab2">
            <IonIcon aria-hidden="true" icon={reader} />
            <IonLabel>Pronostico</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tabs/tab3">
            <IonIcon aria-hidden="true" icon={analyticsOutline} />
            <IonLabel>Posiciónes</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    )
}

export default Tabs;