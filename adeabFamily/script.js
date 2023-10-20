var create_workspace=document.querySelector(".create-workspace");
var next_click=document.querySelectorAll(".next-click");
var back_click=document.querySelectorAll(".back-click");
var finish_click=document.querySelector(".finish-click");
var main_form=document.querySelectorAll(".main");
var list=document.querySelectorAll(".progress-bar li")
let formnumber=0;


create_workspace.addEventListener('click',function(){
    if(!validateform()){
        return false;
    }
   formnumber++;
   updateform();
   progress_forward();
});

next_click.forEach(function(next_page){
    next_page.addEventListener('click',function(){
         if(!validateform()){
        return false;
        }
         formnumber++;
         updateform();
         progress_forward();
    });
});


back_click.forEach(function(back_page){
    back_page.addEventListener('click',function(){
         formnumber--;
         updateform();   
    });
});

finish_click.addEventListener('click',function(){
//   if(!validateform()){
//         return false;
//         }
         formnumber++;
         updateform();
         var remove_progress=document.querySelector(".progress-bar");
         remove_progress.classList.add('d-none'); 
});
function progress_forward(){
    list[formnumber].classList.add('active');
}



function updateform(){
    main_form.forEach(function(main_number){ 
       main_number.classList.remove('active'); 
    });
    main_form[formnumber].classList.add('active');
  
   
} 



 
function validateform(){
    validate=true;
    var validate_form=document.querySelectorAll(".main.active input");
    validate_form.forEach(function(val){
        val.classList.remove('warning');
        if(val.hasAttribute('require')){
            if(val.value.length==0){
                validate=false;
                val.classList.add('warning');
            }
        }
    });
    return validate;
}