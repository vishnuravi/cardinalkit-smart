import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import { ArrowUpCircle, ArrowDownCircle } from 'react-bootstrap-icons';
import { Line } from 'react-chartjs-2';
import sampleData from './sample-data.json';
import { useFHIRClient } from '../../context/FHIRClientContext';
import moment from 'moment';
import * as zoom from 'chartjs-plugin-zoom';
import PatientBanner from './PatientBanner';

import MedicationsCard from './MedicationsCard';
import LabsCard from './LabsCard';
import SummaryCard from './SummaryCard';
import Loading from '../Loading';


// configuration
const systolicHighThreshold = 140;
const diastolicHighThreshold = 90;
const systolicLowThreshold = 90;
const diastolicLowThreshold = 60;
const bpUnit = "mmHg";

const BPData = () => {

    const fhirClient = useFHIRClient();
    const patientId = fhirClient.patient.id;

    // data
    const [data, setData] = useState();
    const [systolicReadings, setSystolicReadings] = useState();
    const [diastolicReadings, setDiastolicReadings] = useState();
    const [adherenceLog, setAdherenceLog] = useState();

    // stats
    const [systolicMin, setSystolicMin] = useState(0);
    const [systolicMax, setSystolicMax] = useState(0);
    const [systolicMean, setSystolicMean] = useState(0);
    const [diastolicMin, setDiastolicMin] = useState(0);
    const [diastolicMax, setDiastolicMax] = useState(0);
    const [diastolicMean, setDiastolicMean] = useState(0);

    useEffect(() => {
        // format BP data for display
        const result = sampleData.filter((patient) => patient.patientId === patientId)[0];
        setData(result);

        if (result) {
            const bpData = result.bp_measurements;

            if (bpData.length > 0) {
                // prepare data for line chart
                const systolicData = bpData.map(({ date, systolic }) => ({ x: new Date(date), y: systolic }));
                setSystolicReadings(systolicData);

                const diastolicData = bpData.map(({ date, diastolic }) => ({ x: new Date(date), y: diastolic }));
                setDiastolicReadings(diastolicData);

                const adherenceData = result.adherence_log.map(({ date }) => ({ x: new Date(date), y: 0 }));
                setAdherenceLog(adherenceData);

                // calculate stats
                const systolicValues = bpData.map(({ systolic }) => systolic);
                setSystolicMin(Math.min(...systolicValues));
                setSystolicMax(Math.max(...systolicValues));
                setSystolicMean(Math.round((systolicValues.reduce((acc, val) => acc + val, 0) / systolicValues.length)));

                const diastolicValues = bpData.map(({ diastolic }) => diastolic);
                setDiastolicMin(Math.min(...diastolicValues));
                setDiastolicMax(Math.max(...diastolicValues));
                setDiastolicMean(Math.round((diastolicValues.reduce((acc, val) => acc + val, 0) / diastolicValues.length)));

            }

        }
    }, [patientId]);


    const chartData = {
        datasets: [
            {
                label: `Systolic Blood Pressure (${bpUnit})`,
                data: systolicReadings,
                fill: false,
                backgroundColor: 'rgb(0,152,219)',
                borderColor: 'rgba(0,152,219, 0.2)',
                pointRadius: 6
            },
            {
                label: `Diastolic Blood Pressure (${bpUnit})`,
                data: diastolicReadings,
                fill: false,
                backgroundColor: 'rgb(233, 131, 0)',
                borderColor: 'rgba(233,131,0, 0.2)',
                pointRadius: 6
            },
            {
                label: 'Medications Taken',
                data: adherenceLog,
                pointStyle: 'rectRounded',
                fill: false,
                borderColor: 'rgba(0,155,118, 0.8)',
                backgroundColor: 'rgba(0,155,118, 0.8)',
                pointRadius: 6,
                showLine: false
            }
        ]
    };

    const options = {
        pan: {
            enabled: true,
            mode: 'x'
        },
        zoom: {
            enabled: true,
            mode: 'x'
        },
        tooltips: {
            enabled: true
        },
        scales: {
            xAxes: [{
                type: 'time',
                unit: 'day',
                time: {
                    min: moment().subtract(14, 'days').toDate(),
                    max: moment().toDate(),
                }
            }]
        },
        spanGaps: true
    }


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
                    {(systolicReadings && diastolicReadings) ?
                        <Card className="p-2 shadow">
                            <Line data={chartData} options={options} />
                        </Card>
                        :
                        <Card className="p-2 text-center shadow">
                            <p className="lead">No blood pressure data available.</p>
                        </Card>
                    }
                </Col>
            </Row>

            <br />

            <Row>
                <Col>
                    <SummaryCard bpData={data.bp_measurements}
                        systolicHighThreshold={systolicHighThreshold}
                        systolicLowThreshold={systolicLowThreshold}
                        diastolicHighThreshold={diastolicHighThreshold}
                        diastolicLowThreshold={diastolicLowThreshold} />
                </Col>
                <Col>
                    <Card className="lead shadow">
                        <Card.Body>
                            <Card.Title>Systolic BP</Card.Title>
                            <Card.Text>
                                <ul className="list-group">
                                    <li className={`list-group-item ${((systolicMin <= systolicLowThreshold) || (systolicMin >= systolicHighThreshold)) && 'list-group-item-danger'}`}>
                                        Min <strong>{systolicMin}</strong> <small>{bpUnit}</small>
                                        {systolicMin >= systolicHighThreshold && <ArrowUpCircle />}
                                        {systolicMin <= systolicLowThreshold && <ArrowDownCircle />}
                                    </li>
                                    <li className={`list-group-item ${((systolicMax <= systolicLowThreshold) || (systolicMax >= systolicHighThreshold)) && 'list-group-item-danger'}`}>
                                        Max <strong>{systolicMax}</strong> <small>{bpUnit}</small>
                                        {systolicMax >= systolicHighThreshold && <ArrowUpCircle />}
                                        {systolicMax <= systolicLowThreshold && <ArrowDownCircle />}
                                    </li>
                                    <li className={`list-group-item ${((systolicMean <= systolicLowThreshold) || (systolicMean >= systolicHighThreshold)) && 'list-group-item-danger'}`}>
                                        Avg <strong>{systolicMean}</strong> <small>{bpUnit}</small>
                                        {systolicMean >= systolicHighThreshold && <ArrowUpCircle />}
                                        {systolicMean <= systolicLowThreshold && <ArrowDownCircle />}
                                    </li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="lead shadow">
                        <Card.Body>
                            <Card.Title>Diastolic BP</Card.Title>
                            <Card.Text>
                                <ul class="list-group">
                                    <li className={`list-group-item ${((diastolicMin < diastolicLowThreshold) || (diastolicMin > diastolicHighThreshold)) && 'list-group-item-danger'}`}>
                                        Min <strong>{diastolicMin}</strong> <small>{bpUnit}</small>
                                        {diastolicMin > diastolicHighThreshold && <ArrowUpCircle />}
                                        {diastolicMin < diastolicLowThreshold && <ArrowDownCircle />}
                                    </li>
                                    <li className={`list-group-item ${((diastolicMax < diastolicLowThreshold) || (diastolicMax > diastolicHighThreshold)) && 'list-group-item-danger'}`}>
                                        Max <strong>{diastolicMax}</strong> <small>{bpUnit}</small>
                                        {diastolicMax > diastolicHighThreshold && <ArrowUpCircle />}
                                        {diastolicMax < diastolicLowThreshold && <ArrowDownCircle />}
                                    </li>
                                    <li className={`list-group-item ${((diastolicMean < diastolicLowThreshold) || (diastolicMean > diastolicHighThreshold)) && 'list-group-item-danger'}`}>
                                        Avg <strong>{diastolicMean}</strong> <small>{bpUnit}</small>
                                        {diastolicMean > diastolicHighThreshold && <ArrowUpCircle />}
                                        {diastolicMean < diastolicLowThreshold && <ArrowDownCircle />}
                                    </li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
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