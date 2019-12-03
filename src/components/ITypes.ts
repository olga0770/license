export interface IUser {
    id: string;
    partnerId: string;
    username: string;
    password: string;
}

export interface IPartner {
    id: string;
    companyName: string;
}

// export interface IEmbeddedPartner {
//     partner: IPartner;
// }


export interface IUserDetails extends IUser {
    partner: IPartner | any;
}

