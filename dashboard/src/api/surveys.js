import Firebase from '../firebase';

// Get all surveys for a particular user
export const getSurveys = (userID) => {
    const firebase = new Firebase();
    return firebase.surveys(userID).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            });
        }).catch((error) => {
            console.log("Error getting document: ", error);
            return error;
        });
}