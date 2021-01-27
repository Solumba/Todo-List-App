var input = document.getElementById("input");
var addBtn = document.getElementById("addBtn");
var items  = document.getElementById("items");
var delAllBtn = document.getElementById("deleteAllBtn");
var body = document.body;
var greetingPara = document.getElementById("greeting");

class TodoItem {
    constructor(text){
        this.text= text;
    }
}

//create a class for local storage 
class LocalStorage {
    static getTodos(){
        let todos;
        if(localStorage.getItem('todos') === null){
            todos = [];
        }else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        return todos;
    }

    static addTodos(todo){
        const todos = LocalStorage.getTodos();
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    //method to remove books from local storage
    static removeBooks(text){
        const todos = LocalStorage.getTodos();
        todos.forEach((todo, index) => {
            if(todo.text === text){
                todos.splice(index, 1);
            }
        })
        //we stringify our books array because ls doesn't take in anything that's not a string 
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

class UI {
    static showTodos(){
        //getting our array of todos from local storage
        const todoItems = LocalStorage.getTodos();
        //looping through them and using the ui function so they can be displayed from the local storage
        todoItems.forEach((todoItem)=> UI.addTodoToList(todoItem));
    }

    static addTodoToList(todo){
        let newItem = document.createElement("p");
        newItem.innerHTML = `${todo.text}`;
        let histPara = document.getElementById("historyPara");
        newItem.className = 'newItem'
        items.appendChild(newItem);
        let opt = document.createElement("div");
        opt.style.width = "5%";
        opt.style.display = 'flex';
        opt.style.justifySelf =''
        //Clearing input 
        input.value = "";
        //creating a delete button for each list item created 
        let delbtn = document.createElement("span");
        let delbtntxtnd = document.createElement("span");
        delbtntxtnd.className = "material-icons md-16"
        let spanText = document.createTextNode("delete");
        delbtntxtnd.appendChild(spanText)
        delbtn.appendChild(delbtntxtnd);
        delbtn.style.padding = "5px";
        delbtn.style.color = "red";
        delbtn.style.cursor = "pointer";
        histPara.className = "histParaVisible";
        opt.appendChild(delbtn);

        //function  to delete items
        delbtn.onclick = function(){
            let prepar = this.parentNode;
            prepar.parentNode.remove();
            if(items.childNodes.length < 2){
                histPara.className = "historyPara";
            }
            console.log(items.childNodes.length);
        }

        //creating an edit button for each list item created 
        let editbtn = document.createElement("span");
        let editbtntxtnd = document.createElement("span");
        editbtntxtnd.className = "material-icons md-16"
        let editSpanText = document.createTextNode("edit");
        editbtntxtnd .appendChild(editSpanText)
        editbtn.appendChild(editbtntxtnd);
        editbtn.style.padding = "5px";
        editbtn.style.color = "seagreen";
        editbtn.style.cursor = "pointer";
        histPara.className = "histParaVisible";
        opt.appendChild(editbtn);
        newItem.appendChild(opt);
        
        //function to edit items
        editbtn.onclick = function(){
            var editText = prompt("");
            var newp = document.createElement("span");
            newp.innerHTML = editText;
            newItem.firstChild.remove();
            // add an if to verify empty edits 
            newItem.insertBefore(newp, opt)
        }
    
    }
}

//Displaying our books in our localstorage 
document.addEventListener('DOMContentLoaded', UI.showTodos);
/*Getting the user's name and validating that it is a string 
but all data in a prompt are returned as strings, even numbers */

// body.onload = function (){
//     var yourName = prompt("what's your name?");
//     if(typeof yourName != "string"){
//         alert("Please enter a valid name");
//     } 
//     else{
//         var greetingExt = document.createElement("p");
//         var greetingExtTxt = document.createTextNode("what's New?");
//         greetingExt.appendChild(greetingExtTxt);
//         //you are writng in the same h3, that's why all text is black
//         greetingPara.innerHTML = "Hello " + "" + yourName;
//     }
// }

// input.onfocus = function(){
//     this.style.borderColor = 'yellow';
// }
// input.onchange = function(){
//     this.style.borderColor = "var(--mainColor)";
// }

// function addNew (){
//     //validating the input to be sure it isn't empty
//     if (input.value === "") {
//         alert("please add something to the list");
//     }
//     // runs when both conditions above have been met
//     else {
//         let newItem = document.createElement("p");
//         let newItemText = document.createTextNode("* " + input.value);
//         let histPara = document.getElementById("historyPara");
//         newItem.appendChild(newItemText);
//         newItem.style.margin = "20px";
//         newItem.style.display = "flex";
//         newItem.style.justifyContent = "space-between";
//         items.appendChild(newItem);
//         let opt = document.createElement("div");
//         opt.style.width = "30%";
//         //Clearing input 
//         input.value = "";
        
//         //creating a delete button for each list item created 
//         let delbtn = document.createElement("span");
//         let delbtntxtnd = document.createElement("span");
//         delbtntxtnd.className = "material-icons md-16"
//         let spanText = document.createTextNode("delete");
//         delbtntxtnd .appendChild(spanText)
//         delbtn.appendChild(delbtntxtnd);
//         delbtn.style.padding = "5px";
//         delbtn.style.color = "red";
//         delbtn.style.cursor = "pointer";
//         histPara.className = "histParaVisible";
//         opt.appendChild(delbtn);

//         //function  to delete items
//         delbtn.onclick = function(){
//             let prepar = this.parentNode;
//             prepar.parentNode.remove();
//             if(items.childNodes.length < 2){
//                 histPara.className = "historyPara";
//             }
//             console.log(items.childNodes.length);
//         }

        

//         //creating an edit button for each list item created 
//         let editbtn = document.createElement("span");
//         let editbtntxtnd = document.createElement("span");
//         editbtntxtnd.className = "material-icons md-16"
//         let editSpanText = document.createTextNode("edit");
//         editbtntxtnd .appendChild(editSpanText)
//         editbtn.appendChild(editbtntxtnd);
//         editbtn.style.padding = "5px";
//         editbtn.style.color = "seagreen";
//         editbtn.style.marginLeft = "10px";
//         editbtn.style.cursor = "pointer";
//         histPara.className = "histParaVisible";
//         opt.appendChild(editbtn);
//         newItem.appendChild(opt);
        
//         //function to edit items
//         editbtn.onclick = function(){
//             var editText = prompt("");
//             var newp = document.createElement("span");
//             newp.innerHTML = editText;
//             newItem.firstChild.remove();
//             // add an if to verify empty edits 
//             newItem.insertBefore(newp, opt)
//         }
//     }
    
// }


function delAll(){
    for(var i = 0 ; i < items.children.length; i++){
        items.children[i].style.display = "none";
    }
}

delAllBtn.addEventListener("click", delAll)
addBtn.addEventListener("click", ()=>{
    let text = document.getElementById("input").value;
    let newTodo = new TodoItem(text);
    UI.addTodoToList(newTodo);
    LocalStorage.addTodos(newTodo);
});

