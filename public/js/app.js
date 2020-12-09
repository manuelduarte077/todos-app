const uri = location.origin
let sendButton = document.getElementById('save');
let textInput = document.getElementById('text');
let listElement = document.getElementById('list_elements');

textInput.addEventListener('input', (ev) => {
    sendButton.disabled = !(ev.target.value.length > 0) ? true : false;

});

if(textInput.value.length > 1) {
    sendButton.disabled = false
}

sendButton.addEventListener('click', (ev) => {
    ev.preventDefault()
    
    sendData(textInput.value)
    textInput.value = ''
    sendButton.disabled = true
    getAllTodo()

})



function sendData(text) {
    let customURI = `${uri}/add?text=${text}`
    fetch(customURI, {
        method: 'POST',    
    }).then(response => {
        if(!response.status == 200) {
            alert('un error')
        }
    }).catch(er => console.log('no se cargaron los datos'));
}


document.body.onload =  (e) => {
    getAllTodo()
}

function changeCheckbox(checkbox) {
    let id = checkbox.getAttribute('data-id')

    updateState(id, checkbox.checked)
    getAllTodo()
}

function clickDelete(id) {
    deleteTodo(id)
    getAllTodo()
}

function updateState(id, status) {
    let customURI = `${uri}/todos/update?id=${id}&completed=${status}`
    fetch(customURI, {
        method: 'PUT',    
    }).then(response => {
        if(!response.status == 200) {
            alert('un error')
        }
    }).catch(er => console.log('no se cargaron los datos'));
}

function deleteTodo(id) {
    let customURI = `${uri}/todos/delete?id=${id}`
    fetch(customURI, {
        method: 'DELETE',    
    }).then(response => {
        if(!response.status == 200) {
            alert('un error')
        }
    }).catch(er => console.log('no se cargaron los datos'));
}

function getAllTodo(){
    let customURI = `${uri}/todos`
    fetch(customURI, {
        method: 'GET',
    }).then(response => response.json())
    .then(data => addToDOM(data)).catch(er => console.log('no se cargaron los datos'));
}


function addToDOM({data}) {
    listElement.innerHTML = ""
    data.forEach(e => {
        listElement.innerHTML += htmlElement(e)
    });

}

function htmlElement({id, text, completed}) {
    return `<div class="item">
        <label for="${id}" class="item__container">
            <input class="item__checkbox" type="checkbox" id="${id}" ${completed == 1 ? "checked" : ""} name="checkbox" data-id="${id}" onchange="changeCheckbox(this)">
            <p class="item__description ${completed == 1 ? "checkbox--checked" : ""}">${text}</p>
            <button class="button item__button" onclick="clickDelete(${id})">Remove</button>
        </label>
    </div>`;
}

