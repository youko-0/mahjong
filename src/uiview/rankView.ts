module uiview.home {
    export class rankView extends ui.rankViewUI {
        constructor() {
            super();
        }

        getMyRecord() {
            this.listAll.visible = true;
            this.listRound.visible = false;
            var kurl = '/app/userlogin.aspx?';
            kurl = network.http.pushValue(kurl, 'user_id', game.userInfo.userId);
            kurl = network.http.pushValue(kurl, 'token', game.userInfo.token);
            var rurl = '/data_interface/record_mng.aspx?';
            rurl = network.http.pushValue(rurl, 'page_action', 'get_my_record_list');
            kurl = network.http.pushValue(kurl, 'url', rurl);
            network.http.getUrl(kurl, (resp) => {
                if (resp.result == "fail") {
                    console.log(resp.tips);
                    this.listAll.array = [];
                    return;
                }
                console.log(JSON.stringify(resp));
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
                this.listAll.array = dArr;

            });
        }
    }
}