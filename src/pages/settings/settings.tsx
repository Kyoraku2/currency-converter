import {
  IonButton,
  IonContent,
  IonFab,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonToggle,
  useIonToast,
} from "@ionic/react";
import "./setting.scss";
import { moon } from "ionicons/icons";
import { useState } from "react";
import {
  getApiKey,
  getDarkMode,
  setDarkMode,
  setExchangeRates,
  setSavedApiKey,
} from "../../utils/localstorage.utils";

export const SettingsPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    document.documentElement.classList.contains("ion-palette-dark") ||
      getDarkMode()
  );
  const [apiKey, setApiKey] = useState<string>(getApiKey() ?? "");
  const [presentToast] = useIonToast();

  const fetchExchangeRates = async () => {
    const response = await fetch(
      `https://api.apilayer.com/fixer/latest?base=USD&apikey=${apiKey}`
    );
    const data = await response.json();
    if (!response.ok) {
      presentToast({
        message: data.error.info,
        duration: 3000,
        color: "danger",
      });
      return;
    }
    setExchangeRates(data.rates);
    presentToast({
      message: "Exchange rates fetched successfully",
      duration: 3000,
      color: "success",
    });
  };

  const onApiKeyChange = (apiKey: string) => {
    setSavedApiKey(apiKey);
    setApiKey(apiKey);
  };

  const onDarkModeChange = (isDarkMode: boolean) => {
    setIsDarkMode(isDarkMode);
    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle("ion-palette-dark", isDarkMode);
  };

  return (
    <IonPage>
      <IonContent>
        <IonList className="parameter-list">
          <IonItem lines="none">
            <IonIcon aria-hidden="true" icon={moon} slot="start" />
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle
              slot="end"
              checked={isDarkMode}
              onIonChange={(event) => onDarkModeChange(event.detail.checked)}
            />
          </IonItem>
          <IonItem lines="none">
            <IonInput
              label="API Key"
              label-placement="floating"
              placeholder="Enter you API key here"
              value={apiKey}
              onIonInput={(e) => onApiKeyChange(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonButton
            expand="block"
            onClick={fetchExchangeRates}
            disabled={!apiKey}
          >
            Fetch API exchange rates
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
