import { usePatient } from '../context/PatientContext';
import { PatientVisualizer } from 'fhir-visualizers';
import { Container } from 'react-bootstrap';
import SurveyTable from '../components/SurveyTable';

const PatientData = () => {
    const patient = usePatient();

    return (
        <Container>
            <PatientVisualizer patient={patient} />
            <SurveyTable userID={patient.id} />
        </Container>
    );
};

export default PatientData;