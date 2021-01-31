var input = document.getElementById("input");
var addBtn = document.getElementById("addBtn");
var items  = document.getElementById("items");
var delAllBtn = document.getElementById("deleteAllBtn");
var body = document.body;
var greetingPara = document.getElementById("greeting");
let histPara = document.getElementById("historyPara");

class TodoItem {
    constructor(text){
        this.text= text;
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

    static addTodos(todo){
        const todos = todoStorage.getTodos();
        todos.push(todo);
        console.log(todos);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    //method to remove todos from local storage
    static removeTodos(text){
        const todos = todoStorage.getTodos();
        todos.forEach((todo, index) => {
            if(todo.text === text){
                todos.splice(index, 1);
            }
        })
        //we stringify our books array because ls doesn't take in anything that's not a string 
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    //method to remove all todos from todoStorage
    static removeAllTodos(){
        //get our list of todos from local storage
        let todos = JSON.parse(localStorage.getItem('todos'));
        todos.forEach((todo, index)=>{
            todos.splice(0, todos.length);
        });
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log(todos)
        
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
        newItem.innerHTML = `${todo.text}`;
        newItem.className = 'newItem'
        items.appendChild(newItem);
        let opt = document.createElement("div");
        opt.style.width = "5%";
        opt.style.display = 'flex';
        //Clearing input 
        input.value = "";
        //creating a delete button for each list item created 
        let delbtn = document.createElement("span");
        let delbtntxtnd = document.createElement("span");
        delbtntxtnd.className = "material-icons md-16"
        let spanText = document.createTextNode("delete");
        delbtntxtnd.appendChild(spanText)
        delbtn.appendChild(delbtntxtnd);
        delbtn.className = 'deleteButton';
        histPara.className = "histParaVisible";
        opt.appendChild(delbtn);

        //creating an edit button for each list item created 
        let editbtn = document.createElement("span");
        let editbtntxtnd = document.createElement("span");
        editbtntxtnd.className = "material-icons md-16"
        let editSpanText = document.createTextNode("edit");
        editbtntxtnd .appendChild(editSpanText)
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
            newItem.insertBefore(newp, opt)
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

