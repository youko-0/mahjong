
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class createViewUI extends View {
		public grpRound:Laya.RadioGroup;
		public btnCreate:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":1100,"height":640},"child":[{"type":"Image","props":{"y":40,"x":0,"width":1080,"skin":"create/scale_bg.png","sizeGrid":"32,32,32,32","pivotY":0,"pivotX":0,"height":600}},{"type":"RadioGroup","props":{"y":164,"x":271,"var":"grpRound","space":100,"skin":"create/checkbox.png","selectedIndex":1,"labels":"8局,16局","labelStrokeColor":"#000000","labelSize":32,"labelPadding":"0,0,0,10","labelFont":"SimHei","labelColors":"#40210a,#8c4c1f,#ffff00,gray"}},{"type":"Button","props":{"y":19,"x":1041,"stateNum":1,"skin":"create/btn_close.png","name":"close"}},{"type":"Button","props":{"y":498,"x":429,"var":"btnCreate","stateNum":1,"skin":"create/btn_create.png"}},{"type":"Image","props":{"y":17,"x":439,"skin":"create/create_title.png"}},{"type":"Label","props":{"y":168,"x":101,"text":"局数:","fontSize":32,"font":"SimHei","color":"#40210a"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.createViewUI.uiView);

        }

    }
}

module ui {
    export class disViewUI extends View {
		public btnRefuse:Laya.Button;
		public btnAgree:Laya.Button;
		public tim:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":360},"child":[{"type":"Image","props":{"y":0,"x":0,"width":600,"skin":"game/scale_bg.png","sizeGrid":"32,32,32,32","height":360}},{"type":"List","props":{"y":58,"x":128,"width":360,"spaceY":6,"repeatY":5,"repeatX":1,"height":200},"child":[{"type":"Box","props":{"y":0,"x":0,"name":"render"},"child":[{"type":"Sprite","props":{"y":0,"x":0,"name":"nick"}},{"type":"Label","props":{"y":4,"x":277,"text":"label","name":"status","fontSize":24,"color":"#391c05"}}]}]},{"type":"Button","props":{"y":282,"x":111,"var":"btnRefuse","stateNum":1,"skin":"game/btn1.png","scaleY":1,"scaleX":1,"labelSize":24,"labelColors":"white","label":"拒 绝"}},{"type":"Button","props":{"y":282,"x":370,"var":"btnAgree","stateNum":1,"skin":"game/btn2.png","scaleY":1,"scaleX":1,"labelSize":24,"labelColors":"white","label":"同 意"}},{"type":"Label","props":{"y":245,"x":201,"text":"剩余解散时间:","fontSize":24,"color":"#311a06"}},{"type":"Label","props":{"y":245,"x":366,"var":"tim","text":"00","fontSize":24,"color":"#311a06"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.disViewUI.uiView);

        }

    }
}

