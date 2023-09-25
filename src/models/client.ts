import { ClientReservation } from "./clientReservation";

export type Client = {
  id: string;
  name: string;
  providerIds: string[];
  reservations: ClientReservation[];
};
