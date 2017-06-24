const cookie = require('react-cookie');
const axios = require('axios');

// handle user media capture
export function captureUserMedia(callback) {
    var params = { audio: false, video: true };

    navigator.getUserMedia(params, callback, (error) => {
        alert(JSON.stringify(error));
    });
};

// handle S3 upload
function getSignedUrl(file) {

    let queryString = '?objectName=' + file.id + '&contentType=' + encodeURIComponent(file.type);
    return fetch('http://localhost:3000/s3/sign' + queryString)
        .then((response) => {
            console.log("res", response)
            return response.json();
        })
        .catch((err) => {
            console.log('error: ', err)
        })
}

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();

    if (xhr.withCredentials != null) {
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest !== "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }

    return xhr;
};

export function S3Upload(fileInfo) { //parameters: { type, data, id }
    return new Promise((resolve, reject) => {
        console.log("file-info: ", fileInfo);
        getSignedUrl(fileInfo)
            .then((s3Info) => {
                console.log("s3Info", s3Info);
                // upload to S3
                var xhr = createCORSRequest('PUT', s3Info.signedUrl);

                xhr.onload = function () {
                    if (xhr.status === 200) {
                        console.log(xhr.status)
                        resolve(true);
                    } else {
                        console.log(xhr.status)

                        reject(xhr.status);
                    }
                };

                const lookLink = s3Info.publicUrl;
                const user = cookie.load('user');
                const emailQuery = user.email;
                const id = user._id;
                axios.put('http://localhost:3000/api/user/update-looks', {
                    emailQuery: emailQuery,
                    lookLink: lookLink,
                    _id: id
                },
                    { headers: { Authorization: cookie.load('token') } })
                    .then((response) => {
                        cookie.save('token', response.data.token, { path: '/' });
                        cookie.save('user', response.data.user, { path: '/' });
                        // window.location.href = 'http://localhost:8080/my-profile';
                    })
                    .catch((error) => {
                        console.log(error);
                    });


                xhr.setRequestHeader('Content-Type', fileInfo.type);
                xhr.setRequestHeader('x-amz-acl', 'public-read');

                return xhr.send(fileInfo.data);
            })
    })

}

export function S3Download(fileInfo) { //parameters: { type, data, id }
    return new Promise((resolve, reject) => {
        console.log("file-info: ", fileInfo);
        getSignedUrl(fileInfo)
            .then((s3Info) => {
                console.log("s3Info", s3Info);
                // upload to S3
                var xhr = createCORSRequest('GET', s3Info.signedUrl);

                xhr.onload = function () {
                    if (xhr.status === 200) {
                        console.log(xhr.status)
                        resolve(true);
                    } else {
                        console.log(xhr.status)

                        reject(xhr.status);
                    }
                };

                xhr.setRequestHeader('Content-Type', fileInfo.type);
                xhr.setRequestHeader('x-amz-acl', 'public-read');

                return xhr.send(fileInfo.data);
            })
    })
}
