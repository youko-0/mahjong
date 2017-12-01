module script {
    export class outCtrl extends Laya.Script {
        out: Laya.Sprite3D;
        constructor() {
            super();
        }

        _load(own) {
            this.out = own;
        }

        _start() {

        }

        addCard(o: Laya.Sprite3D) {
            if (o == undefined) {
                console.log("find card error");
                return;
            }
            o.transform.localPosition = new Vector3((this.out.numChildren % 7 - 4) * 0.03, 0, 0);
            o.transform.localRotationEuler = new Vector3(-90, 0, 180);
            this.out.addChild(o);
        }

        getLastOutCard(): Laya.Sprite3D {

            return this.out.removeChildAt(this.out.numChildren - 1) as Laya.Sprite3D;
        }
    }
}