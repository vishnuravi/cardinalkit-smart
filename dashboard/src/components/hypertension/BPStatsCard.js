import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { ArrowUpCircle, ArrowDownCircle } from 'react-bootstrap-icons';

const BPStatsCard = ({ bpData, type, bpUnit, thresholds }) => {

    const high = thresholds[type].high;
    const low = thresholds[type].low;
    const unit = bpUnit;

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [mean, setMean] = useState(0);

    useEffect(() => {
        const values = type === 'systolic' ? bpData.map(({ systolic }) => systolic) : bpData.map(({ diastolic }) => diastolic);
        setMin(Math.min(...values));
        setMax(Math.max(...values));
        setMean(Math.round((values.reduce((acc, val) => acc + val, 0) / values.length)));
    }, [bpData])

    return (
        <Card className="lead shadow">
            <Card.Body>
                <Card.Title>{type.charAt(0).toUpperCase() + type.slice(1)} BP</Card.Title>
                <Card.Text>
                    <ul className="list-group">
                        <li className={`list-group-item ${((min <= low) || (min >= high)) && 'list-group-item-danger'}`}>
                            Min <strong>{min}</strong> <small>{unit}</small>
                            {min >= high && <ArrowUpCircle />}
                            {min <= low && <ArrowDownCircle />}
                        </li>
                        <li className={`list-group-item ${((max <= low) || (max >= high)) && 'list-group-item-danger'}`}>
                            Max <strong>{max}</strong> <small>{unit}</small>
                            {max >= high && <ArrowUpCircle />}
                            {max <= low && <ArrowDownCircle />}
                        </li>
                        <li className={`list-group-item ${((mean <= low) || (mean >= high)) && 'list-group-item-danger'}`}>
                            Avg <strong>{mean}</strong> <small>{unit}</small>
                            {mean >= high && <ArrowUpCircle />}
                            {mean <= low && <ArrowDownCircle />}
                        </li>
                    </ul>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default BPStatsCard;