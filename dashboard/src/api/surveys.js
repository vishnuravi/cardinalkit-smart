import Firebase from '../firebase';

// Get all surveys for a particular user
export const getSurveys = async (userID) => {
    const firebase = new Firebase();
    const snapshot = await firebase.surveys(userID).get();
    return snapshot.docs.map(doc => doc.data());
}