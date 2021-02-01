var input = document.getElementById("input");
var addBtn = document.getElementById("addBtn");
var items  = document.getElementById("items");
var delAllBtn = document.getElementById("deleteAllBtn");
var body = document.body;
var greetingPara = document.getElementById("greeting");
let histPara = document.getElementById("historyPara");

class TodoItem {
    constructor(textItem){
        this.textItem = textItem;
    }
}

//create a class for local storage 
class todoStorage {
    static getTodos(){
        let todos;
        if(localStorage.getItem('todos') === null){
            todos = [];
        }else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        return todos;
    }
// method to add todos to storage 
    static addTodos(todo){
        const todos = todoStorage.getTodos();
        todos.push(todo);
        console.log(todos);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    //method to remove single todos from local storage
    static removeTodos(texts){
        const todos = todoStorage.getTodos();
        todos.forEach((todo, index) => {
            if(todo.textItem === texts){
                todos.splice(index, 1);
                console.log("a match " + todo.textItem + " " + texts);
            }else {
                console.log("not a match " + todo.textItem + "        " + texts)
            }
        })
        //we stringify our books array because ls doesn't take in anything that's not a string 
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    //method to remove all todos from todoStorage
    static removeAllTodos(){
        //get our list of todos from local storage
        let todos = JSON.parse(localStorage.getItem('todos'));
        todos.splice(0, todos.length);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

class UI {
    static showTodos(){
        //getting our array of todos from local storage
        const todoItems = todoStorage.getTodos();
        //looping through them and using the ui function so they can be displayed from the local storage
        todoItems.forEach((todoItem)=> UI.addTodoToList(todoItem));
    }

    static addTodoToList(todo){
        let newItem = document.createElement("p");
        newItem.innerText = `${todo.textItem}`;
        newItem.className = 'newItem';
        items.appendChild(newItem);
        let opt = document.createElement("div");
        opt.style.width = "5%";
        opt.style.display = 'flex';
        //Clearing input 
        input.value = "";
        //creating a delete button for each list item created 
        let delbtn = document.createElement("button");
        let delbtntxtnd = document.createElement("i");
        delbtntxtnd.className = 'fas fa-trash';
        delbtn.appendChild(delbtntxtnd);
        delbtn.className = 'deleteButton';
        histPara.className = "histParaVisible";
        opt.appendChild(delbtn);

        //creating an edit button for each list item created 
        let editbtn = document.createElement("button");
        let editbtntxtnd = document.createElement("i");
        editbtntxtnd.className = "fas fa-edit";
        editbtn.appendChild(editbtntxtnd);
        editbtn.className = 'editButton';
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
            newItem.insertBefore(newp, opt);
        }

        //function to delete individual items
        delbtn.onclick = ()=>{
           delbtn.parentElement.parentElement.remove();
           let textItem = delbtn.parentElement.parentElement.textContent;
           todoStorage.removeTodos(textItem);
           if(items.children.length < 1) histPara.className = 'historyPara';
        }
    
    }

    static deleteAllItems(parent){
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
}

//Displaying our books in our todoStorage 
document.addEventListener('DOMContentLoaded', UI.showTodos);

//adding a book to local storage annd UI
addBtn.addEventListener("click", ()=>{
    let text = document.getElementById("input").value;
    let newTodo = new TodoItem(text);
    UI.addTodoToList(newTodo);
    todoStorage.addTodos(newTodo);
});

//deleting a book from local storage and UI
 delAllBtn.addEventListener('click', ()=> {
     UI.deleteAllItems(items);
     histPara.className = 'historyPara';
     todoStorage.removeAllTodos();
});