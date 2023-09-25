import React from "react";
import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import "./ClientHome.css";
import Header from "../components/Header";
import { getAllProviders, getClient, updateClient } from "../api";
import { ClientReservation } from "../models/clientReservation";
import { formatTime } from "../utils/formatTime";

interface ConfirmationButtonProps {
  reservation: ClientReservation;
  onConfirmReservation: (reservationId: string) => void;
}

const ConfirmationButton: React.FC<ConfirmationButtonProps> = ({
  reservation,
  onConfirmReservation,
}) => {
  const confirmationIsExpired = (timeOfRequest: Date) => {
    const currentTime = new Date();
    const timeDifference = timeOfRequest.getTime() - currentTime.getTime();
    const minutesDifference = Math.abs(timeDifference / (1000 * 60));
    return minutesDifference > 30;
  };

  if (reservation.confirmed) {
    return <IonButton disabled={true}>Confirmed</IonButton>;
  }

  return (
    <div>
      {confirmationIsExpired(new Date(reservation.timeOfRequest)) &&
      !reservation.confirmed ? (
        <IonButton color="dark" fill="clear" disabled={true}>
          Expired
        </IonButton>
      ) : (
        <IonButton
          onClick={() => {
            onConfirmReservation(reservation.reservationId);
          }}
        >
          Confirm
        </IonButton>
      )}
    </div>
  );
};

const ClientHomePage: React.FC = () => {
  const client = getClient();
  const allProviders = getAllProviders();
  const clientProviders = allProviders.filter((p) =>
    client.providerIds.includes(p.id)
  );

  const getProviderName = (providerId: string) => {
    return allProviders.find((p) => p.id === providerId)!.name!;
  };

  const handleConfirmation = (reservation: ClientReservation) => {
    client.reservations.find(
      (r) => r.reservationId === reservation.reservationId
    )!.confirmed = true;
    updateClient(client);
    window.location.reload();
  };

  return (
    <IonPage>
      <Header title={client.name} />
      <IonContent className="ion-padding">
        <h3 className="ion-padding">My Providers</h3>
        <IonList className="ion-margin-bottom">
          {clientProviders.map((provider, i) => {
            return (
              <IonButton
                routerLink={`/provider/availability/${provider.id}`}
                className="ion-margin-bottom"
                key={i}
                expand="full"
              >
                {provider.name}
              </IonButton>
            );
          })}
        </IonList>
        <h3 className="ion-padding">My Appointments</h3>
        <IonList className="ion-margin-bottom">
          {client.reservations.map((reservation, i) => {
            return (
              <IonItem key={i}>
                <IonLabel>
                  <h3>
                    {reservation.reservationDate} @{" "}
                    {formatTime(reservation.reservationTime)}
                  </h3>
                  <p>with {getProviderName(reservation.providerId)}</p>
                </IonLabel>
                <ConfirmationButton
                  onConfirmReservation={() => {
                    handleConfirmation(reservation);
                  }}
                  reservation={reservation}
                />
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ClientHomePage;
