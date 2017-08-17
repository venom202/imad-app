console.log('Loaded!');

/*
//move madi image onclick to left
var img=document.getElementById('madi');
img.onclick=function(){
  img.style.marginLeft='100px';  
};
*/

//move madi image continously
var img=document.getElementById('madi');
var marginLeft=0;                                //variable
function moveimg(){                           
    marginLeft=marginLeft + 1;
    img.style.marginLeft + 'px';
}
img.onclick=function(){
    var interval=setInterval(moveimg,50);         //apply moveimg function every 100ms
}
