export interface IUser {
    id: string;
    username: string;
}

export interface IPartner {
    id: string;
    companyName: string;
}

export interface IEmbeddedPartner {
    partner: IPartner;
}


export interface IUserDetails extends IUser {
    _embedded: IEmbeddedPartner | any;
}

