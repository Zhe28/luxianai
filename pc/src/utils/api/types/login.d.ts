declare interface IGetLoginParam {
    host: string | null;
    code: number;
    errorMessage: string;
    data: {
        redirectUri: string;
        appid: string;
        scope: string;
        state: string;
    };
}

declare interface IUserInfo {
    created: string | null;
    updated: string | null;
    userId: number;
    nickName: string;
    logo: string;
    sex: 'MAN' | 'WOMAN';
    mobile: string;
    isWechat: '0' | '1';
}

declare interface IUserInfoRes {
    code: number;
    errorMessage: string;
    data: IUserInfo;
    host: null | undefined | any;
}