import React from "react";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import "./ProviderHome.css";
import { closeCircleOutline } from "ionicons/icons";
import Header from "../components/Header";
import { getProvider } from "../api";

const ProviderHomePage: React.FC = () => {
  const provider = getProvider("fa115dad-92f6-4db5-99ac-87e04fa6e087")!;

  return (
    <IonPage>
      <Header title={provider.name} />
      <IonContent className="ion-padding">
        <h3 className="ion-padding">My Availability</h3>
        <IonList className="ion-margin-bottom">
          {provider.availability.map((availability, i) => {
            return (
              <IonItem key={i}>
                <IonLabel>{`${availability.date} ${availability.startTime} - ${availability.endTime}`}</IonLabel>
                <IonIcon slot="end" md={closeCircleOutline}></IonIcon>
              </IonItem>
            );
          })}
        </IonList>
        <IonButton
          expand="full"
          routerLink={`/provider/availability/add/${provider.id}`}
        >
          Add Availability
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ProviderHomePage;
