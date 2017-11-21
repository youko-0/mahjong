module game {
    export class cardSp extends Laya.Sprite {
        bBack: boolean;
        val: number;
        idx: number;
        constructor(val, bBack, idx) {
            super();
            this.val = val;
            this.bBack = bBack;
            this.idx = idx;
            if (bBack) {
                this.graphics.drawTexture(Laya.loader.getRes("cards/poker_back.png"));
            } else {
                this.graphics.drawTexture(Laya.loader.getRes("cards/poker_bg.png"));
                this.drwaVal();
            }
            this.pivot(32, 44);
            //发牌动画
        }

        drwaVal() {
            var kind = (this.val & 0xf0) >> 4;
            var spKind = new Laya.Sprite();
            spKind.graphics.drawTexture(Laya.loader.getRes("cards/kind_" + kind + ".png"));
            spKind.pos(16, 32);
            this.addChild(spKind);
            var spVal = new Laya.Sprite();
            spVal.graphics.drawTexture(Laya.loader.getRes((kind % 2 == 0 ? "cards/r_" : "cards/b_") + (this.val & 0x0f) + ".png"));
            spVal.pos(8, 6);
            this.addChild(spVal);
        }

        flip() {
            if (this.bBack) {
                Laya.Tween.to(this, { scaleX: 0 }, 200, null, Laya.Handler.create(this, this._flip),this.idx*100);
                this.bBack = false;
            }
        }
        private _flip() {
            this.drwaVal();
            this.graphics.drawTexture(Laya.loader.getRes("cards/poker_bg.png"));
            var offset = this.idx>2?20:0;
            var dstX = this.x+offset;
            Laya.Tween.to(this, { scaleX: 1,x:dstX }, 200, Laya.Ease.linearNone);
        }


    }
}