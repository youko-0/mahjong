module uiview {
    export class setView extends ui.setViewUI {
        constructor() {
            super();
            this.btnAgree.on(Laya.Event.CLICK, this, () => {
                game.gameClient.instance.m_ws.Send(180, 136, { value_: 1 });
            });
            this.btnRefus.on(Laya.Event.CLICK, this, () => {
                game.gameClient.instance.m_ws.Send(180, 136, { value_: 2 });
            });
            this.setRoot.getChildByName('close').on(Laya.Event.CLICK, this, () => {
                this.visible = false;
            });
            this.btnReqDis.on(Laya.Event.CLICK, this, this.onBtnReqDismiss);
        }

        onBtnReqDismiss() {
            game.gameClient.instance.m_ws.SendEmpty(180, 138);
            if (game.gameClient.instance.m_status == 0) {
                gameView.instance.onBack();
            }
        }

        m_rest: number = 60;
        //秒
        showTimer(time: number) {
            this.m_rest = time;
            this.tim.text = "" + this.m_rest;
            Laya.timer.loop(1000, this, this._updateTimer);
        }
        _updateTimer() {
            --this.m_rest;
            if (this.m_rest < 0) {
                Laya.timer.clear(this, this._updateTimer);
                return;
            }
            this.tim.text = "" + this.m_rest;
        }

        showDismiss() {
            this.visible = true;
            this.disRoot.visible = true;
            this.setRoot.visible = false;
            var arr = [];
            for (let i = 0; i < 4; ++i) {
                if (game.gameClient.instance.m_dismiss[i] == 2) {
                    game.gameClient.instance.m_dismiss = [0, 0, 0, 0];
                    Laya.timer.clear(this, this._updateTimer);
                    this.m_rest = 60;
                    return;
                }
                var da = {
                    sta: { text: game.gameClient.instance.m_dismiss[i] == 1 ? '同意解散' : '等待解散' }
                }
                arr.push(da);
            }
            this.list.array = arr;
            this.btnRefus.visible = game.gameClient.instance.m_dismiss[game.gameClient.instance.m_myDesk] != 1;
            this.btnAgree.visible = game.gameClient.instance.m_dismiss[game.gameClient.instance.m_myDesk] != 1;
            this.showTimer(60);
        }

        showSet() {
            this.visible = true;
            this.disRoot.visible = false;
            this.setRoot.visible = true;
        }
    }
}