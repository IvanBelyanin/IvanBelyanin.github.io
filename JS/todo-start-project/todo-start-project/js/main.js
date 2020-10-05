const form = document.querySelector('#newTaskForm');
const input = document.querySelector('#addNewTask');
const tasksList = document.querySelector('#list-group');
const emptyListItem = document.querySelector('#empty-list-item');

//Загрузить данные
loadData();

//Добавление задачи

form.addEventListener('submit', function(event){
    event.preventDefault();

    const taskText = input.value;

    const taskHTML = `<li class="list-group-item d-flex justify-content-between">
    <span contenteditable="true" class="task-title">${taskText}</span>
    <div>
        <button type="button" data-action="ready" class="btn btn-light align-self-end">Готово</button>
        <button type="button" data-action="delete-task" class="btn btn-light align-self-end">Удалить</button>
    </div>
    </li>`;

    tasksList.insertAdjacentHTML('afterbegin',  taskHTML);

    //Функция удаления начального списка
    toggleEmptyListItem ();

    //Очищаем поле ввода
    input.value='';

    //Возвращаем фокус на поле с вводом
    input.focus();

    //Сохранили данные
    saveData ();
});


//Работа с кнопками
tasksList.addEventListener('click', function (event){
    event.target
    if (event.target.getAttribute('data-action') == 'delete-task'){
        event.target.closest('.list-group-item').remove();
    toggleEmptyListItem ();
    saveData ();
    } else if (event.target.getAttribute('data-action') == 'ready'){
        const parentElement = event.target.closest('.list-group-item');
        
        parentElement.querySelector('span.task-title').classList.add('task-title--done');

        tasksList.insertAdjacentElement('beforeend', parentElement);

        parentElement.querySelector('button[data-action="ready"]').remove();

        //Сохранили данные
        saveData ();
    }
});

function toggleEmptyListItem (){
    if (tasksList.children.length>1) {
        emptyListItem.style.display = "none";
    }
    else {
        emptyListItem.style.display = "block";
    }
};

// localStorage.setItem('name', 'Iwan');

// localStorage.getItem('name');

//Функция сохранения данных
function saveData (){
    localStorage.setItem('todoList', tasksList.innerHTML);
};

//Функция загрузки данных
function loadData(){
    if (localStorage.getItem('todoList')){
        tasksList.innerHTML = localStorage.getItem('todoList');
    } 
};


