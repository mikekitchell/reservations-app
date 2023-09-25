import React from "react";
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import LoginPage from "./pages/Login";
import ProviderHomePage from "./pages/ProviderHome";
import AddAvailabilityPage from "./pages/AddAvailability";
import ClientHomePage from "./pages/ClientHome";
import { initializeData } from "./utils/initializeData";
import ScheduleReservationPage from "./pages/ScheduleReservation";

setupIonicReact({
  mode: `md`,
});

const App: React.FC = () => {
  initializeData();
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/login" />
            </Route>
            <Route path="/login" exact={true}>
              <LoginPage />
            </Route>
            <Route path="/provider" exact={true}>
              <ProviderHomePage />
            </Route>
            <Route path="/provider/availability/add/:providerId" exact={true}>
              <AddAvailabilityPage />
            </Route>
            <Route path="/provider/availability/:providerId" exact={true}>
              <ScheduleReservationPage />
            </Route>
            <Route path="/client" exact={true}>
              <ClientHomePage />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
