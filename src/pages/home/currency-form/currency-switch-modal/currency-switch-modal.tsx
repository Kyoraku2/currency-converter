import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonRadio,
  IonRadioGroup,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import "./currency-switch-modal.scss";

type CurrencySwitchModalProps = {
  availableCurrencies: string[];
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
  onCancel?: () => void;
};

export const CurrencySwitchModal: React.FC<CurrencySwitchModalProps> = ({
  availableCurrencies,
  selectedCurrency,
  onCurrencyChange,
  onCancel,
}) => {
  const [filteredItems, setFilteredItems] =
    useState<string[]>(availableCurrencies);

  const tmp = () => {};

  const onCancelClick = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const onSearchChange = (event: CustomEvent) => {
    const query = event.detail.value;
    if (query) {
      const normalizedQuery = query.toLowerCase();
      setFilteredItems(
        availableCurrencies.filter((currency) =>
          currency.toLowerCase().includes(normalizedQuery)
        )
      );
    } else {
      setFilteredItems([...availableCurrencies]);
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onCancelClick}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Select currency</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => {}}>Done</IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar onIonInput={onSearchChange}></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding">
        <IonRadioGroup
          value={selectedCurrency}
          onIonChange={(e) => onCurrencyChange(e.detail.value)}
        >
          <IonList inset={true}>
            {filteredItems.map((currency) => (
              <IonItem key={currency} lines="none" className="currency-item">
                <IonRadio key={currency} value={currency} slot="start" />
                {currency}
              </IonItem>
            ))}
          </IonList>
        </IonRadioGroup>
      </IonContent>
    </>
  );
};
