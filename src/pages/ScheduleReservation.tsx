import React, { useState } from "react";
import {
  IonAlert,
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
} from "@ionic/react";
import "./ScheduleReservation.css";
import Header from "../components/Header";
import { useParams } from "react-router";
import { getClient, getProvider, updateClient } from "../api";
import TimePicker from "../components/TimePicker";
import { isTimeBetween } from "../utils/isTimeBetween";
import { v4 as uuidv4 } from "uuid";
import { ProviderAvailability } from "../models/providerAvailability";

const ScheduleReservationPage: React.FC = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const client = getClient();
  const provider = getProvider(providerId)!;

  const [isTimePickerOpen, setTimePickerOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const [providerStartAvailability, setProviderStartAvailability] =
    useState<string>("");
  const [providerEndAvailability, setProviderEndAvailability] =
    useState<string>("");

  const openTimePicker = (
    selectedDate: string,
    providerStart: string,
    providerEnd: string
  ) => {
    setSelectedDate(selectedDate);
    setProviderStartAvailability(providerStart);
    setProviderEndAvailability(providerEnd);
    setTimePickerOpen(true);
  };

  const closeTimePicker = () => {
    setTimePickerOpen(false);
  };

  const handleTimeSelect = (time: string) => {
    if (
      !isTimeBetween(time, providerStartAvailability, providerEndAvailability)
    ) {
      setIsAlertOpen(true);
      return;
    }

    client.reservations.push({
      reservationId: uuidv4(),
      providerId: provider.id,
      reservationDate: selectedDate,
      reservationTime: time,
      confirmed: false,
      timeOfRequest: new Date(),
    });

    updateClient(client);

    window.location.href = "/client";
  };

  const filterAvailabilities = (availabilities: ProviderAvailability[]) => {
    const currentDate = new Date();
    const minDate = new Date();
    minDate.setDate(currentDate.getDate() + 1); // 24 hours ahead

    const minDateTime = minDate.getTime();

    return availabilities.filter((availability) => {
      const availabilityDateTime = new Date(
        `${availability.date} ${availability.startTime}`
      ).getTime();
      return availabilityDateTime >= minDateTime;
    });
  };

  const filteredProviderAvailabilities = filterAvailabilities(
    provider.availability
  );

  return (
    <IonPage>
      <Header title={client.name} />
      <IonContent className="ion-padding">
        <h3 className="ion-padding">{provider.name}</h3>
        <h4 className="ion-padding">Available times</h4>
        <IonList className="ion-margin-bottom">
          {filteredProviderAvailabilities.map((availability, i) => {
            return (
              <div key={i}>
                <IonListHeader>{availability.date}</IonListHeader>
                <IonItem>
                  <IonLabel>{`${availability.startTime} - ${availability.endTime}`}</IonLabel>
                  <IonButton
                    slot="end"
                    onClick={() => {
                      openTimePicker(
                        availability.date,
                        availability.startTime,
                        availability.endTime
                      );
                    }}
                  >
                    Schedule
                  </IonButton>
                </IonItem>
              </div>
            );
          })}
        </IonList>
        <TimePicker
          isOpen={isTimePickerOpen}
          onClose={closeTimePicker}
          onTimeSelect={handleTimeSelect}
        />
        <IonAlert
          isOpen={isAlertOpen}
          message="Time selected is not within provider availability."
          buttons={["OK"]}
          onDidDismiss={() => setIsAlertOpen(false)}
        ></IonAlert>
      </IonContent>
    </IonPage>
  );
};

export default ScheduleReservationPage;
