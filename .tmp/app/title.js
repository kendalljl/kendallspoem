/// <reference path='../../typings/index.d.ts' />
angular
    .module('app')
    .component('fountainTitle', {
    templateUrl: 'app/title.html'
});
var currentMoodVal;
var currentMoodDesc;
var currentMoodPoem;
$(document).ready(function () {
    document.getElementById('file-selector').addEventListener('change', function () {
        document.getElementById('headerf').innerHTML = 'Connecting to space satellites...';
        document.getElementById('headers').innerHTML = 'Shouldnt take too long';
        processImg(function (file) {
            sendEmotionReq(file, function (emotionScores) {
                currentMoodDesc = getCurrentMood(emotionScores);
                currentMoodPoem = sendPoemReq(currentMoodDesc);
                updateUI();
            });
        });
    });
});
function processImg(callback) {
    var imgSelect = $('#file-selector')[0];
    var file = imgSelect.files[0];
    var imgReader = new FileReader();
    if (file) {
        imgReader.readAsDataURL(file);
    }
    else {
        console.log('No good');
    }
    imgReader.onloadend = function () {
        if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
            document.getElementById('headerf').innerHTML = 'Whoops! we only accept image files here';
            longtextstyle();
            document.getElementById('headers').innerHTML = 'Valid file types are: jpg, jpeg & png';
        }
        else {
            callback(file);
        }
    };
}
function sendEmotionReq(file, callback) {
    $.ajax({
        url: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
        beforeSend: function (emoteHdrs) {
            emoteHdrs.setRequestHeader('Content-Type', 'application/octet-stream');
            emoteHdrs.setRequestHeader('Ocp-Apim-Subscription-Key', 'f601d06265de4683bd55390c682a3916');
        },
        type: 'POST',
        data: file,
        processData: false
    })
        .done(function (data) {
        if (data.length === 0) {
            document.getElementById('headerf').innerHTML = 'We couldnt find any faces in that photo :(';
            document.getElementById('headers').innerHTML = 'Try again with a different photo?';
            longtextstyle();
        }
        else {
            var scores = data[0].scores;
            callback(scores);
        }
    })
        .fail(function (error) {
        document.getElementById('headerf').innerHTML = 'Oh no, something went wrong on our end!';
        document.getElementById('headers').innerHTML = 'Give it another try soon :)';
        longtextstyle();
        console.log(error.getAllResponseHeaders());
    });
}
function sendPoemReq(currentMoodDesc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            var xmlresp = this.responseXML;
            currentMoodPoem = xmlresp.getElementsByTagName('poem')[0].childNodes[0].nodeValue;
            document.getElementById('headers').innerHTML = currentMoodPoem;
            document.getElementById('headers').style.fontSize = '2rem';
        }
    };
    xhttp.open('GET', 'http://www.stands4.com/services/v2/poetry.php?uid=5341&tokenid=exMiPJwO89aeOkfk&term=' + currentMoodDesc, true);
    xhttp.send();
}
function getCurrentMood(scores) {
    currentMoodVal = scores.neutral;
    currentMoodDesc = 'neutral';
    if (scores.happiness > currentMoodVal) {
        currentMoodVal = scores.happiness;
        currentMoodDesc = 'happiness';
    }
    else if (scores.sadness > currentMoodVal) {
        currentMoodVal = scores.sadness;
        currentMoodDesc = 'sad';
    }
    else if (scores.anger > currentMoodVal) {
        currentMoodVal = scores.anger;
        currentMoodDesc = 'angry';
    }
    else if (scores.contempt < currentMoodVal) {
        currentMoodVal = scores.contempt;
        currentMoodDesc = 'contempt';
    }
    else if (scores.disgust < currentMoodVal) {
        currentMoodVal = scores.disgust;
        currentMoodDesc = 'disgusted';
    }
    else if (scores.fear < currentMoodVal) {
        currentMoodVal = scores.fear;
        currentMoodDesc = 'scared';
    }
    else if (scores.suprise < currentMoodVal) {
        currentMoodVal = scores.suprise;
        currentMoodDesc = 'suprised';
    }
    return currentMoodDesc;
}
function longtextstyle() {
    document.getElementById('headerf').style.fontSize = '4rem';
    document.getElementById('headers').style.fontSize = '3rem';
}
function updateUI() {
    document.getElementById('headerf').innerHTML = 'We have detected you are feeling: ' + currentMoodDesc;
    document.getElementById('headerf').style.fontSize = '4rem';
}
