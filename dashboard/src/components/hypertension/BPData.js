import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import sampleData from './sample-data.json';
import { useFHIRClient } from '../../context/FHIRClientContext';
import PatientBanner from './PatientBanner';
import MedicationsCard from './MedicationsCard';
import LabsCard from './LabsCard';
import SummaryCard from './SummaryCard';
import BPStatsCard from './BPStatsCard';
import LineChart from './LineChart';
import Loading from '../Loading';

const thresholds = {
    systolic: {
        high: 140,
        low: 90
    },
    diastolic: {
        high: 90,
        low: 60
    }
}

const BPData = () => {

    const fhirClient = useFHIRClient();
    const patientId = fhirClient.patient.id;

    // data
    const [data, setData] = useState();

    useEffect(() => {
        const result = sampleData.filter((patient) => patient.patientId === patientId)[0];
        setData(result);
    }, [patientId]);


    return (data ?
        <Container className="p-3">
            <Row>
                <Col>
                    <PatientBanner />
                </Col>
                <Col>
                    <DropdownButton
                        menuAlign="right"
                        title="Last 2 weeks"
                        id="dropdown-menu-align-right"
                        variant="outline-secondary"
                        style={{ textAlign: 'right' }}
                    >
                        <Dropdown.Item eventKey="1">Last 2 weeks</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Last month</Dropdown.Item>
                        <Dropdown.Item eventKey="3">Last 6 months</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <Row>
                <Col>
                    <LineChart 
                        bpData={data.bp_measurements} 
                        adherence={data.adherence_log}
                        bpUnit={"mmHg"}
                    />
                </Col>
            </Row>

            <br />

            <Row>
                <Col>
                    <SummaryCard 
                        bpData={data.bp_measurements} 
                        thresholds={thresholds} />
                </Col>
                <Col>
                    <BPStatsCard 
                        bpData={data.bp_measurements}
                        type={"systolic"}
                        bpUnit={"mmHg"}
                        thresholds={thresholds} />
                </Col>
                <Col>
                    <BPStatsCard
                        bpData={data.bp_measurements}
                        type={"diastolic"}
                        bpUnit={"mmHg"}
                        thresholds={thresholds} />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <MedicationsCard medicationList={data.medications} />
                </Col>
                <Col>
                    <LabsCard labs={data.labs} />
                </Col>
            </Row>

        </Container>
        : <Loading />
    )
};

export default BPData;