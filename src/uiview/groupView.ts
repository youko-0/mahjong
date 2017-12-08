module uiview.home {
    export class groupView extends ui.groupViewUI {
        constructor() {
            super();
            this.btnMyGrp.on(Laya.Event.CLICK, this, this.onBtnGrp);
            this.btnMyDesk.on(Laya.Event.CLICK, this, this.onBtnDesk);
            this.rootView.getChildByName('close').on(Laya.Event.CLICK, this, () => {
                this.rootView.visible = false;
            });
        }

        onBtnGrp() {
            this.rootView.visible = true;
            this.listG.visible = true;
            this.listD.visible = false;

            var kurl = '/app/userlogin.aspx?';
            kurl = network.http.pushValue(kurl, 'user_id', game.userInfo.userId);
            kurl = network.http.pushValue(kurl, 'token', game.userInfo.token);
            var rurl = '/data_interface/desk_mng.aspx?';
            rurl = network.http.pushValue(rurl, 'page_action', 'get_my_group_list');
            kurl = network.http.pushValue(kurl, 'url', rurl);
            network.http.getUrl(kurl, (resp) => {
                if (resp.result == "fail") {
                    console.log(resp.tips);
                    this.listG.array = [];
                    return;
                }
                var dArr = [];
                for (let i = 0; i < resp.data.length; ++i) {
                    var da = {
                        id: { text: resp.data[i].group_id },
                        name: { text: resp.data[i].group_name },
                        rate: { text: resp.data[i].multiplying_factor },
                        my: { text: resp.data[i].user_credit },
                        least: { text: resp.data[i].least_credit },
                        status: { visible: resp.data[i].is_disabled == "1" },
                        create: { visible: resp.data[i].is_disabled == "0" },
                        quit: { visible: resp.data[i].is_disabled == "0" }
                    }
                    dArr.push(da);
                }
                this.listG.array = dArr;

            });
        }

        onBtnDesk() {
            this.rootView.visible = true;
            this.listG.visible = false;
            this.listD.visible = true;

            var kurl = '/app/userlogin.aspx?';
            kurl = network.http.pushValue(kurl, 'user_id', game.userInfo.userId);
            kurl = network.http.pushValue(kurl, 'token', game.userInfo.token);
            var rurl = '/data_interface/desk_mng.aspx?';
            rurl = network.http.pushValue(rurl, 'page_action', 'get_my_group_desk_list');
            kurl = network.http.pushValue(kurl, 'url', rurl);
            network.http.getUrl(kurl, (resp) => {
                if (resp.result == "fail") {
                    console.log(resp.tips);
                    this.listD.array = [];
                    return;
                }
                var dArr = [];
                for (let i = 0; i < resp.data.length; ++i) {
                    var da = {
                        rule: { text: resp.data[i].describe }
                    }
                    dArr.push(da);
                }
                this.listD.array = dArr;

            });
        }
    }
}