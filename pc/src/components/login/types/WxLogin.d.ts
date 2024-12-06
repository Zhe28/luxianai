declare global {
    interface WxLoginOptions {
        self_redirect?: boolean;
        id: string;
        appid: string;
        scope: string;
        redirect_uri: string;
        state: string;
        style: string;
        href: string;
    }

    class WxLogin {
        constructor(options: WxLoginOptions);
    }
}

export {};
