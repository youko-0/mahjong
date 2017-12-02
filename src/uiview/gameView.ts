import Vector3 = Laya.Vector3;
module uiview {
    export class gameView extends ui.gameViewUI {

        static instance: gameView = null;
        m_client: game.gameClient = null;

        scene: Laya.Scene;

        hands: Laya.Sprite3D[] = [];
        outs: Laya.Sprite3D[] = [];
        wall: Laya.Sprite3D;
        constructor() {
            super();
            gameView.instance = this;

            Laya.loader.load(game.uiAtlas.tiles, Laya.Handler.create(this, this.onLoaded))

            //wan tiao tong
            var chips = this.btns.getChildAt(0);
            for (let i = 0; i < chips.numChildren; ++i) {
                chips.getChildAt(i).on(Laya.Event.CLICK, this, this.onBtnChip, [i]);
            }

            this.blocks.getChildAt(1).on(Laya.Event.CLICK, this, this.onBtnPeng);
            //this.blocks.getChildAt(2).on(Laya.Event.CLICK, this, this.onBtnGang);
            this.blocks.getChildAt(3).on(Laya.Event.CLICK, this, this.onBtnHu);
            this.blocks.getChildAt(4).on(Laya.Event.CLICK, this, this.onBtnPass);
            (this.deskInfo.getChildAt(0) as Laya.Label).text = game.gameInfo.deskPwd + "";

        }
        onLoaded() {
            Laya.loader.create("res/models/LayaScene_main/main.ls", Laya.Handler.create(this, this.modelLoaded));
            //this.clearUI();
        }

        private modelLoaded() {
            this.scene = Laya.loader.getRes("res/models/LayaScene_main/main.ls");
            Laya.stage.addChild(this.scene);
            Laya.stage.setChildIndex(this.scene, 0);
            for (let i = 0; i < 4; ++i) {
                var hand = this.scene.getChildByName("hand" + i) as Laya.Sprite3D;
                var handCtrl = hand.addComponent(script.handCtrl) as script.handCtrl;
                handCtrl.setView(i);
                this.hands.push(hand);
                var out = this.scene.getChildByName("out" + i) as Laya.Sprite3D;
                out.addComponent(script.outCtrl);
                this.outs.push(out);
            }
            this.wall = this.scene.getChildByName("wall") as Laya.Sprite3D;
            var wallCtrl = this.wall.addComponent(script.wallCtrl) as script.wallCtrl;
            //this.wall.transform.localRotationEuler  = new Vector3(0,-90,0);
            console.log("init over");
            this.m_client = new game.gameClient();
        }

        setDeskInfo(data) {
            (this.deskInfo.getChildByName("cur") as Laya.Label).text = data.current_round_ + 1;
            this.m_client.m_status = data.desk_status_;
        }
        setPlayerInfo(data: game.userStruct[]) {
            for (let i = 0; i < data.length; ++i) {
                (this.players.getChildAt(this.vStation(i)).getChildByName("head") as Laya.Sprite).loadImage(network.http.webRoot + "/Image/head/" + data[i].userId + "_head.png", 0, 0, 64, 64);
                (this.players.getChildAt(this.vStation(i)).getChildByName("nick") as Laya.Sprite).loadImage(network.http.webRoot + "/Image/name/" + data[i].userId + ".png");
                (this.players.getChildAt(this.vStation(i)).getChildByName("money") as Laya.Label).text = data[i].temp_chip + "";
            }
        }

        setStatus(desk, stat: number) {
            var sp = (this.players.getChildAt(this.vStation(desk)).getChildByName("status") as Laya.Sprite);
            sp.graphics.clear();
            sp.graphics.drawTexture(Laya.loader.getRes(game.uiAtlas.tiles[stat]));
        }

        setNt(desk) {
            for (let i = 0; i < this.players.numChildren; ++i) {
                var v = this.vStation(desk);
                (this.players.getChildAt(i).getChildByName("nt") as Laya.Sprite).visible = v === i;
            }
        }

        showChips(bShow) {
            (this.btns.getChildAt(0) as Laya.Button).visible = bShow;
        }

        onBtnChip(val) {
            var data = {
                byUser: this.m_client.m_myDesk,
                byQue: val,
                byQuePai: [255, 255, 255, 255],
                bNotify: false,
                bFinish: [false, false, false, false]
            }
            this.m_client.m_ws.Send(180, 26, data);
        }

        onBtnChi() {

        }

        onBtnPeng() {
            var data = {
                byUser: this.m_client.m_myDesk,
                byBePeng: this.m_client.m_curPlayer,
                byPs: this.m_client.m_lastTile
            }
            this.m_client.m_ws.Send(180, 31, data);
        }

        onBtnGang(val) {
            var data = {
                byUser: this.m_client.m_myDesk,
                byBeGang: this.m_client.m_curPlayer,
                byPs: val
            }
            this.m_client.m_ws.Send(180, 34, data);
        }

