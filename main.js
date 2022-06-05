var endpoint = "https://api.jsonbin.io/v3/b/629c8850449a1f3821fe5af7";

function geturl() {
    var url = document.getElementById("urlinput").value;
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    if (!protocol_ok) {
        newurl = "http://" + url;
        return newurl;
    } else {
        return url;
    }
}

function getrandom() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function genhash() {
    if (window.location.hash == "") {
        window.location.hash = getrandom();
    }
}

function send_request(url) {
    window.url = url;
    let hash;
    fetch(endpoint + '/latest', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-key': '$2b$10$UYC5zLo/WSCotxdhCC0ciejNIIDGx1RT326YCHOQq8apEukp5bAxG',
        }
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        window.data = data.record;


        if (!window.data[window.url]) {
            let random = getrandom();
            window.data[url] = random;
            window.data[random] = url;
            fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': '$2b$10$UYC5zLo/WSCotxdhCC0ciejNIIDGx1RT326YCHOQq8apEukp5bAxG'
                },
                body: JSON.stringify(window.data)
            })
                .then(res => res.json())
                .then(json => {
                    document.getElementById('shortURL').innerHTML = "Short URL is: " + window.location.href + '#' + json.record[url];
                });
        }
        else {
            document.getElementById('shortURL').innerHTML = "Your short URL is: " + window.location.host + '/#' + window.data[url];
        }
    });
}

function shorturl() {
    var longurl = geturl();
    send_request(longurl);
}

var hashh = window.location.hash.substring(1)
console.log(hashh);
if (window.location.hash != "") {
    fetch(endpoint + '/latest', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': '$2b$10$UYC5zLo/WSCotxdhCC0ciejNIIDGx1RT326YCHOQq8apEukp5bAxG'
        }
    })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            if (json.record[hashh]) {
                window.location.href = json.record[hashh];
            }
            else {
                document.getElementById('shortURL').innerHTML = "Invalid URL";
            }
        });
}

