import {
  IonAlert,
  IonButton,
  IonContent,
  IonIcon,
  IonList,
  IonPage,
} from "@ionic/react";
import "./home.scss";
import { CurrencyInput } from "./currency-form/currency-form";
import { useEffect, useState } from "react";
import { swapVertical } from "ionicons/icons";
import {
  ExchangeRates,
  getApiKey,
  getExchangeRates,
} from "../../utils/localstorage.utils";

export const HomePage: React.FC = () => {
  const [currency1, setCurrency1] = useState("EUR");
  const [currency2, setCurrency2] = useState("EUR");
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>();
  const [availableCurrencies, setAvailableCurrencies] = useState<string[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    const API_KEY = getApiKey();
    const exchangeRates = getExchangeRates();
    if (API_KEY && exchangeRates) {
      setExchangeRates(exchangeRates);
      setAvailableCurrencies(Object.keys(exchangeRates));
      return;
    }
    setIsAlertOpen(true);
  }, []);

  const formatAmount = (amount: number): number => {
    return Number(amount.toFixed(2));
  };

  const onCurrency1Change = (currency: string) => {
    if (!exchangeRates) {
      return;
    }
    setAmount2(
      formatAmount(
        (amount1 * exchangeRates[currency2]) / exchangeRates[currency]
      )
    );
    setCurrency1(currency);
  };

  const onCurrency2Change = (currency: string) => {
    if (!exchangeRates) {
      return;
    }
    setAmount2(
      formatAmount(
        (amount1 * exchangeRates[currency]) / exchangeRates[currency1]
      )
    );
    setCurrency2(currency);
  };

  const onAmount1Change = (amount: number) => {
    if (!exchangeRates) {
      return;
    }
    setAmount2(
      formatAmount(
        (amount * exchangeRates[currency2]) / exchangeRates[currency1]
      )
    );
    setAmount1(amount);
  };

  const onAmount2Change = (amount: number) => {
    if (!exchangeRates) {
      return;
    }
    setAmount1(
      formatAmount(
        (amount * exchangeRates[currency1]) / exchangeRates[currency2]
      )
    );
    setAmount2(amount);
  };

  const swapCurrencies = () => {
    const newCurrency1 = currency2;
    const newCurrency2 = currency1;
    const newAmount1 = amount2;
    const newAmount2 = amount1;
    setCurrency1(newCurrency1);
    setCurrency2(newCurrency2);
    setAmount1(newAmount1);
    setAmount2(newAmount2);
  };

  return (
    <>
      <IonPage>
        <IonContent fullscreen>
          <IonList className="currency-list">
            <CurrencyInput
              onCurrencyChange={onCurrency1Change}
              onAmountChange={onAmount1Change}
              availableCurrencies={availableCurrencies}
              amount={amount1}
              currency={currency1}
            />
            <IonButton fill="clear" onClick={swapCurrencies}>
              <IonIcon aria-hidden="true" icon={swapVertical} />
            </IonButton>
            <CurrencyInput
              onCurrencyChange={onCurrency2Change}
              onAmountChange={onAmount2Change}
              availableCurrencies={availableCurrencies}
              amount={amount2}
              currency={currency2}
            />
          </IonList>
        </IonContent>
      </IonPage>
      <IonAlert
        header="Error"
        isOpen={isAlertOpen}
        onDidDismiss={() => setIsAlertOpen(false)}
        subHeader="No exchange rates available"
        message="Please set up your API key and exchange rates in the settings page."
        buttons={
          [
            {
              text: "Redirect to settings",
              handler: () => {
                window.location.href = "/settings";
              },
            },
          ] as any
        }
      ></IonAlert>
    </>
  );
};
