module uiview.home {
    export class loginView extends ui.loginViewUI {
        constructor() {
            super();
            this.btnLogin.on(Laya.Event.CLICK, this, this.onBtnLogin);
            this.input.visible = !Laya.Browser.onMobile;
        }
        onBtnLogin() {
            if (!Laya.Browser.onMobile) {
                if (this.input.text != "TextInput") {
                    var str = this.input.text;
                    this.loginByToken(str, str);
                }else{
                    this.loginByToken(game.userInfo.token, game.userInfo.token);
                }
                // if (game.userInfo.token != undefined) {
                //     this.loginByToken(game.userInfo.token, game.userInfo.token);
                // } else {
                //     var str = this.input.text;
                //     this.loginByToken(str, str);
                // }
            }
            else {
                if (Laya.Browser.onAndriod) {
                    var WxMgr = Laya.PlatformClass.createClass("WxManager");
                    var wxmgr = WxMgr.newObject();
                    wxmgr.callWithBack((code) => {
                        this.wechatCallback(code);
                    }, "OnWxLogin");
                }
                if (Laya.Browser.onIOS) {
                    var WxMgr = Laya.PlatformClass.createClass("WxManager");
                    var wxmgr = WxMgr.newObject();
                    wxmgr.callWithBack((code) => {
                        this.wechatCallback(code);
                    }, "OnWxLogin");
                }
            }
        }

        wechatCallback(code) {
            console.log("wechat Callback :" + code);
            var wechat_url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + "wx57ff44de7c2b8048" + "&secret=" + "5691f57f24be80e7e71524fdd973a6f1" + "&code=" + code + "&grant_type=authorization_code";
            var url_path = "data_interface/weixin_login.aspx";
            var str_param = "page_action=weixin_login&weixin_url=";
            var encode_url = encodeURIComponent(wechat_url);    //这个函数会把？之类的也编码，encodeURI则不会
            str_param += encode_url;
            network.http.postUrl(url_path, (resp) => {
                if (resp.result == "fail") {
                    console.log(resp.tips);
                    return;
                }
                this.loginByToken(resp.open_id, resp.access_token);
            }, str_param);
        }

        loginByToken(open_id, token) {
            var url: string = "data_interface/login.aspx";
            // http.pushValue(url,"open_id",str);
            // http.pushValue(url,"token",str);
            game.userInfo.token = token;
            url += "?open_id=" + open_id;
            url += "&token=" + token;
            network.http.getUrl(url, (resp) => {
                if (resp.result == "fail") {
                    console.log(resp.tips);
                    return;
                }
                game.userInfo.userId = resp.data.userId;
                game.userInfo.gold = resp.data.gold;
                game.userInfo.md5 = resp.data.md5;
                Laya.loader.load(game.uiAtlas.home, Laya.Handler.create(this, this.onLoaded));
            });
        }

        onLoaded() {
            var home = new homeView();
            Laya.stage.addChild(home);
            this.removeSelf();
            Laya.loader.clearRes(game.uiAtlas.login);
        }
    }


}