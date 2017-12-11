module uiview.home {
    export class homeView extends ui.homeViewUI {
        static instance: homeView = null;
        constructor() {
            super();
            homeView.instance = this;
            this.btnCreate.on(Laya.Event.CLICK, this, this.onBtnCreate);
            this.btnJoin.on(Laya.Event.CLICK, this, this.onBtnJoin);

            this.btnRecord.on(Laya.Event.CLICK,this,this.showRecord);
            this.joinDesk("000000");
            this.setUserInfo();
        }

        showRecord(bShow) {
            this.viewRank.visible = true;
            this.viewRank.getMyRecord();
        }

        showActivity(bShow) {

        }

        showShare(bShow) {

        }


        onBtnJoin() {
            this.viewInput.visible = true;
        }

        onBtnCreate() {
            this.viewCreate.visible = true;
        }

        setUserInfo() {
            this.head.skin = network.http.webRoot + "/Image/head/" + game.userInfo.userId + "_head.png";
        }

        joinDesk(pwd) {
            var url = "/app/userlogin.aspx?user_id=" + game.userInfo.userId + "&token=" + game.userInfo.token;
            var url2 = "/data_interface/desk_mng.aspx?page_action=join_desk&desk_pwd=" + pwd;
            url += "&url=" + url2;
            network.http.getUrl(url, (resp) => {
                if (resp.result == "fail") {
                    console.log(resp.tips);
                    return;
                }

                game.gameInfo.nameId = resp.game_id;
                game.gameInfo.serverIp = resp.server_ip;//"192.168.10.120";
                game.gameInfo.serverPort = resp.server_port;//8773;
                game.gameInfo.deskPwd = resp.desk_pwd;
                game.gameInfo.json_rule = resp.json_rule;
                game.gameInfo.max_round = parseInt(resp.round_times);
                game.gameInfo.max_people = parseInt(resp.max_people);
                Laya.loader.load(game.uiAtlas.game, Laya.Handler.create(this, this.onLoaded));
            })
        }

        onLoaded() {
            var gameV = new uiview.gameView();
            Laya.stage.addChild(gameV);
            this.removeSelf();
            for (let i = 0; i < game.uiAtlas.home.length; ++i) {
                Laya.loader.clearRes(game.uiAtlas.home[i]);
            }
        }
    }
}