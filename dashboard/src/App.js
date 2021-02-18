import { useEffect, useState } from 'react';
import FHIR from 'fhirclient';
import { FHIRClientProvider } from './context/FHIRClientContext';
import { PatientProvider } from './context/PatientContext';
import { UserProvider } from './context/UserContext';
import Dashboard from './components/Dashboard';

const App = () => {

  const [fhirClient, setFhirClient] = useState(null);

  useEffect(() => {
    const launchSMART = async () => {
      const client = await FHIR.oauth2
        .init({
          clientId: 'cardinalkit_dashboard',
          scope: 'launch/patient openid profile'
        });
      setFhirClient(client);
    };
    launchSMART();
  }, []);

  return (
    fhirClient ?
      <FHIRClientProvider fhirClient={fhirClient}>
        <UserProvider>
          <PatientProvider>
            <Dashboard />
          </PatientProvider>
        </UserProvider>
      </FHIRClientProvider>
      :
      <div>
        <img src="%PUBLIC_URL%/cardinalkit_logo.png" />
        <h3>Please start the application from the <a
          href="http://launch.smarthealthit.org/?auth_error=&fhir_version_1=r4&fhir_version_2=r4&iss=&launch_ehr=1&launch_url=http%3A%2F%2Flocalhost%3A3000&patient=326b4675-0bc8-4dbd-b406-a5564c282401&prov_skip_auth=1&prov_skip_login=1&provider=37881086-7b05-4b18-a279-08e331f50e9b&pt_skip_auth=1&public_key=&sb=&sde=&sim_ehr=1&token_lifetime=15&user_pt=">SMART
        Launcher</a>.</h3>
      </div>
  );
}

export default App;
