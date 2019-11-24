export interface IUser {
    id: string;
    // partnerid: string;
    username: string;
    _embedded?: IUserEmbedded | any;
}

export interface IPartner {
    id: string;
    companyName: string;
}

export interface IUserEmbedded {
    partner: IPartner | any;
}


