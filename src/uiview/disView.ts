module uiview {
    export class disView extends ui.disViewUI {
        constructor() {
            super();
            this.btnAgree.on(Laya.Event.CLICK, this, () => {
                game.gameClient.instance.m_ws.Send(180, 136, 1);
            });
            this.btnRefuse.on(Laya.Event.CLICK, this, () => {
                game.gameClient.instance.m_ws.Send(180, 136, 2);
            });
        }

        m_rest: number = 0;
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
    }
}