module ui {
    export class finViewUI extends View {
		public btnCon:Laya.Button;
		public list:Laya.List;
		public pnl:Laya.Panel;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"fin/fin_bg.png"}},{"type":"Button","props":{"y":573,"x":512,"var":"btnCon","stateNum":1,"skin":"fin/result_btn_con.png"}},{"type":"Image","props":{"y":164,"x":116,"skin":"fin/nn_fin_wj.png"}},{"type":"Image","props":{"y":173,"x":569,"skin":"fin/nn_fin_px.png"}},{"type":"Image","props":{"y":173,"x":753,"skin":"fin/nn_fin_df.png"}},{"type":"Image","props":{"y":4,"x":411,"skin":"fin/result_lose.png","name":"lose"}},{"type":"Image","props":{"y":7,"x":390,"skin":"fin/result_win.png","name":"win"}},{"type":"List","props":{"y":210,"x":329,"width":600,"var":"list","spaceY":4,"spaceX":0,"repeatY":5,"repeatX":1,"height":360}},{"type":"Panel","props":{"var":"pnl"},"child":[{"type":"Box","props":{"y":210,"x":329,"width":600,"name":"render","height":64},"child":[{"type":"Image","props":{"y":7,"x":55,"name":"nick"}},{"type":"Image","props":{"y":7,"x":234,"name":"bull"}},{"type":"Text","props":{"y":25,"x":433,"text":"text","name":"score","color":"#ffffff"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.finViewUI.uiView);

        }

    }
}

module ui {
    export class gameViewUI extends View {
		public deskInfo:Laya.Image;
		public btns:Laya.Sprite;
		public blocks:Laya.Sprite;
		public players:Laya.Sprite;
		public timer:Laya.Image;
		public fin:uiview.finView;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":640,"var":"deskInfo","skin":"game/toolbar.png","pivotX":200},"child":[{"type":"Label","props":{"y":10,"x":117,"text":"233223","strokeColor":"#0f5358","stroke":2,"name":"pwd","fontSize":22,"color":"#C9EFEC","bold":true}},{"type":"Label","props":{"y":9,"x":265,"text":"0","strokeColor":"#0f5358","stroke":2,"name":"cur","fontSize":22,"color":"#C9EFEC","bold":true}},{"type":"Label","props":{"y":9,"x":318,"text":"0","strokeColor":"#0f5358","stroke":2,"name":"total","fontSize":22,"color":"#C9EFEC","bold":true}},{"type":"Label","props":{"y":54,"x":200,"text":"1111","strokeColor":"#0f5358","stroke":2,"name":"option","fontSize":22,"color":"#C9EFEC","bold":true,"anchorY":0.5,"anchorX":0.5,"align":"center"}}]},{"type":"Sprite","props":{"y":480,"x":640,"width":32,"var":"btns","pivotY":16,"pivotX":16,"height":32},"child":[{"type":"Sprite","props":{"y":15,"x":15,"width":32,"visible":false,"pivotY":16,"pivotX":16,"name":"chips","height":32},"child":[{"type":"Button","props":{"y":5,"x":-221,"stateNum":1,"skin":"game/btn_x1.png","labelStrokeColor":"#000000","labelStroke":0,"labelSize":24,"labelColors":"white","label":"  万"}},{"type":"Button","props":{"y":7,"x":-3,"stateNum":1,"skin":"game/btn_x2.png","label":"条"}},{"type":"Button","props":{"y":7,"x":222,"stateNum":1,"skin":"game/btn_x3.png","label":"筒"}}]},{"type":"Sprite","props":{"y":25,"x":25,"width":32,"visible":false,"var":"blocks","pivotY":16,"pivotX":16,"height":32},"child":[{"type":"Button","props":{"y":5,"x":-221,"stateNum":1,"skin":"game/btn_x1.png","labelStrokeColor":"#000000","labelStroke":0,"labelSize":32,"labelColors":"red","label":"吃"}},{"type":"Button","props":{"y":5,"x":-92,"stateNum":1,"skin":"game/btn_x1.png","labelStrokeColor":"#000000","labelStroke":0,"labelSize":32,"labelColors":"red","label":"碰"}},{"type":"Button","props":{"y":3,"x":37,"stateNum":1,"skin":"game/btn_x1.png","labelStrokeColor":"#000000","labelStroke":0,"labelSize":32,"labelColors":"red","label":"杠"}},{"type":"Button","props":{"y":1,"x":190,"stateNum":1,"skin":"game/btn_x1.png","labelStrokeColor":"#000000","labelStroke":0,"labelSize":32,"labelColors":"red","label":"胡"}},{"type":"Button","props":{"y":2,"x":348,"stateNum":1,"skin":"game/btn_x1.png","labelStrokeColor":"#000000","labelStroke":0,"labelSize":32,"labelColors":"red","label":"过"}}]}]},{"type":"Sprite","props":{"var":"players"},"child":[{"type":"Image","props":{"y":225,"x":1148,"skin":"game/avatar_bg.png"},"child":[{"type":"Image","props":{"y":90,"x":8,"skin":"game/avatar_coin.png"}},{"type":"Image","props":{"y":-15,"x":81,"skin":"game/ntsign.png","name":"nt"}},{"type":"Sprite","props":{"y":15,"x":17,"width":64,"name":"head","height":64}},{"type":"Sprite","props":{"y":125,"x":-10,"name":"nick"}},{"type":"Text","props":{"y":89,"x":50,"text":"0","name":"money","fontSize":22,"color":"#ffffff"}}]},{"type":"Image","props":{"y":363,"x":37,"skin":"game/avatar_bg.png"},"child":[{"type":"Image","props":{"y":90,"x":8,"skin":"game/avatar_coin.png"}},{"type":"Image","props":{"y":-15,"x":81,"skin":"game/ntsign.png","name":"nt"}},{"type":"Sprite","props":{"y":15,"x":17,"width":64,"name":"head","height":64}},{"type":"Sprite","props":{"y":125,"x":-10,"name":"nick"}},{"type":"Text","props":{"y":89,"x":50,"text":"0","name":"money","fontSize":22,"color":"#ffffff"}}]},{"type":"Image","props":{"y":91,"x":40,"skin":"game/avatar_bg.png"},"child":[{"type":"Image","props":{"y":90,"x":8,"skin":"game/avatar_coin.png"}},{"type":"Image","props":{"y":-15,"x":81,"skin":"game/ntsign.png","name":"nt"}},{"type":"Sprite","props":{"y":15,"x":17,"width":64,"name":"head","height":64}},{"type":"Sprite","props":{"y":125,"x":-10,"name":"nick"}},{"type":"Text","props":{"y":89,"x":50,"text":"0","name":"money","fontSize":22,"color":"#ffffff"}}]},{"type":"Image","props":{"y":39,"x":985,"skin":"game/avatar_bg.png"},"child":[{"type":"Image","props":{"y":90,"x":8,"skin":"game/avatar_coin.png"}},{"type":"Image","props":{"y":-15,"x":81,"skin":"game/ntsign.png","name":"nt"}},{"type":"Sprite","props":{"y":15,"x":17,"width":64,"name":"head","height":64}},{"type":"Sprite","props":{"y":125,"x":-10,"name":"nick"}},{"type":"Text","props":{"y":89,"x":50,"text":"0","name":"money","fontSize":22,"color":"#ffffff"}}]}]},{"type":"Image","props":{"y":264,"x":571,"width":142,"var":"timer","skin":"game/turn_pos_bg.png","skewY":0,"skewX":0,"height":142},"child":[{"type":"Label","props":{"y":15,"x":20,"text":"label","name":"label","fontSize":24,"color":"#ffffff"}},{"type":"Label","props":{"y":15,"x":82,"text":"label","name":"timer","fontSize":24,"color":"#ffffff"}}]},{"type":"finView","props":{"visible":false,"var":"fin","runtime":"uiview.finView"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("uiview.finView",uiview.finView);

            super.createChildren();
            this.createView(ui.gameViewUI.uiView);

        }

    }
}

module ui {
    export class homeViewUI extends View {
		public btnRecord:Laya.Button;
		public btnAct:Laya.Button;
		public btnShare:Laya.Button;
		public btnSet:Laya.Button;
		public btnReport:Laya.Button;
		public btnRule:Laya.Button;
		public btnJoin:Laya.Button;
		public btnCreate:Laya.Button;
		public viewCreate:uiview.home.createView;
		public viewInput:uiview.home.inputView;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"home/main_BJ.png"}},{"type":"Image","props":{"y":12,"x":416,"skin":"home/logo.png","scaleY":0.5,"scaleX":0.5}},{"type":"Image","props":{"y":720,"x":640,"skin":"home/main_menu.png","pivotY":73,"pivotX":620,"name":"menu"},"child":[{"type":"Button","props":{"y":-48,"x":113,"width":106,"var":"btnRecord","stateNum":1,"skin":"home/hall_vedio.png","height":102}},{"type":"Button","props":{"y":-48,"x":413,"var":"btnAct","stateNum":1,"skin":"home/hall_notice.png"}},{"type":"Button","props":{"y":-49,"x":712,"var":"btnShare","stateNum":1,"skin":"home/hall_share.png"}},{"type":"Button","props":{"y":-630,"x":1153,"var":"btnSet","stateNum":1,"skin":"home/hall_setting.png"}},{"type":"Button","props":{"y":-63,"x":1013,"var":"btnReport","stateNum":1,"skin":"home/hall_service.png"}},{"type":"Button","props":{"y":-630,"x":1055,"var":"btnRule","stateNum":1,"skin":"home/hall_rule.png"}}]},{"type":"Button","props":{"y":168,"x":800,"var":"btnJoin","stateNum":1,"skin":"home/main_btn_join.png"}},{"type":"Button","props":{"y":155,"x":404,"var":"btnCreate","stateNum":1,"skin":"home/main_btn_create.png"}},{"type":"createView","props":{"y":45,"x":97,"visible":false,"var":"viewCreate","runtime":"uiview.home.createView"}},{"type":"inputView","props":{"y":27,"x":210,"visible":false,"var":"viewInput","runtime":"uiview.home.inputView"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("uiview.home.createView",uiview.home.createView);
			View.regComponent("uiview.home.inputView",uiview.home.inputView);

            super.createChildren();
            this.createView(ui.homeViewUI.uiView);

        }

    }
}

