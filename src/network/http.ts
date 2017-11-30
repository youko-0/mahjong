module network {
    export class http {
        public static webRoot: string = "http://192.168.1.109:8001";
        public static getUrl(url: string, fn): void {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                var response = xhr.responseText.replace(/\'/g, "\"");
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    fn(JSON.parse(response));
                }
            };
            if (url.indexOf("http") < 0) {
                url = this.webRoot + "/" + url;
            }
            console.log("http req url:" + url);
            xhr.open("GET", url, true);
            xhr.send();
        }

        public static postUrl(url, fn, param = "") {
            var xhr = new XMLHttpRequest();
            if (url.indexOf("http") < 0) {
                url = this.webRoot + "/" + url;
            }
            console.log("http req url:" + url);
            xhr.onreadystatechange = function () {
                var response = xhr.responseText.replace(/\'/g, "\"");
                console.log(response);
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                    fn(JSON.parse(response));
                }
            };
            xhr.open("POST", url);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(param);

        }

        public static pushValue(url: string, key, value): void {
            if (url.lastIndexOf("?") != url.length - 1) {
                url += "&";
            }
            url += key + "=" + value;
        }
    }
}