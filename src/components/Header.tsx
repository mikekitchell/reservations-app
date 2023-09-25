import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
} from "@ionic/react";

interface HeaderProps {
  title: string;
}
const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton routerLink="/">Logout</IonButton>
        </IonButtons>
        <IonTitle slot="end">{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
