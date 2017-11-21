import Vector3 = Laya.Vector3;
module uiview {
    export class gameView extends ui.gameViewUI {

        static instance: gameView = null;
        m_client: game.gameClient = null;

        scene: Laya.Scene;
        aniBegin: Laya.Animation;
        aniFin: Laya.Animation;

        hands: Laya.Sprite3D[] = [];
        outs: Laya.Sprite3D[] = [];
        wall: Laya.Sprite3D;
        constructor() {
            super();
            gameView.instance = this;

            Laya.loader.load(game.uiAtlas.tiles, Laya.Handler.create(this, this.onLoaded))
            this.aniBegin = new Laya.Animation();
            this.aniFin = new Laya.Animation();
            this.aniBegin.loadAtlas("res/atlas/anim/start.atlas", null, "animStart");
            this.aniFin.loadAtlas("res/atlas/anim/result.atlas", null, "animFin");
            this.btnBegin.on(Laya.Event.CLICK, this, this.onBtnBegin);
            var robs = this.btns.getChildAt(0);
            for (let i = 0; i < robs.numChildren; ++i) {
                robs.getChildAt(i).on(Laya.Event.CLICK, this, this.onBtnRob, [i]);
            }
            var chips = this.btns.getChildAt(1);
            for (let i = 0; i < chips.numChildren; ++i) {
                chips.getChildAt(i).on(Laya.Event.CLICK, this, this.onBtnChip, [i + 1]);
            }
            var opens = this.btns.getChildAt(2);
            for (let i = 0; i < opens.numChildren; ++i) {
                opens.getChildAt(i).on(Laya.Event.CLICK, this, this.onBtnOpne, [i]);
            }
        }
        onLoaded() {
            this.scene = Laya.stage.addChild(new Laya.Scene()) as Laya.Scene;

            //添加照相机
            var camera: Laya.Camera = (this.scene.addChild(new Laya.Camera(16 / 9, 0.2, 2))) as Laya.Camera;
            camera.transform.translate(new Laya.Vector3(0, 0.75, -0.3));
            camera.transform.rotate(new Laya.Vector3(65, 0, 0));
            camera.fieldOfView = 35;
            camera.clearColor = null;

            var hand0 = new Laya.Sprite3D();
            hand0.transform.position = new Vector3(0.36, 0, -0.09);
            hand0.transform.rotate(new Vector3(0, 270, 0));
            var hand1 = new Laya.Sprite3D();
            hand1.transform.position = new Vector3(-0.35, 0, -0.19);
            hand1.transform.rotate(new Vector3(60, 0, 0));
            var hand2 = new Laya.Sprite3D();
            hand2.transform.position = new Vector3(-0.36, 0, 0.3);
            hand2.transform.rotate(new Vector3(0, 90, 0));
            var hand3 = new Laya.Sprite3D();
            hand3.transform.position = new Vector3(0.21, 0, 0.34);
            hand3.transform.rotate(new Vector3(0, 180, 0));
            this.hands.push(hand0, hand1, hand2, hand3);
            this.scene.addChild(hand0);
            this.scene.addChild(hand1);
            this.scene.addChild(hand2);
            this.scene.addChild(hand3);

            var out0 = new Laya.Sprite3D();
            out0.transform.translate(new Vector3(0.15, 0, 0.02));
            out0.transform.rotate(new Vector3(0, 270, 0));
            var out1 = new Laya.Sprite3D();
            out1.transform.translate(new Vector3(-0.08, 0, 0));
            out1.transform.rotate(new Vector3(0, 0, 0));
            var out2 = new Laya.Sprite3D();
            out2.transform.translate(new Vector3(-0.15, 0, 0.18));
            out2.transform.rotate(new Vector3(0, 90, 0));
            var out3 = new Laya.Sprite3D();
            out3.transform.translate(new Vector3(0.08, 0, 0.2));
            out3.transform.rotate(new Vector3(0, 180, 0));
            this.outs.push(out0, out1, out2, out3);
            this.scene.addChild(out0);
            this.scene.addChild(out1);
            this.scene.addChild(out2);
            this.scene.addChild(out3);

            this.wall = new Laya.Sprite3D();
            this.wall.transform.translate(new Vector3(0, 0.007, 0.1));
            this.wall.transform.scale = new Vector3(0.7);
            this.scene.addChild(this.wall);


            var testData = [];
            for (let i = 1; i < 38; ++i) {
                if (i % 10 === 0)
                    continue;
                for (let j = 0; j < 4; ++j)
                    testData.push(i);
            }

            for (let i = 0; i < testData.length; ++i) {
                var sp = new Laya.Sprite3D("res/models/mah" + testData[i] + "-pCube1.lh");
                sp.transform.translate(new Vector3());
                sp.transform.rotate(new Vector3());
                this.wall.addChild(sp);
            }

            //Laya.loader.create("res/models/mah1-pCube1.lm", Laya.Handler.create(this, this.moduleLoaded));
            //this.m_client = new game.gameClient();
            // var rule = game.gameInfo.json_rule;
            // var str = "";
            // var ntRules = ["固定庄", "轮庄", "抢庄"];
            // str += ntRules[parseInt(rule.nt_rule)];
            // str += ",";
            // var ptRules = ["经典模式", "疯狂模式", "最高4倍", "最高3倍"];
            // str += ptRules[parseInt(rule.point_rule)];
            // (this.deskInfo.getChildByName("option") as Laya.Label).text = str;
            // (this.deskInfo.getChildByName("pwd") as Laya.Label).text = game.gameInfo.deskPwd + "";
            // (this.deskInfo.getChildByName("total") as Laya.Label).text = game.gameInfo.max_round + "";
            this.clearUI();
        }

