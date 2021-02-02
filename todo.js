var input = document.getElementById("input");
var addButton = document.getElementById("addBtn");
var items  = document.getElementById("items");
var delAllButton = document.getElementById("deleteAllBtn");
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

    // static editTodos(){
    //     const todos = todoStorage.getTodos();
    //     let foundIndex = todos.findIndex((todo) =>{
    //         todo.textItem === newItem.textContent;
    //     });
    //     console.log(foundIndex);
    //     todos.splice(foundIndex, 1 , newItem);
    //     localStorage.setItem('todos', JSON.stringify(todos));
    // }
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

        let todoOptions = document.createElement("div");
        todoOptions.style.width = "5%";
        todoOptions.style.display = 'flex';

        //Clearing input 
        input.value = "";

        //creating a delete button for each list item created 
        let deleteButton = document.createElement("button");
        let deleteButtonIcon = document.createElement("i");
        deleteButtonIcon.className = 'fas fa-trash';
        deleteButton.appendChild(deleteButtonIcon);
        deleteButton.className = 'deleteButton';
        histPara.className = "histParaVisible";
        todoOptions.appendChild(deleteButton);

        //creating an edit button for each list item created 
        let editButton = document.createElement("button");
        let editButtonIcon = document.createElement("i");
        editButtonIcon.className = "fas fa-edit";
        editButton.appendChild(editButtonIcon);
        editButton.className = 'editButton';
        histPara.className = "histParaVisible";
        todoOptions.appendChild(editButton);
        newItem.appendChild(todoOptions);
        
        //function to edit items
        editButton.onclick = function(){
            var editText = prompt("");
            if(editText === ''){
                alert('cant add an empty item');
            }
            else{
                const todos = todoStorage.getTodos();
                console.log(newItem.textContent)
                //checking all todo items in our local storage for the one whose value matches what's in the paragraph
                let foundIndex = todos.findIndex((todo) =>{
                    return todo.textItem === newItem.textContent;
                });
                console.log(foundIndex);
                newItem.textContent = editText;
                todos[foundIndex] = {
                    textItem : editText,
                }
                console.log(todos);
                localStorage.setItem('todos', JSON.stringify(todos));
                location.reload()
            }
        }

        //function to delete individual todo items
        deleteButton.onclick = ()=>{
           deleteButton.parentElement.parentElement.remove();
           let textItem = deleteButton.parentElement.parentElement.textContent;
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

//Displaying our todos in our todoStorage 
document.addEventListener('DOMContentLoaded', UI.showTodos);

//adding a todo item to local storage annd UI
addButton.addEventListener("click", ()=>{
    let text = document.getElementById("input").value;
    if(text === ''){
        alert('cant add an empty item');
    }else {
        let newTodo = new TodoItem(text);
        UI.addTodoToList(newTodo);
        todoStorage.addTodos(newTodo);
    }
    
});

//deleting a todo item from local storage and UI
 delAllButton.addEventListener('click', ()=> {
     UI.deleteAllItems(items);
     histPara.className = 'historyPara';
     todoStorage.removeAllTodos();
});