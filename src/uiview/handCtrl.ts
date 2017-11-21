module script {
    export class handCtrl extends Laya.Script {
        hand: Laya.Sprite3D;
        view: number;
        startX = 0;
        constructor() {
            super();
        }
        _load(own) {
            this.hand = own;
        }

        setView(v: number) {
            this.view = v;
            if (v === 1) {
                
            }
        }

        addCards(data) {
            for (let i = 0; i < data.length; ++i) {

            }
        }

        addCard(o: Laya.Sprite3D) {
            let idx = 0;
            for (; idx < this.hand.numChildren; ++idx) {
                if (this.getValByName(o) < this.getValByName(this.hand.getChildAt(idx))) {
                    break;
                }
            }
            for (let i = idx; i < this.hand.numChildren; ++i) {
                (this.hand.getChildAt(i) as Laya.Sprite3D).transform.translate(new Vector3(0.03, 0, 0));
            }
            o.transform.localPosition = new Vector3(-this.startX - idx * 0.03, 0, 0);   //因为要转180度,这里x全部取负
            o.transform.localRotationEuler = new Vector3(0, 180, 0);  //朝向反的
            this.hand.addChild(o);
            this.hand.setChildIndex(o, idx);
        }

        getValByName(o): number {
            return parseInt(o.name.substr(3));
        }
    }
}