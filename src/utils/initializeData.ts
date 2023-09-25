import { Client } from "../models/client";
import { Provider } from "../models/provider";
import { v4 as uuidv4 } from "uuid";

export const initializeData = () => {
  if (!localStorage.getItem("dataLoaded")) {
    setProviderData();
    setClientData();
    localStorage.setItem("dataLoaded", "true");
  }
};

const setProviderData = () => {
  console.log("Loading provider data...");
  const providerData: Provider[] = [
    {
      id: "fa115dad-92f6-4db5-99ac-87e04fa6e087",
      name: "Dr. Zoidberg",
      availability: [
        {
          date: "Mon Oct 09 2023",
          startTime: "08:00:00",
          endTime: "17:00:00",
        },
        {
          date: "Tue Oct 10 2023",
          startTime: "08:00:00",
          endTime: "17:00:00",
        },
        {
          date: "Wed Oct 11 2023",
          startTime: "08:00:00",
          endTime: "17:00:00",
        },
      ],
    },
    {
      id: "2d8e786f-b703-4c06-af30-6beefc2d6b14",
      name: "Professor Farnsworth",
      availability: [
        {
          date: "Mon Oct 09 2023",
          startTime: "08:00:00",
          endTime: "17:00:00",
        },
        {
          date: "Tue Oct 10 2023",
          startTime: "08:00:00",
          endTime: "17:00:00",
        },
        {
          date: "Wed Oct 11 2023",
          startTime: "08:00:00",
          endTime: "17:00:00",
        },
      ],
    },
  ];
  localStorage.setItem("providers", JSON.stringify(providerData));
};

const setClientData = () => {
  console.log("Loading client data...");
  const clientData: Client = {
    id: "7f6bd501-c10c-40a0-9e13-5f09c0429055",
    name: "Philip J. Fry",
    providerIds: [
      "fa115dad-92f6-4db5-99ac-87e04fa6e087",
      "2d8e786f-b703-4c06-af30-6beefc2d6b14",
    ],
    reservations: [
      {
        reservationId: uuidv4(),
        timeOfRequest: new Date(
          "Sun Sep 24 2023 09:51:43 GMT-0500 (Central Daylight Time)"
        ),
        reservationDate: "Fri Sep 22 2023",
        reservationTime: "13:30:00",
        providerId: "fa115dad-92f6-4db5-99ac-87e04fa6e087",
        confirmed: false,
      },
      {
        reservationId: uuidv4(),
        timeOfRequest: new Date(),
        reservationDate: "Mon Oct 09 2023",
        reservationTime: "12:15:00",
        providerId: "fa115dad-92f6-4db5-99ac-87e04fa6e087",
        confirmed: false,
      },
    ],
  };
  localStorage.setItem("client", JSON.stringify(clientData));
};
