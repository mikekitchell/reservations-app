import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonDatetime,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import "./AddAvailability.css";
import TimePicker from "../components/TimePicker";
import Header from "../components/Header";
import { useParams } from "react-router";
import { getProvider, updateProvider } from "../api";

const AddAvailabilityPage: React.FC = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const [isTimePickerOpen, setTimePickerOpen] = useState(false);
  const [selectedTimePicker, setSelectedTimePicker] = useState<
    "start" | "end"
  >();
  const [selectedStartTime, setSelectedStartTime] =
    useState<string>("08:00:00");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("17:00:00");
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toDateString()
  );

  const openTimePicker = (selectedTimePicker: "start" | "end") => {
    setSelectedTimePicker(selectedTimePicker);
    setTimePickerOpen(true);
  };

  const closeTimePicker = () => {
    setTimePickerOpen(false);
  };

  const handleTimeSelect = (time: string) => {
    if (selectedTimePicker === "start") {
      setSelectedStartTime(time);
    } else if (selectedTimePicker === "end") {
      setSelectedEndTime(time);
    }
  };

  const handleSave = () => {
    const provider = getProvider(providerId)!;

    provider.availability.push({
      date: new Date(selectedDate).toDateString(),
      startTime: selectedStartTime,
      endTime: selectedEndTime,
    });

    updateProvider(provider);

    window.location.href = "/provider";
  };

  return (
    <IonPage>
      <Header title={"Dr. Zoidberg"} />
      <IonContent className="ion-padding">
        <IonDatetime
          presentation="date"
          onIonChange={(e: any) => {
            setSelectedDate(e.target.value);
          }}
        ></IonDatetime>
        <IonList className="ion-margin-bottom">
          <IonItem>
            <IonLabel>Start Time:</IonLabel>
            <IonButton
              onClick={() => {
                openTimePicker("start");
              }}
              slot="end"
            >
              {selectedStartTime}
            </IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>End Time:</IonLabel>
            <IonButton
              onClick={() => {
                openTimePicker("end");
              }}
              slot="end"
            >
              {selectedEndTime}
            </IonButton>
          </IonItem>
        </IonList>
        <IonButton onClick={handleSave} expand="full">
          Save
        </IonButton>
        <IonButton routerLink="/provider" fill="clear" expand="full">
          Cancel
        </IonButton>
        <TimePicker
          isOpen={isTimePickerOpen}
          onClose={closeTimePicker}
          onTimeSelect={handleTimeSelect}
        />
      </IonContent>
    </IonPage>
  );
};

export default AddAvailabilityPage;
