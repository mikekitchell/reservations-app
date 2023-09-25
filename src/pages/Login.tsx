import React from "react";
import { IonButton, IonContent, IonInput, IonPage } from "@ionic/react";
import { useParams } from "react-router";
import "./Login.css";

const LoginPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <img src="assets/logo.webp" />
        <IonInput
          label="Username"
          labelPlacement="floating"
          fill="outline"
          placeholder="Username"
          className="ion-margin-bottom"
        ></IonInput>
        <IonInput
          label="Password"
          labelPlacement="floating"
          fill="outline"
          placeholder="Password"
          type="password"
          className="ion-margin-bottom"
        ></IonInput>
        <IonButton
          expand="full"
          color={"primary"}
          className="ion-margin-bottom"
          routerLink={"/client"}
        >
          Login (Client)
        </IonButton>
        <IonButton expand="full" routerLink={"/provider"}>
          Login (Provider)
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
