/* ==========================================
   SHOW UPLOADED IMAGE
* ========================================== */
function readURL(input, imageResultId) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#' + imageResultId)
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

$(function () {
    $('#upload').on('change', function () {
        readURL(this, 'imageResult');
    });

    $('#upload1').on('change', function () {
        readURL(this, 'imageResult1');
    });
});

/* ==========================================
   SHOW UPLOADED IMAGE NAME
* ========================================== */
var input = document.getElementById('upload');
var infoArea = document.getElementById('upload-label');
input.addEventListener('change', function (event) {
    showFileName(event, infoArea);
});

var input1 = document.getElementById('upload1');
var infoArea1 = document.getElementById('upload-label1');
input1.addEventListener('change', function (event) {
    showFileName(event, infoArea1);
});

function showFileName(event, infoArea) {
    var input = event.srcElement;
    var fileName = input.files[0].name;
    infoArea.textContent = 'File name: ' + fileName;
}
