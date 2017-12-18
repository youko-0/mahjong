module uiview.home {
    export class rankView extends ui.rankViewUI {

        arrList = [];

        constructor() {
            super();
            this.listAll.selectEnable = true;
            this.listAll.selectHandler = Laya.Handler.create(this, this.onViewRound, null, false);
            this.listRound.selectEnable = true;
            this.listRound.selectHandler = Laya.Handler.create(this, this.onViewRecord, null, false);

            this.titleRound.getChildAt(this.titleRound.numChildren - 1).on(Laya.Event.CLICK, this, () => {
                this.listAll.visible = true;
                this.titleAll.visible = true;
                this.listRound.visible = false;
                this.titleRound.visible = false;
            });
        }

        getMyRecord() {
            this.listAll.visible = true;
            this.listRound.visible = false;
            this.titleAll.visible = true;
            this.titleRound.visible = false;
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
                //for (let i = 0; i < resp.rows.length; ++i) {
                for (let i = resp.rows.length - 1; i >= 0; --i) {
                    var da = {
                        money: [
                            resp.rows[i].result_details.result[0].win_money,
                            resp.rows[i].result_details.result[1].win_money,
                            resp.rows[i].result_details.result[2].win_money,
                            resp.rows[i].result_details.result[3].win_money
                        ],
                        down_url: resp.rows[i].down_url,
                        round: resp.rows[i].current_round
                    }

                    if (this.arrList.length == 0 || this.arrList[0].pwd != resp.rows[i].desk_pwd) {
                        var dall = {
                            pwd: resp.rows[i].desk_pwd,
                            user_list: resp.rows[i].user_list.split(','),
                            win_money: da.money,
                            nick_name: [resp.rows[i].result_details.result[0].nick_name,
                            resp.rows[i].result_details.result[1].nick_name,
                            resp.rows[i].result_details.result[2].nick_name,
                            resp.rows[i].result_details.result[3].nick_name],
                            end_time: resp.rows[i].end_time,
                            record_list: []
                        }
                        dall.record_list.push(da);
                        this.arrList.splice(0, 0, dall);
                    } else {
                        this.arrList[0].record_list.push(da);
                        for (let k = 0; k < 4; ++k) {
                            this.arrList[0].win_money[k] += da.money[k];
                        }
                    }
                }
                this.updateRecordList();
            });
        }
        updateRecordList() {
            var arr = [];
            for (let i = 0; i < this.arrList.length; ++i) {
                var da = {
                    no: { text: i + 1 },
                    pwd: { text: this.arrList[i].pwd },
                    p0: { text: this.arrList[i].nick_name[0] + '\n' + this.arrList[i].win_money[0] },
                    p1: { text: this.arrList[i].nick_name[1] + '\n' + this.arrList[i].win_money[1] },
                    p2: { text: this.arrList[i].nick_name[2] + '\n' + this.arrList[i].win_money[2] },
                    p3: { text: this.arrList[i].nick_name[3] + '\n' + this.arrList[i].win_money[3] },
                    time: { text: this.arrList[i].end_time }
                }
                arr.push(da);
            }
            this.listAll.array = arr;
        }

        allIdx = 0;
        onViewRound(idx: number) {
            this.titleAll.visible = false;
            this.titleRound.visible = true;
            this.listAll.visible = false;
            this.listRound.visible = true;
            this.allIdx = idx;
            for (let i = 0; i < this.arrList[idx].user_list.length; ++i) {
                (this.titleRound.getChildAt(i) as Laya.Image).skin = network.http.webRoot + "/Image/name/" + this.arrList[idx].user_list[i] + ".png";
            }
            var arr = [];
            for (let i = 0; i < this.arrList[idx].record_list.length; ++i) {
                var record = this.arrList[idx].record_list[i];
                var da = {
                    no: { text: record.round },
                    p0: { text: record.money[0] },
                    p1: { text: record.money[1] },
                    p2: { text: record.money[2] },
                    p3: { text: record.money[3] }
                }
                arr.push(da);
            }
            this.listRound.array = arr;
        }

        onViewRecord(idx: number) {
            Laya.loader.load(game.uiAtlas.game, Laya.Handler.create(this, this.onLoaded, [this.arrList[this.allIdx].record_list[idx].down_url]));
        }

        onLoaded(url) {
            network.http.downloadZip(url, (msg) => {
                var gameV = new uiview.gameView(msg);
                Laya.stage.addChild(gameV);
                homeView.instance.removeSelf();
                for (let i = 0; i < game.uiAtlas.home.length; ++i) {
                    Laya.loader.clearRes(game.uiAtlas.home[i]);
                }
            });
        }
    }
}