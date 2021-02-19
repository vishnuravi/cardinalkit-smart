import { useState, useEffect } from 'react';
import { usePatient } from '../context/PatientContext';
import { Container } from 'react-bootstrap';
import SurveyTable from '../components/SurveyTable';
import { getPatientRecord } from '../fhir/fhirExtract';
import { useFHIRClient } from '../context/FHIRClientContext';
import {
    AllergiesVisualizer,
    CarePlansVisualizer,
    ConditionsVisualizer,
    EncountersVisualizer,
    ImmunizationsVisualizer,
    MedicationsVisualizer,
    ObservationsVisualizer,
    PatientVisualizer,
    ProceduresVisualizer,
    ReportsVisualizer,
} from 'fhir-visualizers';


const getResourceByType = (patientRecord, resourceType) => {
    return patientRecord.filter((resource) => resource.resourceType === resourceType);
};

const PatientData = () => {
    const [resources, setResources] = useState([]);
    const patient = usePatient();
    const client = useFHIRClient();

    useEffect(() => {
        getPatientRecord(client).then((records) => {
            setResources(records);
        });
    }, [client]);

    return (
        <Container>
            <PatientVisualizer patient={patient} />
            <ConditionsVisualizer rows={getResourceByType(resources, 'Condition')} />
            <ObservationsVisualizer rows={getResourceByType(resources, 'Observation')} />
            <ReportsVisualizer rows={getResourceByType(resources, 'DiagnosticReport')} />
            <MedicationsVisualizer rows={getResourceByType(resources, 'MedicationRequest')} />
            <AllergiesVisualizer rows={getResourceByType(resources, 'AllergyIntolerance')} />
            <CarePlansVisualizer rows={getResourceByType(resources, 'CarePlan')} />
            <ProceduresVisualizer rows={getResourceByType(resources, 'Procedure')} />
            <EncountersVisualizer rows={getResourceByType(resources, 'Encounter')} />
            <ImmunizationsVisualizer rows={getResourceByType(resources, 'Immunization')} />
        </Container>
    );
};

export default PatientData;