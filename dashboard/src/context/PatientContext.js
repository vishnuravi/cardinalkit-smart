import { useState, useEffect, createContext, useContext } from 'react';
import { useFHIRClient } from './FHIRClientContext';
import Loading from '../components/Loading';

export const PatientContext = createContext(null);

export const usePatient = () => useContext(PatientContext);

export const PatientProvider = ({ children }) => {

    const fhirClient = useFHIRClient();
    const [patient, setPatient] = useState(null);

    useEffect(async () => {
        const currentPatient = await fhirClient.patient.read();
        setPatient(currentPatient);
    }, [fhirClient]);

    return patient ?
        <PatientContext.Provider value={patient}>
            {children}
        </PatientContext.Provider>
        :
        <Loading />
}