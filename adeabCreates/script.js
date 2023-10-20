var ANIMATION_LENGTH = 1000;
$(document).ready(function() {
	var $createIdea= $("#createIdea");
	var $openIdea = $("#openIdea");
	$openIdea.click(function(){
	var isShown = ($createIdea.css("top") === "0px") ? true : false; 
    var newTop = (isShown) ? "-115vw" : "0px";
    $createIdea.animate({"top": newTop}, ANIMATION_LENGTH);
	});

$("#createIdea").click(function(){
	this.css("top: 23px");
});
});

var proglab = document.getElementById('progress');

function upload(){
    //get your image
    var image=document.getElementById('image').files[0];
    //get your blog text
    var post=document.getElementById('ideaTitle').value;
    var postt=document.getElementById('idea').value;
    var posttt=document.getElementById('ideaOwner').value;
    //get image name
    var imageName=image.name;
    //firebase storage reference
    //it is the path where your image will be stored
    var storageRef=firebase.storage().ref('images/'+imageName);
    //upload image to selected storage reference
    //make sure you pass image here
    var uploadTask=storageRef.put(image);
    //to get the state of image uploading....
    uploadTask.on('state_changed',function(snapshot){
         //get task progress by following code
         var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
         proglab.innerHTML = "upload" + progress + "%";
    },function(error){
      //handle error here
      console.log(error.message);
    },function(){
        //handle successfull upload here..
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
           //get your image download url here and upload it to databse
           //our path where data is stored ...push is used so that every post have unique id
           firebase.database().ref('blogs/').push().set({
                 text:post,
                 imageURL:downloadURL,
                 textt:postt,
                 texttt:posttt,
           },function(error){
               if(error){
                   alert("Error while uploading");
               }else{
                  Swal.fire({
                    icon: 'success',
                    title: ' ✨رحم الله امرؤ شارك عقله عقول الأخرين ',
                    confirmButtonText: '<a href="https://translate.google.com/">شكرًا لك</a>'
                })
                    
                   //now reset your form
                   document.getElementById('post-form').reset();
                   getdata();
               }
           });
        });
    });

}

window.onload=function(){
    this.getdata();
}


function getdata(){
    firebase.database().ref('blogs/').once('value').then(function(snapshot){
      //get your posts div
      var posts_div=document.getElementById('posts');
      //remove all remaining data in that div
      posts.innerHTML="";
      //get data from firebase
      var data=snapshot.val();
      console.log(data);
      //now pass this data to our posts div
      //we have to pass our data to for loop to get one by one
      //we are passing the key of that post to delete it from database
      for(let[key,value] of Object.entries(data)){
        posts_div.innerHTML=
        "<div class='card-body'><h1 class='postTitle'>"+value.text+"</h1>"+
        
        "<img src='"+value.imageURL+"' class='img'>"+
        "<div class='card-body'><p class='postBody'>"+value.textt+"</p>"+
        "<div class='card-body'><h6 class='postOwner'>"+value.texttt+"</h6>"+
        "</div></div><hr class='hr'></div>"+posts_div.innerHTML;
      }
    
    });
}

function delete_post(key){
    firebase.database().ref('blogs/'+key).remove();
    getdata();

}