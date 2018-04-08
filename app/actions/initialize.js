export const INITIALIZE_READINESS_ADD = 'INITIALIZE_READINESS_ADD';
export const INITIALIZE_ERROR_ADD = 'INITIALIZE_ERROR_ADD';

const addToReadiness = percent => ({
   type: INITIALIZE_READINESS_ADD,
   percent
});

const logError = error => ({
   type: INITIALIZE_ERROR_ADD,
   error
});

export const addToReadinessPercent = percent => dispatch => {
   dispatch(addToReadiness(percent));
};

export const addError = error => dispatch => {
   dispatch(logError(error));
};
