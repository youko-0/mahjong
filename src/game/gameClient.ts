module game {
    export class gameClient {
        static instance: gameClient = null;
        m_ws: network.ws;
        users: Array<userStruct> = null;

        m_bWatch = false;
        m_myDesk: number;
        m_status: number;
        constructor() {
            gameClient.instance = this;
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

        }

        OnGame(head, data) {
            switch (head.bAssistantID) {
                case 50:
                    //showBtnBegin
                    uiview.gameView.instance.showBtnBegin(true);
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
                case 104:
                    uiview.gameView.instance.gameBegin();
                    break;
                case 55:
                    //showGrpRob
                    uiview.gameView.instance.showBtnBegin(false);
                    uiview.gameView.instance.showRobs(true);
                    uiview.gameView.instance.showTimer("请抢庄", 5);
                    break;
                case 56:
                    //SetRob
                    uiview.gameView.instance.setStatus(data.bDeskStation, data.iValue > 0 ? 1 : 0);
                    break;
                case 57:
                    //robAnim & setNt
                    uiview.gameView.instance.setNt(data.bDeskStation);
                    break;
                case 51:
                    //showChip
                    uiview.gameView.instance.showRobs(false);
                    uiview.gameView.instance.showChips(true);
                    uiview.gameView.instance.showTimer("请下注", 5);
                    break;
                case 92:
                    //setNote
                    uiview.gameView.instance.setStatus(data.iOutPeople, data.iCurNote + 1);
                    break;
                case 53:
                    //AddCards
                    for (let i = 0; i < gameInfo.max_people; ++i) {
                        if (this.users[i] == null)
                            continue;
                        uiview.gameView.instance.AddCards(i, data.bCard[i]);
                    }
                    break;
                case 59:
                    //waitOpen & showTip
                    uiview.gameView.instance.showChips(false);
                    uiview.gameView.instance.showOpens(true);
                    uiview.gameView.instance.showTimer("请开牌", 5);
                    break;
                case 106:
                    //openFinish
                    uiview.gameView.instance.setBeFin(data.bOpenStation, true);
                    break;
                case 105:
                    //openAnim & setFin
                    for (let i = 0; i < gameInfo.max_people; ++i) {
                        if (this.users[i] == null)
                            continue;
                        uiview.gameView.instance.OpenCards(i, data.iCardShape[i]);
                    }
                    uiview.gameView.instance.fin.setFinInfo(data);
                    break;
                case 65:
                    //showFin
                    uiview.gameView.instance.showFin(true);
                    break;
                case 52:
                    //showAllOver
                    uiview.gameView.instance.showFin(true);
                    break;
            }
        }

        setGameStation(head, data) {
            this.m_myDesk = data.bDeskStation;
            uiview.gameView.instance.setPlayerInfo(this.users);
            switch (data.Stationpara) {
                case 0:
                case 1:
                    break;
                case 20:
                    this.m_bWatch = data.bWatchMode;

                    var iTimeRest = data.iTimeRest;
                    if (data.iGameFlag === 25) {
                        //call_score
                        for (let i = 0; i < 5; ++i) {
                            if (data.iCallScore[i] != -1) {
                                uiview.gameView.instance.setStatus(i, data.iCallScore[i] > 0 ? 1 : 0);
                            }
                        }
                        if (!this.m_bWatch && data.iCallScore[this.m_myDesk]) {
                            uiview.gameView.instance.showRobs(false);
                            uiview.gameView.instance.showTimer("请抢庄", iTimeRest);
                        } else {
                            uiview.gameView.instance.showTimer("等待其他人抢庄", iTimeRest);
                        }
                    }
                    if (data.iGameFlag === 26) {
                        //chip
                        uiview.gameView.instance.showRobs(false);
                        uiview.gameView.instance.setNt(data.iUpGradePeople);
                        for (let i = 0; i < 5; ++i) {
                            if (data.iTotalNote[i] > 0) {
                                uiview.gameView.instance.setStatus(i, data.iTotalNote[i] + 1);
                            }
                        }
                        if (this.m_bWatch || data.iUpGradePeople === this.m_myDesk || data.iTotalNote[this.m_myDesk] > 0) {
                            uiview.gameView.instance.showTimer("等待闲家下注", iTimeRest);
                            uiview.gameView.instance.showChips(false);
                        } else {
                            uiview.gameView.instance.showTimer("请下注", iTimeRest);
                            uiview.gameView.instance.showChips(true);
                        }
                    }
                    for (let i = 0; i < 5; ++i) {
                        if (data.iUserCard[i][0] === 255)
                            continue;
                        uiview.gameView.instance.AddCards(i, data.iUserCard[i]);
                    }
                    break;
                case 22:
                    //game playing
                    this.m_bWatch = data.bWatchMode;
                    uiview.gameView.instance.setNt(data.iUpGradePeople);
                    for (let i = 0; i < 5; ++i) {
                        if (data.iUserCard[i][0] == 255)
                            continue;
                        uiview.gameView.instance.setStatus(i, data.iTotalNote[i] + 1);
                        uiview.gameView.instance.AddCards(i, data.iUserCard[i]);
                        if (data.iStation[i] === 0x02)
                            uiview.gameView.instance.setBeFin(i);
                    }

                    var iTimeRest = data.iTimeRest;
                    uiview.gameView.instance.showChips(false);
                    uiview.gameView.instance.showRobs(false);
                    if (!this.m_bWatch && data.iStation[this.m_myDesk] != 0x02) {
                        uiview.gameView.instance.showOpens(true);
                        uiview.gameView.instance.showTimer("请开牌", iTimeRest);
                    } else {
                        uiview.gameView.instance.showOpens(false);
                        uiview.gameView.instance.showTimer("等待他人开牌", iTimeRest);
                    }
            }
        }
    }
}