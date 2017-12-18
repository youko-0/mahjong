module game {
    export var userInfo = {
        userId: 0,
        md5: "",
        token: "",
        gold: 0
    };
    export var gameInfo = {
        nameId: 0,
        deskPwd: 0,
        serverIp: "127.0.0.1",
        serverPort: 0,
        json_rule: "",
        max_round: 0,
        max_people: 4,
        ratio: 1.2  //16/9
    }

    export var uiAtlas = {
        login: "res/atlas/login.atlas",
        home: ["res/atlas/home.atlas", "res/atlas/create.atlas", "res/atlas/input.atlas","res/atlas/group.atlas","res/atlas/rank.atlas"],
        game: ["res/atlas/game.atlas", "res/atlas/fin.atlas","res/atlas/set.atlas", "res/atlas/small_mj.atlas"],
        tiles: ["res/tiles/label_bq.png", "res/tiles/label_qz.png", "res/tiles/label_x1.png", "res/tiles/label_x2.png", "res/tiles/label_x3.png", "res/tiles/label_ready.png",
            "res/tiles/niu0.png", "res/tiles/niu1.png", "res/tiles/niu2.png", "res/tiles/niu3.png", "res/tiles/niu4.png", "res/tiles/niu5.png", "res/tiles/niu6.png",
            "res/tiles/niu7.png", "res/tiles/niu8.png", "res/tiles/niu9.png", "res/tiles/niu10.png", "res/tiles/niu11.png", "res/tiles/niu12.png", "res/tiles/niu13.png", "res/tiles/niu14.png"]
    }

    export class userStruct {
        userId = 0;
        deskStation = -1;
        userState = 0;
        temp_chip = 0;
    }
}
