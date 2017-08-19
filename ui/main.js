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
    if(request.readyState === XMLHttpRequest.DONE) {
        //take action 
        if(request.status === 200) {
            var counter=request.responseText;
            var span=document.getElementById('count');
            span.innerHTML=counter.toString();
        }
    }  
  };
  //make request
    request.open('GET','http://u202mehulpatil.imad.hasura-app.io/counter',true);
    request.send(null);
};


//display name code
var submit=document.getElementById('submit_btn');
submit.onclick=function() {
    //make a request to server and send name code 
  //create request object
  var request=new XMLHttpRequest();
  
  //capture response and store it in a variable
  request.onreadystatechange=function() {
    if(request.readyState === XMLHttpRequest.DONE) {
        //take action 
        if(request.status === 200) {
            //capture name and render it as list
            var names=request.responseText;
            names=JSON.parse(names);
            var list='';
            for(var i=0;i<name.length;i++) {
            list += '<li>' + name[i] + '</li>';
    }
    var ul=document.getElementById('namelist');
    ul.innerHTML.list;
        }
    }  
  };
  //make request
    var nameInput=document.getElementById('name');
    var name=nameInput.value;
    request.open('GET','http://u202mehulpatil.imad.hasura-app.io/submit-name?name=' +name,true);
    request.send(null);
};