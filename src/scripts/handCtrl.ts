module script {
    export class handCtrl extends Laya.Script {
        hand: Laya.Sprite3D;
        view: number;

        camera: Laya.Camera;
        _outHitInfo: Laya.RaycastHit;
        point: Laya.Vector2 = new Laya.Vector2();
        ray: Laya.Ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));

        startIdx = 0;
        que = -1;
        locked = false;
        constructor() {
            super();
        }
        _load(own) {
            this.hand = own;

        }

        setView(v: number) {
            this.view = v;
            if (v == 1) {
                this.camera = this.hand.parent.getChildByName("Main Camera") as Laya.Camera;
                this._outHitInfo = new Laya.RaycastHit();
                Laya.stage.on(Laya.Event.DOUBLE_CLICK, this, this.hitCtrl);
            }
            // console.log(this.hand.transform.localRotationEuler + " " + this.hand.transform.rotationEuler);
            // var vec = this.hand.transform.localRotationEuler;
            // this.hand.transform.localRotationEuler = new Vector3(vec.x, vec.y, vec.z);
        }

        addCards(data) {
            for (let i = 0; i < data.length; ++i) {
                this.addCard(data[i]);
            }
        }

        addCard(o: Laya.Sprite3D) {
            let idx = this.startIdx;
            for (; idx < this.hand.numChildren; ++idx) {
                if (this.getValByName(o) < this.getValByName(this.hand.getChildAt(idx))) {
                    break;
                }
            }
            this.slideChildren(idx, 0.03);
            o.transform.localPosition = new Vector3(-idx * 0.03 - Math.floor(this.startIdx / 3) * 0.01, 0, 0);   //这里x全部取负
            o.transform.localRotationEuler = new Vector3(0, 0, 0);
            this.hand.addChild(o);
            this.hand.setChildIndex(o, idx);
            o.layer = Laya.Layer.getLayerByNumber(this.view === 1 ? 1 : 0);
        }

        //瞎往后放一张(背面)
        justAddCard(o: Laya.Sprite3D) {
            let idx = this.hand.numChildren;
            this.hand.addChild(o);
            o.transform.localRotationEuler = new Vector3(0, 0, 0);
            o.transform.localPosition = new Vector3(-idx * 0.03 - Math.floor(this.startIdx / 3) * 0.01, 0, 0);   //这里x全部取负


            o.layer = Laya.Layer.getLayerByNumber(0);
        }

        removeCard(val): Laya.Sprite3D {
            var o: Laya.Sprite3D = undefined;
            let idx = this.startIdx;
            for (; idx < this.hand.numChildren; ++idx) {
                if (this.getValByName(this.hand.getChildAt(idx)) == val) {
                    o = this.hand.removeChildAt(idx) as Laya.Sprite3D;
                    break;
                }
            }
            if (idx < this.hand.numChildren)
                this.slideChildren(idx, -0.03);
            return o;
        }

        addOneBlock(os: Laya.Sprite3D[], back = false) {
            if (os.length == 1) {
                //补杠
                for (let i = 0; i < this.startIdx; ++i) {
                    if (this.getValByName(this.hand.getChildAt(i)) == this.getValByName(os[0])) {
                        this.hand.getChildAt(i + 1).addChild(os[0]);
                        os[0].layer = Laya.Layer.getLayerByNumber(0);
                        os[0].transform.localRotationEuler = new Vector3();
                        os[0].transform.localPosition = new Vector3(0, 0, 0.02);
                        return;
                    }
                }
            }
            for (let i = 0; i < 3; ++i) {
                let idx = this.startIdx + i;
                os[i].transform.localPosition = new Vector3(- idx * 0.03 - Math.floor(this.startIdx / 3) * 0.01, 0, 0);   //这里x全部取负
                os[i].transform.localRotationEuler = new Vector3(this.view == 1 ? 30 : 90, 0, 0);
                this.hand.addChild(os[i]);
                this.hand.setChildIndex(os[i], idx);
                os[i].layer = Laya.Layer.getLayerByNumber(0);
            }
            if (os.length == 4) {
                os[1].addChild(os[3]);
                os[3].layer = Laya.Layer.getLayerByNumber(0);
                os[3].transform.localRotationEuler = new Vector3();
                os[3].transform.localPosition = new Vector3(0, 0, 0.02);
            }
            this.startIdx += 3;
            this.slideChildren(this.startIdx, 0.1);     //0.03*3+0.01
        }

        getValByName(o): number {
            return parseInt(o.name.substr(3));
        }

        getChildByVal(val): number {
            for (let i = 0; i < this.hand.numChildren; ++i) {
                if (this.getValByName(this.hand.getChildAt(i)) == val) {
                    return i;
                }
            }
            return -1;
        }

        hitCtrl() {
            if (this.locked)
                return;
            this.point.elements[0] = Laya.MouseManager.instance.mouseX;
            this.point.elements[1] = Laya.MouseManager.instance.mouseY;
            this.camera.viewportPointToRay(this.point, this.ray);
            Laya.Physics.rayCast(this.ray, this._outHitInfo, 10, 1);
            if (this._outHitInfo.distance != -1) {
                var o = this._outHitInfo.sprite3D;
                //var pos = o.transform.localPosition;
                game.gameClient.instance.reqOutCard(this.getValByName(o));
                //o.transform.translate(new Vector3(0, 0.005*(pos.y==0?1:-1), 0));
            }
        }

        slideChildren(idx, offset) {
            for (let i = idx; i < this.hand.numChildren; ++i) {
                (this.hand.getChildAt(i) as Laya.Sprite3D).transform.translate(new Vector3(-offset, 0, 0));
            }
        }

        setQue(val) {

        }


    }
}