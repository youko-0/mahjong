module uiview {
    export class popView extends Laya.View {
        constructor() {
            super();
            var close = this.getChildByName("close") as Laya.Button;
            if (close != null) {
                close.on(Laya.Event.CLICK, this, () => {
                    this.visible = false;
                })
            }
        }
    }
}