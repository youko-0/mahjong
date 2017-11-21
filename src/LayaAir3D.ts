// 程序入口
class LayaAir3D {
    private scene: Laya.Scene;
    hands: Laya.Sprite3D[] = [];
    outs: Laya.Sprite3D[] = [];
    wall: Laya.Sprite3D;
    constructor() {
        //初始化引擎
        Laya3D.init(0, 0, true);

        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

        //开启统计信息
        Laya.Stat.show();
        Laya.loader.create("res/models/LayaScene_main/main.ls", Laya.Handler.create(this, this.modelsLoaded));
    }

    onLoaded() {
        var gameV = new uiview.gameView();
        Laya.stage.addChild(gameV);
        console.log("hello");
        CompositionEvent;
    }

    private modelsLoaded() {
        this.scene = Laya.loader.getRes("res/models/LayaScene_main/main.ls");
        Laya.stage.addChild(this.scene);
        for (let i = 0; i < 4; ++i) {
            var hand = this.scene.getChildByName("hand" + i) as Laya.Sprite3D;
            var handCtrl = hand.addComponent(script.handCtrl) as script.handCtrl;
            handCtrl.setView(i);
            this.hands.push(hand);
            this.outs.push(this.scene.getChildByName("out" + i) as Laya.Sprite3D);
        }
        this.wall = this.scene.getChildByName("wall") as Laya.Sprite3D;
        //this.wall.transform.localRotationEuler  = new Vector3(0,-90,0);
        console.log("init over");

        var wallCtrl = this.wall.addComponent(script.wallCtrl) as script.wallCtrl;
        Laya.stage.on(Laya.Event.CLICK, this, this.test);
    }

    test() {
        var testData = [];
        for (let i = 1; i < 38; ++i) {
            if (i % 10 === 0)
                continue;
            for (let j = 0; j < 4; ++j)
                testData.push(i);
        }
        for (let i = 0; i < 68; ++i) {
            var tmp = testData[i];
            var idx = parseInt(Math.random() * 68) + 68;
            testData[i] = testData[idx];
            testData[idx] = tmp;
        }
        var wallCtrl = this.wall.getComponentByType(script.wallCtrl) as script.wallCtrl;
        wallCtrl.sortWalls(testData);

        Laya.stage.off(Laya.Event.CLICK, this, this.test);
        Laya.stage.on(Laya.Event.CLICK, this, this.test2);

    }

    test2() {
        Laya.stage.off(Laya.Event.CLICK, this, this.test2);
        for (let i = 0; i < 13; ++i) {
            for (let j = 0; j < 4; ++j) {
                var sp = this.wall.removeChildAt(this.wall.numChildren - 1) as Laya.Sprite3D;
                (this.hands[j].getComponentByType(script.handCtrl) as script.handCtrl).addCard(sp);
            }
        }
    }

    makeWalls(data) {
        var box = this.scene.getChildByName("box");
        var _scale = this.wall.transform.scale.x;
        var offset = 0.3 * _scale
        for (let i = 0; i < data.length; ++i) {
            var idx = Math.floor(i / 4);
            var sp = Laya.Sprite3D.instantiate(box.getChildAt(idx) as Laya.Sprite3D, this.wall, false);
            var view = Math.floor(i / 34);
            sp.transform.rotate(new Vector3(90, (view - 1) * 90, 0), false, false);
            var dstX = 0.03 * _scale * (Math.floor(i / 2) % 17 - 8.5);
            var pos = new Vector3();
            pos.y = (i % 2) * 0.02 * _scale;
            switch (view) {
                case 0:
                    pos.x = -offset;
                    pos.z = -dstX;
                    break;
                case 1:
                    pos.x = dstX;
                    pos.z = -offset;
                    break;
                case 2:
                    pos.x = offset;
                    pos.z = dstX;
                    break;
                case 3:
                    pos.x = -dstX;
                    pos.z = offset;
                    break;
            }
            sp.transform.translate(pos, false);
        }
    }
}
new LayaAir3D();