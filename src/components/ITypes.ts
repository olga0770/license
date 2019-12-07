export interface IUser {
    id: string;
    partnerId: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    zip: string;
    city: string;
    country: string;
    role: string;
}

export interface IPartner {
    id: string;
    companyName: string;
}


export interface IUserDetails extends IUser {
    partner: IPartner | any;
}

export interface IPartnerDetails extends IPartner{
    users: IUser[];
}

