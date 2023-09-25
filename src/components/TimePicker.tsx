import React, { useState } from "react";
import { IonButton, IonContent, IonDatetime, IonModal } from "@ionic/react";
import { formatTime } from "../utils/formatTime";

interface TimePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onTimeSelect: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  isOpen,
  onClose,
  onTimeSelect,
}) => {
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleSave = () => {
    onTimeSelect(selectedTime.split("T")[1]);
    onClose();
  };

  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
        <IonDatetime
          onIonChange={(e: any) => {
            setSelectedTime(e.target.value);
          }}
          presentation="time"
        />
        <IonButton expand="full" onClick={handleSave}>
          Save
        </IonButton>
        <IonButton fill="clear" expand="full" onClick={onClose}>
          Cancel
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default TimePicker;