module ui {
    export class inputViewUI extends View {
		public text:laya.display.Text;

        public static  uiView:any ={"type":"View","props":{"width":900,"height":640},"child":[{"type":"Image","props":{"y":12,"x":2,"width":880,"skin":"input/scale_bg.png","sizeGrid":"32,32,32,32","height":620}},{"type":"Button","props":{"y":484,"x":342,"stateNum":1,"skin":"input/btn_blue.png","labelSize":24,"labelColors":"white","label":"0"}},{"type":"Button","props":{"y":226,"x":129,"stateNum":1,"skin":"input/btn_blue.png","labelSize":24,"labelColors":"white","label":"1"}},{"type":"Button","props":{"y":226,"x":342,"stateNum":1,"skin":"input/btn_blue.png","labelSize":24,"labelColors":"white","label":"2"}},{"type":"Button","props":{"y":226,"x":555,"stateNum":1,"skin":"input/btn_blue.png","labelSize":24,"labelColors":"white","label":"3"}},{"type":"Button","props":{"y":312,"x":129,"stateNum":1,"skin":"input/btn_blue.png","labelSize":24,"labelColors":"white","label":"4"}},{"type":"Button","props":{"y":312,"x":342,"stateNum":1,"skin":"input/btn_blue.png","labelSize":24,"labelColors":"white","label":"5"}},{"type":"Button","props":{"y":312,"x":555,"stateNum":1,"skin":"input/btn_blue.png","labelSize":24,"labelColors":"white","label":"6"}},{"type":"Button","props":{"y":398,"x":129,"stateNum":1,"skin":"input/btn_blue.png","labelSize":24,"labelColors":"white","label":"7"}},{"type":"Button","props":{"y":398,"x":342,"stateNum":1,"skin":"input/btn_blue.png","labelSize":24,"labelColors":"white","label":"8"}},{"type":"Button","props":{"y":398,"x":555,"stateNum":1,"skin":"input/btn_blue.png","labelSize":24,"labelColors":"white","label":"9"}},{"type":"Button","props":{"y":484,"x":129,"stateNum":1,"skin":"input/btn_blue.png","labelSize":24,"labelColors":"white","label":"删除"}},{"type":"Button","props":{"y":484,"x":555,"stateNum":1,"skin":"input/btn_blue.png","labelSize":24,"labelColors":"white","label":"重输"}},{"type":"Text","props":{"y":127,"x":360,"var":"text","valign":"middle","fontSize":48,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Button","props":{"y":8,"x":842,"stateNum":1,"skin":"input/btn_close.png","name":"close"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.inputViewUI.uiView);

        }

    }
}

module ui {
    export class loginViewUI extends View {
		public btnLogin:Laya.Button;
		public input:Laya.TextInput;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"login/login_bg.png"}},{"type":"Button","props":{"y":533,"x":637,"width":247,"var":"btnLogin","stateNum":1,"skin":"login/btn_login.png","pivotY":30,"pivotX":100,"height":77}},{"type":"Image","props":{"y":149,"x":234,"skin":"login/logo.png"}},{"type":"TextInput","props":{"y":523,"x":347,"var":"input","text":"TextInput","skin":"comp/textinput.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.loginViewUI.uiView);

        }

    }
}
