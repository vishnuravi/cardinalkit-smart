import { useState, useEffect } from 'react';
import { getSurveys } from '../api/surveys';

const SurveyTable = ({ userID }) => {

    const [surveys, setSurveys] = useState(null);

    useEffect(async () => {
        const surveyList = await getSurveys(userID);
        setSurveys(surveyList);
    }, [])

    return surveys && surveys.length ? surveys.map((survey) => <h1>{survey.payload.identifier}</h1>) : null;
};

export default SurveyTable;