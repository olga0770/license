export const userInitialState = {
    id: '',
    username: '',
};

export const partnerInitialState = {
    id: '',
    companyName: ''
};

export const userDetailsInitialState = {
    id: '',
    username: '',
    _embedded: {partner: {id: '', companyName: ''}},
};
