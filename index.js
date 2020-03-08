function upLoader(files) {
    var num = 0;
    // var fileBox = []

    function uploadFile() {
        if (!files[num]) {
            return
        }
        if (files[num].type !== "image/png") {
            num++;
            alert("does not match")
            return uploadFile(files[num]);
        }
        // else {
        // }
        var uploadProgress = document.createElement("progress");
        var aboutNameBox = document.createElement("p");
        var aboutBox = document.createElement("p");
        var body = document.getElementById("body")
        var div = document.createElement('div')
        div.classList.add("div");
        uploadProgress.classList.add("uploadProgress");
        body.appendChild(div);
        div.appendChild(uploadProgress);
        var resp = new XMLHttpRequest(),
        fd = new FormData();
        fd.append('file', files);
        var asd = files[num].name;
        var fileName = document.createTextNode(asd);
        div.appendChild(aboutBox);
        div.appendChild(aboutNameBox);
        aboutNameBox.appendChild(fileName);
        var uploadBtn = document.getElementById("uploadBtn")
        resp.upload.onloadstart = function (e) {
            uploadProgress.value = 0;
            uploadProgress.max = e.total;
            var percent = Math.round(((uploadProgress.value / uploadProgress.max) * 100)) + "%";
            var percentSize = document.createTextNode(percent);
            aboutBox.appendChild(percentSize);
        }
        resp.upload.onprogress = function (e) {
            uploadProgress.value = e.loaded;
            uploadProgress.max = e.total;
            aboutBox.innerHTML = Math.round(((uploadProgress.value / uploadProgress.max) * 100)) + "%";;
        }
        resp.upload.onloadend = function () {
            num++
            if (num < files.length) {
                uploadFile(files[num])
            }
        }
        resp.open('POST', 'http://ip.aparg.com:7007/uploader', true);
        resp.send(fd)
    }
    uploadFile(files[num])
}
ondrop = function (e) {
    upLoader(e.dataTransfer.files)
}
uploadInput.addEventListener('change', function () {
    var uploadInput = document.getElementById("uploadInput")
    upLoader(uploadInput.files)
})