        onBtnHu() {
            var data = {
                byUser: this.m_client.m_myDesk,
                byDianPao: this.m_client.m_curPlayer,
                byPs: this.m_client.m_lastTile
            }
            this.m_client.m_ws.Send(180, 36, data);
        }
        onBtnPass() {
            this.blocks.visible = false;
            this.m_client.m_ws.SendEmpty(180, 75);
        }
        onBack() {
            Laya.loader.load(game.uiAtlas.home, Laya.Handler.create(this, () => {
                var home = new uiview.home.homeView();
                Laya.stage.addChild(home);
                this.removeSelf();
                for (let i = 0; i < game.uiAtlas.game.length; ++i) {
                    Laya.loader.clearRes(game.uiAtlas.game[i]);
                }
                for (let i = 0; i < game.uiAtlas.tiles.length; ++i) {
                    Laya.loader.clearRes(game.uiAtlas.tiles[i]);
                }
            }));
        }

        gameBegin() {

            this.showFin(false);
        }

        showFin(bShow) {
            this.fin.visible = bShow;
        }


        vStation(desk) {
            return ((desk + game.gameInfo.max_people + 1 - this.m_client.m_myDesk) % game.gameInfo.max_people);
        }

        makeWalls(count) {
            (this.wall.getComponentByType(script.wallCtrl) as script.wallCtrl).sortChildren();
        }

        sendCards(data) {
            for (let i = 0; i < game.gameInfo.max_people; ++i) {
                for (let j = 0; j < data.m_byArHandPai[i].length; ++j) {
                    if (data.m_byArHandPai[i][j] == 255)
                        break;
                    if (i == game.gameClient.instance.m_myDesk) {
                        var sp = this.getACardInTheScene(data.m_byArHandPai[i][j], 1);
                        if (sp != undefined) {
                            (this.hands[this.vStation(i)].getComponentByType(script.handCtrl) as script.handCtrl).addCard(sp);
                        }
                    } else {
                        var sp = this.wall.removeChildAt(this.wall.numChildren - 1) as Laya.Sprite3D;
                        (this.hands[this.vStation(i)].getComponentByType(script.handCtrl) as script.handCtrl).addCard(sp);
                    }
                }
            }
        }

        //用于断线重连的,出的牌不在手上
        setOutCard(data) {
            for (let i = 0; i < game.gameInfo.max_people; ++i) {
                for (let j = 0; j < data.outpai_[i].length; ++j) {
                    if (data.outpai_[i][j] == 255) {
                        break;
                    }
                    var view = this.vStation(i);
                    var o = this.getACardInTheScene(data.outpai_[i][j], 1);
                    (this.outs[view].getComponentByType(script.outCtrl) as script.outCtrl).addCard(o);
                }
            }

        }

        //断线重连
        setBlock(data) {
            //data.byType;
            var view = this.vStation(data.iStation);
            var arr: Array<Laya.Sprite3D> = new Array<Laya.Sprite3D>();
            for (let i = 0; i < data.byData.length; ++i) {
                if (data.byData[i] == 255)
                    break;
                var sp = this.getACardInTheScene(data.byData[i], view);
                arr.push(sp);
                //var sp = this.getACardInHand()
            }
            (this.hands[view].getComponentByType(script.handCtrl) as script.handCtrl).addOneBlock(arr);
        }

        //一张一张出的牌
        outCard(data) {
            var desk = data.byUser;
            var view = this.vStation(desk);
            var o: Laya.Sprite3D;
            if (desk == this.m_client.m_myDesk) {
                o = this.getACardInHand(data.byPs);
            } else {
                o = this.getACardInTheScene(data.byPs, view, true);
            }
            (this.outs[view].getComponentByType(script.outCtrl) as script.outCtrl).addCard(o);
        }

        zhuaPai(data) {
            var desk = data.byUser;
            var view = this.vStation(desk);
            var o: Laya.Sprite3D;
            if (desk == this.m_client.m_myDesk) {
                o = this.getACardInTheScene(data.byPs, 1);
                (this.hands[view].getComponentByType(script.handCtrl) as script.handCtrl).addCard(o);
            } else {
                o = this.wall.removeChildAt(this.wall.numChildren - 1) as Laya.Sprite3D;
                (this.hands[view].getComponentByType(script.handCtrl) as script.handCtrl).justAddCard(o);
            }
        }

