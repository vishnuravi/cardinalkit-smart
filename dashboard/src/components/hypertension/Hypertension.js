import { Container, Tabs, Tab } from 'react-bootstrap';
import DataLog from './DataLog';
import BPData from './BPData';
import { DataProvider } from './DataContext';

/**
 * An example dashboard that visualizes useful information for managing hypertension
 */
export default function Hypertension() {
    return (
        <DataProvider>
            <Container style={{ marginTop: '6em' }}>
                <Tabs defaultActiveKey="bpdata" className="m-1">
                    <Tab eventKey="bpdata" title="BP Data">
                        <BPData />
                    </Tab>
                    <Tab eventKey="datalog" title="Data Integrity">
                        <DataLog />
                    </Tab>
                </Tabs>
            </Container>
        </DataProvider>
    )
}
