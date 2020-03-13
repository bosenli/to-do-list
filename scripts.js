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
let data = localStorage.getItem("TODO");

//check if data is not empty
if(data){
    LIST=JSON.parse(data);
    id = LIST.length;//set the id to the last one in the list
    loadList(LIST);//load the list to the user interface
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
clear.addEventListener("click", function(){
   localStorage.clear();
    location.reload();
});

//show todays date
const options = {weekday:"long",month:"short",day:"numeric"};
const today =new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options)
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
    if(trash){return;}
    
    const DONE = done? CHECK: UNCHECK;
    const LINE = done? LINE_THROUGH: "";
    
    const item = `<li class="item">
            <i class="co fa ${DONE}" job="complete" id="${id}"></i>
            <p class="text ${LINE}"> ${toDo} </p>
            <i class="de fa fa-trash-o" job="delete" id="${id}"></i>
        </li>`
    const position = "beforeend";

list.insertAdjacentHTML(position, item);
}



document.addEventListener("keyup", function(event){
    
    if (event.keyCode == 13){
        const toDo = input.value;
        // if the input isnt empty
        if(toDo){
            //addToDo(toDo);
            addToDo(toDo, id, false, false)
            LIST.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash:false
                });
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
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done? false : true;
}

function removeTodo(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].trash=true;
}

//target an element

//target the items created dynamically

//const list=document.getElementById("list");
list.addEventListener("click", function(event){
    let element=event.target; //<i class="de fa fa-trash-o" job="delete" id="0"></i>, return the cliecked element inside list
    const elementJob= element.attributes.job.value; //delete or complete
    if (elementJob =="complete"){
        completeToDo(element);
    }
    else if (elementJob == "delete") {
        removeTodo(element);
    }
    //add item to localstorage (this code must be added where the LIST array is updated)
localStorage.setItem("TODO",JSON.stringify(LIST));
})

//Save to-do-list-to local strorage