        notifyBlock(data) {
            if (data.bCanAction) {
                this.blocks.visible = true;
                (this.blocks.getChildAt(0) as Laya.Button).visible = data.bChi;
                (this.blocks.getChildAt(1) as Laya.Button).visible = data.bPeng;
                (this.blocks.getChildAt(2) as Laya.Button).visible = data.bGang;
                (this.blocks.getChildAt(3) as Laya.Button).visible = data.bHu;
                (this.blocks.getChildAt(this.blocks.numChildren - 1) as Laya.Button).visible = true;

                if (data.bGang) {
                    this.blocks.getChildAt(2).on(Laya.Event.CLICK, this, () => {
                        var d = {
                            byUser: this.m_client.m_myDesk,
                            byBeGang: this.m_client.m_curPlayer,
                            byType: data.m_iGangData[0][0],
                            byPs: data.m_iGangData[0][1]
                        }
                        this.m_client.m_ws.Send(180, 34, d);
                    });
                }
            }
        }

        addBlock(data) {
            this.blocks.visible = false;
            var view = this.vStation(data.byUser);
            var arr: Array<Laya.Sprite3D> = new Array<Laya.Sprite3D>();
            switch (data.byType) {
                case 2:
                    if (data.byUser == this.m_client.m_myDesk) {
                        var sp1 = this.getACardInHand(data.byPs);
                        var sp2 = this.getACardInHand(data.byPs);
                        var sp3 = (this.outs[this.vStation(data.byBePeng)].getComponentByType(script.outCtrl) as script.outCtrl).getLastOutCard();
                        arr.push(sp1);
                        arr.push(sp2);
                        arr.push(sp3);
                    } else {
                        var sp1 = this.getACardInTheScene(data.byPs, view, true);
                        var sp2 = this.getACardInTheScene(data.byPs, view, true);
                        var sp3 = (this.outs[this.vStation(data.byBePeng)].getComponentByType(script.outCtrl) as script.outCtrl).getLastOutCard();
                        arr.push(sp1);
                        arr.push(sp2);
                        arr.push(sp3);
                    }
                    break;
                case 5:
                    //bu gang
                    if (data.byUser == this.m_client.m_myDesk) {
                        var sp = this.getACardInHand(data.byPs);
                        arr.push(sp);
                    } else {
                        var sp = this.getACardInTheScene(data.byPs, view, true);
                        arr.push(sp);
                    }
                    break;
                case 6:
                //ming gang
            }
            (this.hands[view].getComponentByType(script.handCtrl) as script.handCtrl).addOneBlock(arr);
        }

        getACardInTheScene(val: number, view: number, exchange = false): Laya.Sprite3D {
            //find in the wall,remove as the last
            var idx = (this.wall.getComponentByType(script.wallCtrl) as script.wallCtrl).getChildByVal(val);
            if (idx != -1) {
                //为了之后的动画考虑,找到的牌和牌堆里最后一张牌进行交换(位置)
                var last = this.wall.getChildAt(this.wall.numChildren - 1) as Laya.Sprite3D;
                var sp = this.wall.removeChildAt(idx) as Laya.Sprite3D;
                if (idx < this.wall.numChildren) {
                    this.wall.setChildIndex(last, idx);
                    last.transform.localPosition = sp.transform.localPosition;
                    last.transform.localRotationEuler = sp.transform.localRotationEuler;
                }
                //sp.pos
                return sp;
            }
            //then find in other hand
            for (let i = 0; i < 4; ++i) {
                if (i == 1)
                    continue;
                var sp = (this.hands[i].getComponentByType(script.handCtrl) as script.handCtrl).removeCard(val);
                if (sp != undefined) {
                    if (exchange) {
                        if (view != i) {
                            var last = this.hands[view].removeChildAt(this.hands[view].numChildren - 1) as Laya.Sprite3D;
                            (this.hands[i].getComponentByType(script.handCtrl) as script.handCtrl).justAddCard(last);
                        }
                    } else {
                        var last = this.wall.getChildAt(this.wall.numChildren - 1) as Laya.Sprite3D;
                        (this.hands[i].getComponentByType(script.handCtrl) as script.handCtrl).justAddCard(last);
                    }
                    return sp;
                }
            }
            return undefined;
        }

        getACardInHand(val: number): Laya.Sprite3D {
            var o = (this.hands[1].getComponentByType(script.handCtrl) as script.handCtrl).removeCard(val);
            return o;
        }

        clearUI() {
            this.blocks.visible = false;
            this.showFin(false);
            this.showChips(false);
            for (let i = 0; i < game.gameInfo.max_people; ++i) {
                (this.players.getChildAt(i).getChildByName("money") as Laya.Label).visible = false;
            }
        }

        m_rest: number = 0;
        showTimer(desk, time: number) {
            this.m_rest = time;
            var timer = this.scene.getChildByName("desk").getChildByName("timer");
            var view = this.vStation(desk);
            timer._childs.forEach((o: Laya.Sprite3D, idx, arr) => {
                o.active = (idx == view);
            });
            Laya.timer.loop(1000, this, this._updateTimer);
        }
        _updateTimer() {
            --this.m_rest;
            if (this.m_rest < 0) {
                Laya.timer.clear(this, this._updateTimer);
                return;
            }

        }
    }
}