module uiview.home {
    export class createView extends ui.createViewUI {
        constructor() {
            super();
            this.btnCreate.on(Laya.Event.CLICK, this, this.createDesk);
        }

        createDesk() {
            game.gameInfo.nameId = 60015441;
            var url = "/app/userlogin.aspx?user_id=" + game.userInfo.userId + "&token=" + game.userInfo.token;
            var round = (this.grpRound.selectedIndex + 1) * 8;
            var count = 4;
            var jsonRule = {
            }
            var url2 = "/data_interface/desk_mng.aspx?page_action=create_desk&game_id=" + game.gameInfo.nameId + "&max_pople=" + count + "&round_times=" + round + "&json_rule=" + encodeURI(JSON.stringify(jsonRule));
            url += "&url=" + url2;
            network.http.getUrl(url, (resp) => {
                if (resp.result == "fail") {
                    console.log(resp.tips);
                    return;
                }
                homeView.instance.joinDesk("000000");
            });
        }
    }
}