let rt = document.querySelector(':root');
let mode = document.getElementById('mode');

mode.addEventListener('click', function(){
    if(mode.getAttribute('src') === "images/icon-sun.svg"){
        mode.setAttribute('src', 'images/icon-moon.svg')
        rt.style.setProperty('--bgMobile', 'url(images/bg-mobile-light.jpg)')
        rt.style.setProperty('--bgDesktop', 'url(images/bg-desktop-light.jpg)')
        rt.style.setProperty('--bgColor', 'hsl(236, 33%, 92%)')
        rt.style.setProperty('--listBG', 'hsl(0, 0%, 98%)')
        rt.style.setProperty('--textColor', 'hsl(235, 19%, 35%)')
        rt.style.setProperty('--btmColor', 'hsl(236, 9%, 61%)')
        rt.style.setProperty('--border', 'hsl(236, 33%, 92%)')
    }else {
        mode.setAttribute('src', 'images/icon-sun.svg')
        rt.style.setProperty('--bgMobile', 'url(images/bg-mobile-dark.jpg)')
        rt.style.setProperty('--bgDesktop', 'url(images/bg-desktop-dark.jpg)')
        rt.style.setProperty('--bgColor', 'hsl(235, 21%, 11%)')
        rt.style.setProperty('--listBG', 'hsl(235, 24%, 19%)')
        rt.style.setProperty('--textColor', 'hsl(234, 39%, 85%)')
        rt.style.setProperty('--btmColor', 'hsl(234, 11%, 52%)')
        rt.style.setProperty('--border', 'hsl(237, 14%, 26%)')
    }
})

let create = document.querySelector('.create');
let valueCr = document.getElementById('created');
let listEl = document.querySelector('.list');

create.addEventListener('submit', function(e){
    e.preventDefault()
    if(valueCr.value !== ''){
        createdToDo = valueCr.value
        listEl.insertAdjacentHTML('beforeend', `
        <li class='listRow'><form method="get" draggable="true">
        <input type="checkbox" aria-label="check" class="checkboxes">
        <p class='todoThing'>${createdToDo}</p>
        <img src="images/icon-cross.svg" alt="cross" class='cross'>
      </form></li>
        `)
    }
    localStorage.setItem('todo', `${valueCr.value}`)
    valueCr.value = ''
    numberLeft()
    forCheckBox()
    deleteCross()
})

let numbLeft = document.getElementById('dynamicNum')


function forCheckBox(){
    let checkboxes = document.querySelectorAll('.checkboxes')
    let toDoText = document.querySelectorAll('.todoThing')
    for(let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('click', function(){
            if(checkboxes[i].checked == true){
                toDoText[i].classList.add('checked')
            }else {
                toDoText[i].classList.remove('checked')
            }
            numberLeft()
        })
    }
}
forCheckBox()

function numberLeft(){
    let listRow = document.querySelectorAll('.listRow')
    let checkedList = document.querySelectorAll('.checked')
    numbLeft.textContent = listRow.length - checkedList.length
}
numberLeft()

let clearBtn = document.getElementById('clearCp')
clearBtn.addEventListener('click', function(e){
    e.preventDefault
    let checkboxes = document.querySelectorAll('.checkboxes')
    let listRow = document.querySelectorAll('.listRow')
    for(let i = 0; i < listRow.length; i++){
        if(checkboxes[i].checked === true){
            listRow[i].remove();
            checkboxes[i].checked = false
        }
    }
});

function deleteCross(){
    let cross = document.querySelectorAll('.cross');
    let listRow = document.querySelectorAll('.listRow')
    for(let i = 0; i < cross.length; i++){
    cross[i].addEventListener('click', function(e){
        e.preventDefault
        listRow[i].remove()
        numberLeft()
    });
}
}
deleteCross()


let all = document.getElementById('all');
let active = document.getElementById('active');
let completed = document.getElementById('completed')


all.addEventListener('click', function(){
    let listRow = document.querySelectorAll('.listRow')
    all.style.color = 'hsl(220, 98%, 61%)';
    active.style.color = 'var(--btmColor)';
    completed.style.color = 'var(--btmColor)';
    for(let i = 0; i < listEl.length; i++){
        listRow[i].style.display = listRow[i].style.display === 'none' ? 'flex' : 'flex';
    }
})

active.addEventListener('click', function(e){
    e.preventDefault
    let toDoText = document.querySelectorAll('.todoThing')
    let listRow = document.querySelectorAll('.listRow')
    let row = document.querySelectorAll('.row')
    for(let i = 0; i < listRow.length; i++){
        if(toDoText[i].classList.contains('checked')){
            row[i].style.display = 'none';
        }
        if(!toDoText[i].classList.contains('checked')){
            row[i].style.display = 'flex';
        }
    }
    active.style.color = 'hsl(220, 98%, 61%)';
    all.style.color = 'var(--btmColor)';
    completed.style.color = 'var(--btmColor)';
})

completed.addEventListener('click', function(e){
    e.preventDefault
    let toDoText = document.querySelectorAll('.todoThing')
    let listRow = document.querySelectorAll('.listRow')
    let row = document.querySelectorAll('.row')
    for(let i = 0; i < listRow.length; i++){
        if(!toDoText[i].classList.contains('checked')){
            row[i].style.display = 'none';
        }
        if(toDoText[i].classList.contains('checked')){
            row[i].style.display = 'flex';
        }
    }
    completed.style.color = 'hsl(220, 98%, 61%)';
    active.style.color = 'var(--btmColor)';
    all.style.color = 'var(--btmColor)';
})

let dragItem = null;
let listRow = document.querySelectorAll('.listRow')
for(let i = 0; i < listRow.length; i++){
    listRow[i].addEventListener('dragstart', function(){
        dragItem = listRow[i];
        setTimeout(() => {
            listRow[i].style.display = 'none'
        }, 0);
    })

    listRow[i].addEventListener('dragend', function(){
        dragItem = listRow[i];
        setTimeout(() => {
            listRow[i].style.display = 'block'
        }, 0);
    })

    let testing = document.querySelector('.testing')
    testing.addEventListener('drop', function(){
        testing.append(dragItem);
    })

    testing.addEventListener('dragover', function(e){
        e.preventDefault()
    })
}

window.addEventListener('load', function(){
    let storedList = localStorage.getItem('todo')
    if(storedList !== null){
        listEl.innerHTML+= `<li class='listRow'><form method="get" draggable="true">
        <input type="checkbox" aria-label="check" class="checkboxes">
        <p class='todoThing'>${storedList}</p>
        <img src="images/icon-cross.svg" alt="cross" class='cross'>
      </form></li>`
        console.log(localStorage)
    }
    deleteCross()
    numberLeft()
    forCheckBox()
})