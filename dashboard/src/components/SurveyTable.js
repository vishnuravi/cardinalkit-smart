import { useState, useEffect } from 'react';
import { getSurveys } from '../api/surveys';

const SurveyTable = ({ userID }) => {

    const [surveys, setSurveys] = useState(null);

    useEffect(async () => {
        const surveyList = await getSurveys(userID);
        setSurveys(surveyList);
    }, [])

    return surveys && surveys.length ?
        //TODO: Make a table of surveys
        <ul>
            {surveys.map((survey) => <li>{survey.payload.identifier}</li>)}
        </ul> 
        : null;
};

export default SurveyTable;