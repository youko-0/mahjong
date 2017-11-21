module game {
    export class player extends Laya.Node {
        private _owner:Laya.Node;
        private _no;
        head: Laya.Sprite = null;
        status: Laya.Sprite = null;
        constructor() {
            super();
            console.log("player init");
        }

        set owner(v){
            this._owner = v;
            console.log(this._owner==null);
            console.log(this._no);
        }

        set no(n:number){
            this._no = n;
        }

        get no(){
            return this._no;
        }

        setHead(uri:string){
            //this.head.graphics.clear();
            this.head.loadImage(uri);
        }


    }
}