//select the elements
const clear= document.querySelector(".clear");
const dateElement=document.getElementById("date");
const list=document.getElementById("list");
const input=document.getElementById("input");

// Classes names
const CHECK="fa-check-circle";
const UNCHECK="fa-circle-thin";
const LINE_THROUGH="lineThrough";

//Variables
//let LIST =[], id=0;

//updated variables
let LIST,id;

//get item from localstorage
let data = localStorage.getItem("TODO");  //TODO is from setitem on line 103

//check if data is not empty
if(data){  //data from line 9 declear
    LIST=JSON.parse(data);
    id = LIST.length;//set the id to the last one in the list
    loadList(LIST);//call method on line 32 and load the list to the user interface
}else{
    LIST = [];
    id=0;
}

//load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name,item.id,item.done,item.trash);
                  });
}

//clear the local storage
clear.addEventListener("click", function(){   //clear refer to var clear on line 2
   localStorage.clear();
    location.reload();
});

//show todays date
const options = {weekday:"long",month:"short",day:"numeric"};
const today =new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options)  //dateElement refer to var dateElement on line 3
/*
element.insertAdjacentHtml(position,text)   
position includes beforebegin, afterbegin, beforeend, afterend 
*/
//add to do function
//version 1
/*
function addToDo(toDo){
    const item = `<li class="item">
            <i class="co fa fa-circle-thin" job="complete"></i>
            <p class="text"> ${toDo} </p>
            <i class="de fa fa-trash-o" job="delete"></i>
        </li>`
    const position = "beforeend";

list.insertAdjacentHTML(position, item);
}
*/
//updated version: version 2
function addToDo(toDo, id, done, trash){
    if(trash){return;}              //trash from parameter
    
    const DONE = done? CHECK: UNCHECK;   //done from parameter, CHECK AND UNCHECK from line 8 and line 9 declearation
    const LINE = done? LINE_THROUGH: "";   //done from parameter, LINE_THROUGH from line 10 declearation
    
    const item = `<li class="item">
            <i class="co fa ${DONE}" job="complete" id="${id}"></i>
            <p class="text ${LINE}"> ${toDo} </p>
            <i class="de fa fa-trash-o" job="delete" id="${id}"></i>
        </li>`
    const position = "beforeend";

list.insertAdjacentHTML(position, item);
}


//enter data and add data to TODO at the localStorge and add to do 
document.addEventListener("keyup", function(event){
    
    if (event.keyCode == 13){
        const toDo = input.value;
        // if the input isnt empty
        if(toDo){
            //addToDo(toDo);
            addToDo(toDo, id, false, false)   //id is default to 0 from line 28
            LIST.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash:false
                }
            );
                id++;       
            //add item to localstorage (this code must be added where the LIST array is updated)
            localStorage.setItem("TODO",JSON.stringify(LIST));
            }
            input.value = "";
            
        }
        
    
});


/*

function UpdateAddToDo(toDo, id, done, trash){
    if (trash){return;}

    const DONE = done? CHECK : UNCHECK;
    const LINE = done? LINE_THROUGH: "";
    const text = `<li class="item">
            <i class="fa ${DONE} complete" job="complete" id="${id}"></i>
            <p class="text ${LINE}"> ${toDo} </p>
            <i class="fa fa-trash-o delete" job="delete" id="${id}"></i>
        </li>`
    const position = "beforeend";

list.insertAdjacentHTML(position, text);

}
*/


//when to-do is DONE
function completeToDo(element){
    element.classList.toggle(CHECK);       //return a list of class names of element, in here , we mean if CHECK =fa-check-circle                                         exist, remove fa-check-circle; else CHECK does not exist, add fa-check-circle;
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);  /*element is <i> icon , so we need go back to                                                                                       parentNode, then select class text at line 75,`<li class="item">
            <i class="co fa ${DONE}" job="complete" id="${id}"></i>
            <p class="text ${LINE}"> ${toDo} </p>
            <i class="de fa fa-trash-o" job="delete" id="${id}"></i>
        </li>` */
    LIST[element.id].done = LIST[element.id].done? false : true;   //done key inside LIST array, which means if it is done, we set it to false which is make done to be true,otherwise , done: false is true.
    
}

function removeTodo(element){
    element.parentNode.parentNode.removeChild(element.parentNode)   //element is an icon <i> such as the trash icon
    LIST[element.id].trash=true;                //trash key inside LIST array
}

//target an element

//target the items created dynamically

//const list=document.getElementById("list");
list.addEventListener("click", function(event){   //list is decleared on line 4 
    let element=event.target; //for example if trash is clicked , return code <i class="de fa fa-trash-o" job="delete" id="0"></i> job attribute is delete, id is 0 ;return the cliecked element which is element tag <i> which is the icon, inside list class
    const elementJob= element.attributes.job.value; //delete or complete
    if (elementJob =="complete"){
        completeToDo(element);      //method completeToDo from above
    }
    else if (elementJob == "delete") {
        removeTodo(element);         //method removeToDo from above
    }
    //add item to localstorage (this code must be added where the LIST array is updated)
localStorage.setItem("TODO",JSON.stringify(LIST)); //list is an object
})

//Save to-do-list-to local strorage
