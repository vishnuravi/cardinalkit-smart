import { usePatient } from '../context/PatientContext';
import { PatientVisualizer } from 'fhir-visualizers';
import { Container } from 'react-bootstrap';

const PatientData = () => {
    const patient = usePatient();

    return (
        <Container>
            <PatientVisualizer patient={patient} />
        </Container>
    );
};

export default PatientData;