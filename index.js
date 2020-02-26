function upLoader() {
    var uploadInput = document.getElementById("uploadInput")
    var uploadPlace = document.getElementById("loadPlace")
    var uploadProgress = document.getElementById("uploadProgress")

    uploadInput.addEventListener('change', function () {
        var asd = new XMLHttpRequest(),
         fd = new FormData();

        fd.append('file',uploadInput.files[0]);

        asd.upload.onloadstart = function (e) {
            uploadProgress
            uploadPlace.append(uploadProgress)
            uploadProgress.value = 0;
            uploadProgress.max = e.total;
        }
        asd.upload.onprogress = function (e) {
            uploadProgress.value = e.loaded;
            uploadProgress.max = e.total;
        }
        asd.upload.onloadend = function (e) {
            console.log("great")
        }
        asd.open('POST', 'http://ip.aparg.com:7007/uploader',true);
        asd.send(fd)    
    })
}       
upLoader()