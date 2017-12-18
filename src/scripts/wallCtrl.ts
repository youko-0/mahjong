module script {
    export class wallCtrl extends Laya.Script {
        wall: Laya.Sprite3D;
        constructor() {
            super();
        }

        _load(own) {
            this.wall = own;
        }

        _start() {
            this.makeWall();
        }

        //一次性创建136张牌,后续仅仅调整牌的位置
        public makeWall() {
            var box = this.wall.parent.getChildByName("box");
            var _scale = this.wall.transform.scale.x;
            var offset = 0.3 * _scale
            for (let i = 0; i < 136; ++i) {
                var idx = Math.floor(i / 4);
                var sp = Laya.Sprite3D.instantiate(box.getChildAt(idx) as Laya.Sprite3D, this.wall, false);
            }
            //这里其实不需要摆出来,测试用的
            //this.sortChildren();
        }

        getValByIdx(idx) {
            return this.wall.getChildAt(idx).name.substr(3);
        }

        getChildByVal(val): number {
            for (let i = 0; i < this.wall.numChildren; ++i) {
                if (this.wall.getChildAt(i).name.substr(3) == val)
                    return i;
            }
            return -1;
        }

        //用于在一局结束后将所有牌回收
        pushCards(children) {
            this.wall.addChildren(children);
        }

        //这里改变的是子节点的index,后续直接根据index计算位置
        //顺便这个setChildIndex还真好用
        sortWalls(data) {
            for (let i = 0; i < data.length; ++i) {
                for (let j = i; j < this.wall.numChildren; ++j) {
                    if (this.getValByIdx(j) == data[i]) {
                        if (j != i) {
                            this.wall.setChildIndex(this.wall.getChildAt(j), i);
                        }
                        break;
                    }
                }
            }
            this.sortChildren();
        }

        //对牌墙下的所有子节点根据索引计算摆放位置
        sortChildren() {
            var offset = 0.3;
            for (let i = 0; i < this.wall.numChildren; ++i) {
                var sp = this.wall.getChildAt(i) as Laya.Sprite3D;
                var view = Math.floor(i / 34);
                //transform.rotate是在原先旋转的基础上继续旋转,因为会多次计算位置,直接设置旋转角
                sp.transform.localRotationEuler = new Vector3(-90, (view - 1) * 90, 0);
                var dstX = 0.03 * (Math.floor(i / 2) % 17 - 8.5);
                var pos = new Vector3();
                pos.y = (i % 2) * 0.02;   //(i+1)%2
                switch (view) {
                    case 0:
                        pos.x = -offset * game.gameInfo.ratio;
                        pos.z = -dstX;
                        break;
                    case 1:
                        pos.x = dstX;
                        pos.z = -offset;
                        break;
                    case 2:
                        pos.x = offset * game.gameInfo.ratio;
                        pos.z = dstX;
                        break;
                    case 3:
                        pos.x = -dstX;
                        pos.z = offset;
                        break;
                }
                //translate同理,注意是local,会受父节点transform的影响
                sp.transform.localPosition = pos;
                //sp.transform.translate(pos, false);
            }
        }
    }
}