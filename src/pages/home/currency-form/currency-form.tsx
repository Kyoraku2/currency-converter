import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
} from "@ionic/react";

import "./currency-form.scss";
import { CurrencySwitchModal } from "./currency-switch-modal/currency-switch-modal";
import { useRef } from "react";

type CurrencyFormProps = {
  onCurrencyChange: (currency: string) => void;
  onAmountChange: (amount: number) => void;
  availableCurrencies: string[];
  currency: string;
  amount: number;
};

export const CurrencyInput: React.FC<CurrencyFormProps> = ({
  onCurrencyChange,
  onAmountChange,
  availableCurrencies,
  currency,
  amount,
}) => {
  const modal = useRef<HTMLIonModalElement>(null);

  const onChange = (selectedCurrency: string) => {
    onCurrencyChange(selectedCurrency);
    modal.current?.dismiss();
  };

  if (availableCurrencies.length === 0) {
    return <IonTitle>No currencies available...</IonTitle>;
  }
  return (
    <>
      <IonItem className="currency-field" lines="none">
        <IonLabel slot="start">
          <IonButton
            id="currency-button"
            fill="clear"
            className="currency-button"
            onClick={() => modal.current?.present()}
          >
            {currency}
          </IonButton>
        </IonLabel>
        <IonInput
          type="number"
          placeholder="Amount"
          value={amount}
          onIonInput={(e) => onAmountChange(Number(e.detail.value) ?? 0)}
        ></IonInput>
      </IonItem>
      <IonModal isOpen={modal.current?.isOpen} ref={modal}>
        <CurrencySwitchModal
          availableCurrencies={availableCurrencies}
          selectedCurrency={currency}
          onCurrencyChange={onChange}
          onCancel={() => modal.current?.dismiss()}
        />
      </IonModal>
    </>
  );
};
