export const getAllResources = async (fhirClient) => {
    // Get all available resources for the current patient
    const resourceBundle = await fhirClient.request(`/Patient/${fhirClient.patient.id}/$everything`, 
    {
        pageLimit: 0,
        flat: true,
        useRefreshToken: true
    });
    return resourceBundle;
};

export const getFhirRelease = async (fhirClient) => {
    // Returns 2 for DSTU2, 3 for STU3, 4 for R4, or 0 if the version is not known
    const fhirRelease = await fhirClient.getFhirRelease();
    return fhirRelease;
};