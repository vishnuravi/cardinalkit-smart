import Card from 'react-bootstrap/Card';

const MedicationsCard = ({ medicationList }) => {

    return (
        <Card className="lead shadow">
            <Card.Body>
                <Card.Title>Current Medications</Card.Title>
                <Card.Text>
                    <ul className="list-group">
                        {medicationList ? medicationList.map((medication) => {
                            return <li className="list-group-item">{medication.name} <br />
                                <small className="text-muted">started on {medication.start_date}</small></li>
                        }) :
                            <li className="list-group-item">No medications.</li>}
                    </ul>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default MedicationsCard;