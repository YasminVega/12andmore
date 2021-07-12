
    var soundFreqency =  [523.251,554.365,587.330,622.254,659.255,698.456,739.989,783.991,830.609,880.000,932.328,987.767];
    var colorFreqency =[1,2,3,4,5,6,7,8,9,10,11,12];

window.onload = function (){
  var status = 1;
    var scale=document.getElementById('scale');
    ///
    var r, g, b, rgb,wl;
    var MAX = 1000;  //色の種類の刻み具合
    var cbHeight = 100;//カラーバーの高さ
    var cbWidth = 1000;//カラーバーの幅
    var lotationTime = 1000;//ローテーションするときの一音当たり継続時間
    var colorbar = document.getElementById('color');
    var clickedColor;
    colorbar.style.width = cbWidth +"px";
    colorbar.style.height = cbHeight + "px";
    colorbar.style.position = "relative";
    
    var clicked;

for (var i = 0; i < MAX; i++) {
  // HSLカラーを算出
   var hue = i * (360 / MAX);
   var color = "hsl(" + hue + ", 100%, 50%)";
   var between = cbWidth/MAX;
   var x =  i*between;
   var y = 0;

    // シェイプを作成
    var cDiv = "div" + i; 
    var div = document.createElement("div");
    div.id = cDiv;
    div.style.width = between +"px";
    div.style.height = cbHeight + "px";
    //div.style.borderRadius = "50%";
    div.style.backgroundColor = color;
    div.style.position = "absolute";
    div.style.left = x + "px";
    div.style.top = y + "px";
    colorbar.appendChild(div);
    
};

///////////////////////////////////////////////////////////////////




///音を出す
var sID;

var clickedS;
var soundNumber,soundFR;


scale.onclick = function(event){
 
  clickedS = event.target.id;
  soundNumber = clickedS.replace('scale',"");
  soundFR = soundFreqency[soundNumber-1]; 
  document.getElementById('infoB').innerHTML = soundFR;
  
 
  
 

   
  sID = clickedS.replace('scale',"audio");
  console.log(sID);
  document.getElementById(sID).play();
  if(document.getElementById(sID).play){
    console.log("再生");
    document.getElementById(sID).pause();
    document.getElementById(sID).currentTime =0;
    document.getElementById(sID).play();
  }
  
  
}
/////////////////////////////////////////////
colorbar.onclick = function(event){
  clicked = event.target;
  clickedColor = clicked.style.backgroundColor;
  console.log(clickedColor);
  
  rgb = clickedColor.substring(4,clickedColor.length - 1);
  rgb = rgb.split(",");
  console.log(rgb);
  r = rgb[0];
  g = rgb[1];
  b = rgb[2];
  console.log("R="+r +",G="+g+",B="+b);

    r = r / 255;
    g = g / 255;
    b = b / 255;
    
    if ( g == 0 && b == 1) {
      wl = 650 - (650 - 790) * r; 
   } else if( r == 1 && b == 0) {
      wl= 405 + (405 - 300) * g;
   } else if (r == 0 && g == 1) {
      wl = 565 - (565 - 610) * b;
   } else if (g == 1 && b == 0) {
      wl = 565 + (565 - 620) * r; 
   } else if (r == 0 && b == 1) {
      wl = 650 - (650 - 610) * g;
   } else if (r == 1 ) {
      wl = 405 - (405 - 790) * b;
    }
    

  console.log(wl);
  colorFreqency[soundNumber] = wl;
  console.log(colorFreqency);
  document.getElementById(clickedS).style.backgroundColor = clickedColor;
 
  var time = 0.0000000001;
 var lightFR=wl*1000000000000;
 var PI = Math.PI;
  var canvas = document.getElementById("graphcanvas");
   var context = canvas.getContext("2d");

   
  document.getElementById('infoA').innerHTML = lightFR;
 
 

   // constants
   var WIDTH = canvas.width;
   var HEIGHT = canvas.height;
   var N = WIDTH;

  context.clearRect(0,0,WIDTH,HEIGHT);
  context.beginPath();
   context.strokeStyle = clickedColor;
   context.lineWidth = 2;
   for (var n=0; n<N; n++) {   
     var SLx = n;
     var SLy = HEIGHT/2- 2*Math.sin((((soundFR*PI*2*n*time/WIDTH+lightFR*PI*2*n*time/WIDTH)*2*PI)/2))*HEIGHT/2*Math.cos((((lightFR*PI*2*n*time/WIDTH-soundFR*PI*2*n*time/WIDTH)*2*PI)/2));
     if (n == 0) {
       context.moveTo(SLx, SLy);
       
     } else {
       context.lineTo(SLx, SLy);
     }   
   }
   context.stroke();
   console.log(SLy);
  
}
 
  
var i = 0;//////////////////

document.getElementById("infoC").addEventListener('click', function(){
  status =  status * -1;
  if (status = -1){
  var lotation = window.setInterval(function(){
    
    var nowSound,nowColor;
    nowSound = i + 1;
    nowColor = i +1;
    nowSound = "audio" + nowSound;
    nowColor = "scale" + nowColor;
    console.log(nowSound);
    nowSound = document.getElementById(nowSound);
    nowColor = document.getElementById(nowColor);
    var nowSoundFR = soundFreqency[i];//
    document.getElementById("infoB").innerHTML =nowSoundFR;
    var time = 0.0000000001;
    var lightFR=colorFreqency[i]*1000000000000;
    var PI = Math.PI;
    var canvas = document.getElementById("graphcanvas");
    var context = canvas.getContext("2d");
      nowSound.play();
      /////////////////
     var WIDTH = canvas.width;
     var HEIGHT = canvas.height;
     var N = WIDTH;
  
    context.clearRect(0,0,WIDTH,HEIGHT);
    context.beginPath();
     context.strokeStyle = nowColor.style.backgroundColor;
     context.lineWidth = 2;
     for (var n=0; n<N; n++) {   
       var SLx = n;
       var SLy = HEIGHT/2- 2*Math.sin((((nowSoundFR*PI*2*n*time/WIDTH+lightFR*PI*2*n*time/WIDTH)*2*PI)/2))*HEIGHT/2*Math.cos((((lightFR*PI*2*n*time/WIDTH-nowSoundFR*PI*2*n*time/WIDTH)*2*PI)/2));
       if (n == 0) {
         context.moveTo(SLx, SLy);
         
       } else {
         context.lineTo(SLx, SLy);
       }   
     }
     context.stroke();
     ///////////////////////////
    if(i <11){
      i += 1;
    }
    else if( i >=11){
      i = 0;
    }
  

  
}, lotationTime);
 
}

else {
 window.clearInterval(lotation) ;
}
});




}



    
