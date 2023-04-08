var canvas;
var context;
var img;

window.addEventListener("load", function() {
        canvas = document.getElementById("myCanvas");
        context = canvas.getContext("2d");

        img = new Image();
        img.onload = function () {
                context.drawImage(img, 0, 0); 
        }
});

function drawImage(imgUrl) { 
        img.src = imgUrl; 
}

var isImageSubscribed = false;
function recognize(msg) {
        if(!isImageSubscribed) {
                subscribe('image'); // 토픽 image 등록
                console.log("sub img") //console에 출력
                isImageSubscribed = true;
        }

        canvas=document.getElementById("myCanvas")
        if(msg=="action"){
                canvas.style.display = "block"
        }
        else if (msg=="stop"){
                canvas.style.display = "none"
        }
                publish('cam', msg);

}