        moduleLoaded() {

        }

        setDeskInfo(data) {
            (this.deskInfo.getChildByName("cur") as Laya.Label).text = data.current_round_ + 1;
            this.m_client.m_status = data.desk_status_;
        }
        setPlayerInfo(data: game.userStruct[]) {
            for (let i = 0; i < data.length; ++i) {
                (this.players.getChildAt(this.vStation(i)).getChildByName("head") as Laya.Sprite).loadImage(network.http.webRoot + "/Image/head/" + data[i].userId + "_head.png", 32, 32, 64, 64);
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

        createAllMah(data: number[]) {

        }

        showBtnBegin(bShow) {
            this.btnBegin.visible = bShow;
        }

        showRobs(bShow) {
            (this.btns.getChildAt(0) as Laya.Button).visible = bShow;
        }

        showChips(bShow) {
            (this.btns.getChildAt(1) as Laya.Button).visible = bShow;
        }

        showOpens(bShow) {
            (this.btns.getChildAt(2) as Laya.Button).visible = bShow;
        }

        onBtnBegin() {
            this.m_client.m_ws.SendEmpty(180, 50);
            this.showBtnBegin(false);
        }

        onBtnRob(val) {
            var data = {
                bDeskStation: this.m_client.m_myDesk,
                iValue: val,
                bCallScoreflag: false
            }
            this.m_client.m_ws.Send(180, 55, data);
        }

        onBtnChip(val) {
            var data = {
                iVrebType: 0x06,
                iNote: val
            }
            this.m_client.m_ws.Send(180, 51, data);
        }

        onBtnOpne(val) {
            var data = {
                iVerbType: 0x02,
                bUpCard: [255, 255, 255]
            }
            this.m_client.m_ws.Send(180, 89, data);
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

        setBeFin(desk, bshow) {
            var fin: Laya.Image = this.cards.getChildAt(this.vStation(desk)).getChildAt(0) as Laya.Image;
            fin.visible = bshow;
            if (bshow) {
                fin.scale(0, 0);
                Laya.Tween.to(fin, { scaleX: 1, scaleY: 1 }, 200);
            }

            //(this.players.getChildAt(this.vStation(desk)).getChildByName("bFin") as Laya.Sprite).visible = true;
        }

        gameBegin() {
            this.aniBegin.play(0, false, "animStart");
            this.showFin(false);
        }

        showFin(bShow) {
            this.fin.visible = bShow;
        }


        vStation(desk) {
            return ((desk + game.gameInfo.max_people + 2 - this.m_client.m_myDesk) % game.gameInfo.max_people);
        }

        AddCard(desk, val, idx) {
            var sp: game.cardSp = this.cards.getChildAt(this.vStation(desk)).addChild(new game.cardSp(val, true, idx)) as game.cardSp;
            Laya.Tween.to(sp, { x: idx * 40 }, (idx + 1) * 200, Laya.Ease.backOut, null);
        }

        AddCards(desk, data: number[]) {
            for (let i = 0; i < data.length; ++i) {
                this.AddCard(desk, data[i], i);
            }
        }

        OpenCards(desk, bull, bulls) {
            var root = this.cards.getChildAt(this.vStation(desk));
            if (bull > 0 && bull <= 10) {
                //sort
                for (let i = 0; i < 3; ++i) {
                    for (let j = i; j < root.numChildren; ++j) {
                        var sp: game.cardSp = root.getChildAt(j + 2) as game.cardSp;
                        if (sp.val === bulls[i]) {
                            if (j !== i) {
                                root.setChildIndex(sp, i + 2);
                            }
                            break;
                        }
                    }
                }
            }
            for (let i = 2; i < root.numChildren; ++i) {
                var sp: game.cardSp = root.getChildAt(i) as game.cardSp;
                sp.idx = i;
                sp.flip();
            }
            var spBull = new Laya.Image(game.uiAtlas.tiles[bull + 6]);
            var type: Laya.Image = root.getChildAt(1) as Laya.Image;
            type.addChild(new Laya.Image(game.uiAtlas.tiles[bull + 6]));
            type.visible = true;
            type.scaleX = 0;
            Laya.Tween.to(type, { scaleX: 1 }, 500);
        }

        clearUI() {
            this.showBtnBegin(false);
            this.showFin(false);
            this.showRobs(false);
            this.showChips(false);
            this.showOpens(false);
            this.cards._childs.forEach((v, idx, arr) => {
                v.removeChildren(2, v.numChildren - 2);
                v.getChildAt(0).visible = false;
                v.getChildAt(1).visible = false;
            });
            for (let i = 0; i < 5; ++i) {
                (this.players.getChildAt(i).getChildByName("money") as Laya.Label).visible = false;
            }
        }

        m_rest: number = 0;
        showTimer(label: string, time: number) {
            this.m_rest = time;
            var lab: Laya.Label = this.timer.getChildByName("label") as Laya.Label;
            var tim: Laya.Label = this.timer.getChildByName("timer") as Laya.Label;
            lab.text = label + ":";
            tim.text = "" + this.m_rest;
            tim.x = lab.width + 12 + lab.x;
            this.timer.width = tim.width + lab.width + lab.x * 2 + 12;
            Laya.timer.loop(1000, this, this._updateTimer);
        }
        _updateTimer() {
            --this.m_rest;
            if (this.m_rest < 0) {
                Laya.timer.clear(this, this._updateTimer);
                return;
            }
            (this.timer.getChildByName("timer") as Laya.Label).text = "" + this.m_rest;
        }
    }
}