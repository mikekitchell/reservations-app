export type ClientReservation = {
  reservationId: string;
  providerId: string;
  reservationDate: string;
  reservationTime: string;
  confirmed: boolean;
  timeOfRequest: Date;
};
