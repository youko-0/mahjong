// 程序入口
class LayaAir3D {
    constructor() {
        //初始化引擎
        Laya3D.init(1280, 720, true);

        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        //开启统计信息
        Laya.Stat.show();
        Laya.loader.load(game.uiAtlas.login, Laya.Handler.create(this, this.onLoaded));
    }

    onLoaded() {
        var login = new uiview.home.loginView();
        Laya.stage.addChild(login);
    }
}
new LayaAir3D();