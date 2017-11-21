module uiview.home {
    export class inputView extends ui.inputViewUI {
        constructor() {
            super();
            for (let i = 1; i < 11; ++i) {
                this.getChildAt(i).on(Laya.Event.CLICK, this, () => {
                    var len = this.text.text.length;
                    if (len >= 6) {
                        return;
                    }
                    this.text.text += i-1;
                    if (len == 5) {
                        homeView.instance.joinDesk(this.text.text);
                    }
                })
            }
            this.getChildAt(11).on(Laya.Event.CLICK, this, () => {
                var str = this.text.text;
                if (str.length <= 0)
                    return;
                this.text.text = str.substr(0, str.length - 1);
            });
            this.getChildAt(12).on(Laya.Event.CLICK, this, () => {
                this.text.text = "";
            });
        }
    }
}