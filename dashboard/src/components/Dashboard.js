import Header from './Header';
import PatientRecord from './PatientData';

const Dashboard = ({ resources }) => {
    return (
        <>
            <Header />
            <PatientRecord resources={resources} />
        </>
    );
}

export default Dashboard;