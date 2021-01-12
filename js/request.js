var get = function (url) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4)
                if (request.status == 200)
                    resolve(JSON.parse(request.responseText));

                else {
                    console.log(request.readyState);
                    reject(request);
                }
        }
        request.open("GET", url);
        request.send();

    })
}
var post = function (url, formdata) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4)
                if (request.status == 201)
                    resolve(JSON.parse(request.responseText));
                else {
                    console.log(request.readyState);
                    reject(request);
                }
        }
        request.open("POST", url);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(formdata);

    })
}


export { get, post };