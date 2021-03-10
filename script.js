const container = document.querySelector('.container');
const form = document.querySelector('.form')
const input = document.querySelector('#title')
const error = document.querySelector('.errorMessage');

const URL = 'https://jsonplaceholder.typicode.com/todos';
let todos = [];

const todosList = async () => {
    const response = await fetch(`${URL}?_limit=10`);
    const data = await response.json();
    todos = data;
    createToDoList();    
}
todosList()

const createToDoList = () => {
    container.innerHTML = ''
    todos.forEach(item => {
    newTodo(item)
    })
}


const newTodo = (todo) => {

    let card = document.createElement('div');
    card.classList.add('d-flex','cards', 'justify-content-between',  'p-3', 'my-2', 'd-flex');
  
    let rightPart = document.createElement('div');
    rightPart.classList.add('d-flex',  'align-items-center');

    let leftPart = document.createElement('div');
    leftPart.classList.add('d-flex', 'align-items-center');
  
    let title = document.createElement('h4');
    //title.innerText = todo.title
    title.innerText = todo.title[0].toUpperCase() + todo.title.slice(1);
    let error = document.createElement('h4');
    error.classList.add('error');

    let checkbox = document.createElement('input')
    checkbox.classList.add('checkbox', 'form-check')
    checkbox.type = "checkbox";
    if (todo.completed === true) 
    {
        checkbox.checked = true
    };
    //checkbox.value = "value";
    //checkbox.id = "id";

    let button = document.createElement('button');
    button.classList.add('btn', 'btn-danger');
    button.innerText = 'Delete';
    
    button.addEventListener('click', () => {

      //console.log(checkbox.checked)
      if (checkbox.checked)
      {
        //setTimeout( ()=>error.innerHTML = '', 1000);
            deleteUser(todo.id)
        } else {
            error.innerHTML = 'Confirm checked';
            card.classList.add('invalid-input')
            setTimeout( ()=>error.innerHTML = '', 5000);
            setTimeout( ()=> card.classList.remove('invalid-input'), 5000);
        }
    })
  
    rightPart.appendChild(title);
    leftPart.append(checkbox,error,button );
    //leftPart.appendChild(checkbox);
    //leftPart.appendChild(error);
    //leftPart.appendChild(button);
    card.append(rightPart, leftPart);
    //card.appendChild(leftPart);
    container.appendChild(card);
  
  }

const addNewTodo = (title) => {
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        title,
        completed: false
      })
    })
    .then(res => res.json())
    .then(data => {
      //console.log(data)
  
     let newTodo = {
        ...data,
       id: uuidv4(),
      }
      //console.log(newTodo);
      todos.unshift(newTodo);
      createToDoList();
    })
  }

  const validate = (input) => {
    if (input.value === '') {
        error.innerText = 'Field can not be empty';
        error.classList.add('invalid');
        input.classList.add('invalid-input')
        return false
    }
    else {
        error.innerText= '';
        input.classList.remove('invalid-input')
        //input.classList.add('valid')
        return true
    }
    }

    const deleteUser = id => {
        fetch(`${URL}/${id}`, {
  method: 'DELETE',
}).then(() => {console.log(id);
        todos = [...todos.filter(item => item.id.toString() !== id.toString())];
         console.log(todos);
          createToDoList();
        });
      };
    /*const options = e => {
        // console.log(e.target);
        //const checkbox = e.target.closest('input') 
         //console.log(checkbox.checked);
        // if (checkbox.checked) 
        
            if 
            (e.target.dataset.btn === 'delete')
           /* { 
                if (e.target.closest('#checkbox')) */
          /*  {
            const id = e.target.closest('[data-id]').dataset.id;
            const todo = todos.find(item => item.id.toString() === id.toString())
            //e.target.dataset.name === 'checkbox' && console.log(input['checkbox']);
            //console.log(e.target.closest('#checkbox').checked);

             deleteUser(id)  ;
            }
          //}
      };
    
      container.addEventListener('click', options)*/
    


form.addEventListener('submit', e => {
    e.preventDefault();
    if (validate(input))  {
        addNewTodo(input.value);
    form.reset();}
})
