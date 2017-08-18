console.log('Loaded!');

/*
//move madi image onclick to left
var img=document.getElementById('madi');
img.onclick=function(){
  img.style.marginLeft='100px';  
};


//move madi image continously
var img=document.getElementById('madi');
var marginLeft=0;                                //variable
function moveRight(){                           
    marginLeft=marginLeft + 1;
    img.style.marginLeft + 'px';
}
img.onclick=function(){
    var interval=setInterval(moveRight,  50);         //apply moveimg function every 100ms
}
*/
//--------------------------------------------------------------------------------------------------------------------------------------------------------------

//code for counter
var button=document.getElementById('counter');
button.onclick=function() {
  
  //create request object
  var request=new XMLHttpRequest();
  
  //capture response and store it in a variable
  request.onreadystatechange=function() {
    if(request.readyState===XMLHttpRequest.DONE) {
        //take action 
        if(request.status===200) {
            var counter=request.requestText;
            var span=document.getElementById('count');
            span.innerHTML=counter.toString();
        }
    }  
  };
  //make request
    request.open('GET','http://u202mehulpatil.imad.hasura-app.io/counter',true);
    request.send(null);
};
