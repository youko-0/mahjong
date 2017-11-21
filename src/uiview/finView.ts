module uiview {
    export class finView extends ui.finViewUI {
        constructor() {
            super();
            this.btnCon.on(Laya.Event.CLICK, this, () => {
                gameView.instance.m_client.m_ws.SendEmpty(180, 1);
                gameView.instance.clearUI();
            });
        }

        setFinInfo(data) {
            var dSource: Array<any> = [];
            for (let i = 0; i < gameView.instance.m_client.users.length; ++i) {
                dSource.push({
                    nick: {
                        skin: network.http.webRoot + "/Image/name/" + gameView.instance.m_client.users[i].userId + ".png"
                    },
                    score: { label: data.iTurePoint[i] + "" }
                });
            }
            this.list.dataSource = dSource;
        }
    }
}