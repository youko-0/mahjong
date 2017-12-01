module game {
    export class gameClient {
        static instance: gameClient = null;
        m_ws: network.ws;
        users: Array<userStruct> = null;

        m_myDesk: number;
        m_status: number;

        m_curPlayer: number;
        m_otherOut: number;
        constructor() {
            gameClient.instance = this;
            console.log(gameInfo.serverIp + ":" + gameInfo.serverPort);
            this.users = new Array<userStruct>();
            this.m_ws = new network.ws("ws://" + gameInfo.serverIp + ":" + gameInfo.serverPort);
            this.m_ws.OnMessage = (data) => {
                this.OnMessage(data);
            };
            this.m_ws.OnOpen = () => {
                var room_data = {
                    uNameID: gameInfo.nameId,
                    dwUserID: userInfo.userId,
                    szMD5Pass: userInfo.md5,
                    desk_pwd_: gameInfo.deskPwd
                }
                this.m_ws.Send(100, 5, room_data);
            };
            this.m_ws.OnClose = () => {
                this.onClose();
            };
        }

        OnMessage(data) {
            switch (data.head.bMainID) {
                case 1:
                    this.OnConnect(data.head, data.data);
                    break;
                case 100:
                    this.OnLogon(data.head, data.data);
                    break;
                case 101:
                    this.OnUserList(data.head, data.data);
                    break;
                case 102:
                    this.OnUserAction(data.head, data.data);
                    break;
                case 103:
                    this.OnRoom(data.head, data.data);
                    break;
                case 180:
                    this.OnGame(data.head, data.data);
                    break;
                case 150:
                    if (this.OnFrame != null) {
                        this.OnFrame(data.head, data.data);
                    }
                    break;
            }
        }

        onClose() {

        }


        //1
        OnConnect(head, data) {
            switch (head.bAssistantID) {
                case 1:
                    Laya.timer.once(7000, this, () => {
                        this.m_ws.SendEmpty(1, 1, 0);
                    });
                    break;
            }
        }

        //100
        OnLogon(head, data) {
            switch (head.bAssistantID) {
                case 2:
                    console.log("logon ok");
                    this.m_ws.SendEmpty(1, 1, 0);
                    break;
                case 3:
                    console.log("logon error!");
                    break;
                case 4:
                    if (head.bHandleCode == 0) {
                        this.m_ws.SendEmpty(180, 1, 1);
                    } else {
                        this.m_ws.Send(150, 1, { bEnableWatch: 0 });
                    }
                    break;

            }
        }

        //101
        OnUserList(head, data) {
            switch (head.bAssistantID) {
                case 1:
                case 2:
                    if (head.bHandleCode === 12) {
                        uiview.gameView.instance.setPlayerInfo(this.users);
                        return;
                    }
                    var user = new userStruct();
                    user.temp_chip = data.temp_chip_;
                    user.userId = data.dwUserID;
                    user.deskStation = data.desk_station_;
                    this.users.splice(user.deskStation, this.users[user.deskStation] === null ? 0 : 1, user);
                    if (data.dwUserID === userInfo.userId) {
                        this.m_myDesk = data.desk_station_;
                    }
                    break;
            }
        }

        //102
        OnUserAction(head, data) {
            switch (head.bAssistantID) {
                case 2:
                    //user sit
                    break;
                case 5:
                    //user come
                    break;
                case 6:
                    //user leave
                    this.users.splice(data.bDeskStation, 1);
                    uiview.gameView.instance.setPlayerInfo(this.users);
                    break;
                case 7:
                    //user cut
                    break;
            }
        }

        getUserIdxByUserId(uid) {
            for (let i = 0; i < this.users.length; ++i) {
                if (this.users[i].userId === uid) {
                    return i;
                }
            }
            return -1;
        }
        //103
        OnRoom(head, data) {
            switch (head.bAssistantID) {
                case 10:
                    //update money todo
                    //this.users
                    break;
            }
        }

        OnFrame(head, data) {
            switch (head.bAssistantID) {
                case 2:
                    this.setGameStation(head, data);
                    break;
            }
        }

        OnGame(head, data) {
            switch (head.bAssistantID) {
                case 1:
                    //userAgree
                    break;
                case 10:
                    //gameBegin
                    uiview.gameView.instance.makeWalls(17 * 2 * 4);
                    break;
                case 16:
                    //2szDir&Gp
                    break;
                case 19:
                    //Send card
                    uiview.gameView.instance.sendCards(data);
                    break;
                case 25:
                    //beginOut
                    break;
                case 26:
                    //notifyDingQue
                    uiview.gameView.instance.showChips(!data.bFinish[this.m_myDesk]);
                    break;
                case 27:
                    //notifyOutCard
                    this.m_curPlayer = data.byUser;
                    this.m_otherOut = data.byPs;
                    uiview.gameView.instance.outCard(data);
                    break;
                case 28:
                    //notifyZhua
                    uiview.gameView.instance.zhuaPai(data);
                    break;
                case 29:
                    //notifyBlock
                    uiview.gameView.instance.notifyBlock(data);
                    break;
                case 30:
                    //notifyChiPai
                    break;
                case 31:
                    //notifyPeng
                    uiview.gameView.instance.addBlock(data);
                    break;
                case 32:
                    //notifyKan
                    break;
                case 33:
                    //notifySao
                    break;
                case 34:
                    //notifyGang
                    uiview.gameView.instance.addBlock(data);
                    break;
                case 37:
                    //notifyTing
                    break;
                case 36:
                    //notifyHu
                    break;
                case 37:
                    //countFen
                    uiview.gameView.instance.showFin(true);
                    break;
                case 38:
                    //end
                    break;
                case 52:
                    //showAllOver
                    uiview.gameView.instance.showFin(true);
                    break;
                case 142:
                    //userAgree/Offline
                    break;
                case 139:
                    //setDeskInfo
                    uiview.gameView.instance.setDeskInfo(data);
                    break;
                case 137:
                    //dismiss success
                    if (this.m_status == 0) {
                        uiview.gameView.instance.onBack();
                        return;
                    }

                    break;
                case 136:
                    //showDismiss
                    break;
                case 138:
                    //showDismiss
                    break;

            }
        }

        reqOutCard(tile) {
            var data = {
                byUser: this.m_myDesk,
                byPs: tile,
                bTing: false
            }
            this.m_ws.Send(180, 27, data);
        }

        setGameStation(head, data) {
            uiview.gameView.instance.setPlayerInfo(this.users);
            switch (data.Stationpara) {
                case 0:
                case 1:
                    break;
                case 20:
                    //send card
                    uiview.gameView.instance.makeWalls(17 * 2 * 4);
                    uiview.gameView.instance.sendCards(data);
                    break;
                case 22:
                    this.m_curPlayer = data.m_byNowOutStation;
                    this.m_otherOut = data.m_byOtherOutPai;
                    uiview.gameView.instance.makeWalls(17 * 2 * 4);
                    uiview.gameView.instance.sendCards(data);
                    uiview.gameView.instance.setOutCard(data);
                    for (let i = 0; i < data.cpg_.length; ++i) {
                        for (let j = 0; j < data.cpg_[i].length; ++j) {
                            uiview.gameView.instance.setBlock(data.cpg_[i][j]);
                        }
                    }
                    break;
            }
        }
    }
}