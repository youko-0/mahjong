module network {
    export class ws {
        _ws: WebSocket;
        public OnMessage;
        public OnOpen;
        public OnClose;
        constructor(url: string = "ws://127.0.0.1:6002") {
            this._ws = new WebSocket(url);
            this._ws.addEventListener("message", (ev: MessageEvent) => {
                var da = JSON.parse(ev.data);
                if (da.head.bMainID !== 1 && da.head.bAssistantID !== 1) {
                    console.log(ev.data);
                }
                if (this.OnMessage != null) {
                    this.OnMessage(da);
                }
            });
            this._ws.addEventListener("open", () => {
                console.log("ws opened!");
                if (this.OnOpen != null) {
                    this.OnOpen();
                }
            }, false);
            this._ws.addEventListener("close", (e) => {
                console.log("Connection closed" + e.code + " " + e.reason);
                if (this.OnClose != null) {
                    this.OnClose();
                }
            }, false);
        }

        Send(mainId: number, assId: number, d, handleCode = 0, messageSize = 1) {
            var data = {
                uMessageSize: messageSize,
                bMainID: mainId,
                bAssistantID: assId,
                bHandleCode: handleCode,
                bReserve: 0,
                data: JSON.stringify(d)
            }
            this._ws.send(JSON.stringify(data));
        }

        SendEmpty(mainId: number, assId: number, handleCode = 0) {
            var data = {
                uMessageSize: 0,
                bMainID: mainId,
                bAssistantID: assId,
                bHandleCode: handleCode,
                bReserve: 0
            }
            this._ws.send(JSON.stringify(data));
        }

        Close() {
            this._ws.close();
        }
    }
}