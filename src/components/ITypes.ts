export default interface IUser {
    // partnerid: IPartner;
    username: string;
    // _links.self.href
    // _links: ILinks;
}

interface ILinks {
    self: ISelf;
}

interface ISelf {
    href: string;
}


// export interface IPartner {
//   companyName: string;
// }
