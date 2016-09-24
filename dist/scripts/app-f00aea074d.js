/// <reference path="../typings/index.d.ts" />
function processImg(e){var n=$("#file-selector")[0],t=n.files[0],o=new FileReader;t?o.readAsDataURL(t):console.log("No good"),o.onloadend=function(){t.name.match(/\.(jpg|jpeg|png)$/)?e(t):(document.getElementById("headerf").innerHTML="Whoops! we only accept image files here",longtextstyle(),document.getElementById("headers").innerHTML="Valid file types are: jpg, jpeg & png")}}function sendEmotionReq(e,n){$.ajax({url:"https://api.projectoxford.ai/emotion/v1.0/recognize",beforeSend:function(e){e.setRequestHeader("Content-Type","application/octet-stream"),e.setRequestHeader("Ocp-Apim-Subscription-Key","f601d06265de4683bd55390c682a3916")},type:"POST",data:e,processData:!1}).done(function(e){if(0===e.length)document.getElementById("headerf").innerHTML="We couldnt find any faces in that photo :(",document.getElementById("headers").innerHTML="Try again with a different photo?",longtextstyle();else{var t=e[0].scores;n(t)}}).fail(function(e){document.getElementById("headerf").innerHTML="Oh no, something went wrong on our end!",document.getElementById("headers").innerHTML="Give it another try soon :)",longtextstyle(),console.log(e.getAllResponseHeaders())})}function sendPoemReq(e){var n=new XMLHttpRequest;n.onreadystatechange=function(){if(4===this.readyState){var e=this.responseXML;currentMoodPoem=e.getElementsByTagName("poem")[0].childNodes[0].nodeValue,document.getElementById("headers").innerHTML=currentMoodPoem,document.getElementById("headers").style.fontSize="2rem"}},n.open("GET","http://www.stands4.com/services/v2/poetry.php?uid=5341&tokenid=exMiPJwO89aeOkfk&term="+e,!0),n.send()}function getCurrentMood(e){return currentMoodVal=e.neutral,currentMoodDesc="neutral",e.happiness>currentMoodVal?(currentMoodVal=e.happiness,currentMoodDesc="happiness"):e.sadness>currentMoodVal?(currentMoodVal=e.sadness,currentMoodDesc="sad"):e.anger>currentMoodVal?(currentMoodVal=e.anger,currentMoodDesc="angry"):e.contempt<currentMoodVal?(currentMoodVal=e.contempt,currentMoodDesc="contempt"):e.disgust<currentMoodVal?(currentMoodVal=e.disgust,currentMoodDesc="disgusted"):e.fear<currentMoodVal?(currentMoodVal=e.fear,currentMoodDesc="scared"):e.suprise<currentMoodVal&&(currentMoodVal=e.suprise,currentMoodDesc="suprised"),currentMoodDesc}function longtextstyle(){document.getElementById("headerf").style.fontSize="4rem",document.getElementById("headers").style.fontSize="3rem"}function updateUI(){document.getElementById("headerf").innerHTML="We have detected you are feeling: "+currentMoodDesc,document.getElementById("headerf").style.fontSize="4rem"}angular.module("app",[]),angular.module("app").component("fountainTitle",{templateUrl:"app/title.html"});var currentMoodVal,currentMoodDesc,currentMoodPoem;$(document).ready(function(){document.getElementById("file-selector").addEventListener("change",function(){document.getElementById("headerf").innerHTML="Connecting to space satellites...",document.getElementById("headers").innerHTML="Shouldnt take too long",processImg(function(e){sendEmotionReq(e,function(e){currentMoodDesc=getCurrentMood(e),currentMoodPoem=sendPoemReq(currentMoodDesc),updateUI()})})})}),angular.module("app").component("app",{templateUrl:"app/main.html"}),angular.module("app").component("fountainHeader",{templateUrl:"app/header.html"}),angular.module("app").component("fountainFooter",{templateUrl:"app/footer.html"}),angular.module("app").run(["$templateCache",function(e){e.put("app/footer.html",'<footer class="footer">\n  Built with ♥ by Kendall Lynch\n  \n</footer>\n'),e.put("app/header.html",'<header class="header">\n  <p class="header-title">\n      mePoem\n    \n  </p>\n  <p class="header-desc">\n    Generate high quality poems based on your mood!\n  </p>\n</header>'),e.put("app/main.html",'<div class="main-container">\n  <fountain-header></fountain-header>\n  <main class="main">\n    <fountain-title></fountain-title>\n  </main>\n  <div id="footer">\n  <fountain-footer></fountain-footer>\n</div>\n</div>\n'),e.put("app/title.html",'<div class="title">\n  <h1 id="headerf" class="title-h1">Welcome!</h1>\n  <div class="btn-wrapper">\n    <label class="btn btn-info" for="file-selector">\n      <input id="file-selector" type="file">\n      </label>\n      </div>\n  <h2 id="headers" class="title-h2">Please upload a photo to begin.</h2>\n</div>\n')}]);
//# sourceMappingURL=../maps/scripts/app-f00aea074d.js.map
