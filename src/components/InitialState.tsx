export const userInitialState = {
    id: '',
    partnerId: '',
    username: '',
};

export const partnerInitialState = {
    id: '',
    companyName: ''
};

export const userDetailsInitialState = {
    id: '',
    partnerId: '',
    username: '',
    _embedded: {
        partner: {
            id: '',
            companyName: ''
        }
    },
};
