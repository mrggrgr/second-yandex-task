// Входные данные
window.shri.Students.add ("Имя 1", "Фамилия 1", "Дрим-Тим 1");
window.shri.Students.add ("Имя 2", "Фамилия 2", "Дрим-Тим 2");
window.shri.Students.add ("Имя 3", "Фамилия 3", "Дрим-Тим 1");
window.shri.Students.add ("Имя 4", "Фамилия 4", "Дрим-Тим 2");
window.shri.Students.students[0].addFavoriteMentor ("Ментор 1");
window.shri.Students.students[1].addFavoriteMentor ("Ментор 1");
window.shri.Students.students[1].addFavoriteMentor ("Ментор 3");
window.shri.Students.students[2].addFavoriteMentor ("Ментор 2");
window.shri.Students.students[3].addFavoriteMentor ("Ментор 1");
window.shri.Teams.add ("Дрим-Тим 1");
window.shri.Teams.add ("Дрим-Тим 2");
window.shri.Tasks.add("Задание 1", "Описание задания 1");
window.shri.Tasks.add("Задание 2", "Описание задания 2");

var row, tbody;

// Обновить список команд для выбора
function updateTeamSelect() {
    var select = document.getElementById("team");
    select.innerHTML = "";
    for (var i = 0; i < window.shri.Teams.teams.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", window.shri.Teams.teams[i].name.toString());
        option.innerHTML = window.shri.Teams.teams[i].name.toString();
        select.appendChild(option);
    }
}

// Обновить список задач студента
function updateStudentTasks(el, student) {
    for (var i = 0; i < window.shri.Students.students.length; i++) {
        if (student == window.shri.Students.students[i].id) {
            el.parentElement.previousElementSibling.innerHTML = "";
            for (var c = 0; c < window.shri.Students.students[i].tasks.length; c++) {
                el.parentElement.previousElementSibling.innerHTML += "<span class='title'>" + window.shri.Students.students[i].tasks[c].title + "</span>";
                el.parentElement.previousElementSibling.innerHTML += "<span class='mark'>" + window.shri.Students.students[i].tasks[c].mark + "</span><br>";
            }
            
        }
    }
}

// Обновить списки задач для назначения студентам
function updateTaskSelects() {
    var selects = document.getElementsByClassName("task");
    for (var j = 0; j < selects.length; j++) {
        selects[j].innerHTML = "";
        for (var i = 0; i < window.shri.Tasks.tasks.length; i++) {
            var option = document.createElement("option");
            option.setAttribute("value", window.shri.Tasks.tasks[i].title.toString());
            option.innerHTML = window.shri.Tasks.tasks[i].title.toString();
            selects[j].appendChild(option);
        }
    }
}

// Создать ячейку таблицы
function createCell (content, type) {
    if (arguments.length > 0) {
        if (type) {
            var cell = document.createElement(type);
        } else {
            var cell = document.createElement('td');
        }
        if (typeof(content) == "string") {
            cell.innerHTML = content;
        } else {
            for (var c = 0; c < content.length; c++) {
                cell.innerHTML += content[c] + "<br>";
            }
        }
        row.appendChild(cell);
    } else {
        return false;
    }
}

// Создать новую строку таблицы
function createRow () {
    // Если в ф-цию были переданы параметры
    if (arguments.length > 0) {
        row = document.createElement("tr");
        // Для каждого переданного параметра - создать ячейку
        for (var c = 0; c < arguments.length; c++) {
            createCell (arguments[c]);
        }
        return row;
    } else {
        return false;
    }
}

// Добавить студента в таблицу
function addStudentToTable(el) {
    var student = window.shri.Students.add (el.parentElement.querySelector('#firstName').value, el.parentElement.querySelector('#lastName').value, el.parentElement.querySelector('#team').value);
    tbody.appendChild(
            createRow(
                student.firstName + " " + student.lastName,
                student.team,
                student.favoriteMentors,
                '<div>' + student.tasks + '</div>' + '<div><select class="task"></select><button type="button" onclick="window.shri.assignTask(this.previousElementSibling.value,[' + student.id + ']); updateStudentTasks(this, ' + student.id + ');">Назначить</button></div>'
        ));
    updateTaskSelects();
}

function display() {    
    
    // найти div - container для таблицы
    var container = document.getElementById("studentsTable");
    
    // создать таблицу
    var table = document.createElement("table");
    
    // заголовок таблицы
    var thead = table.createTHead();
    row = document.createElement("tr");
    createCell("Студент", "th");
    createCell('Команда <div><input id="name" type="text"><button type="button" onclick="window.shri.Teams.add (this.parentElement.querySelector(\'#name\').value); updateTeamSelect();">Добавить команду</button></div>', "th");
    createCell("Менторы", "th");
    createCell('Задания индивидуальные <div><input id="title" type="text"><br><textarea id="description"></textarea><button type="button" onclick="window.shri.Tasks.add(this.parentElement.querySelector(\'#title\').value, this.parentElement.querySelector(\'#description\').value); updateTaskSelects();">Добавить задание</button></div>', "th");
    thead.appendChild(row);
    
    // тело таблицы
    tbody = document.createElement('tbody');
    for (i = 0; i < window.shri.Students.students.length; i++) {
        var student = window.shri.Students.students[i];
        tbody.appendChild(
            createRow(
                student.firstName + " " + student.lastName,
                student.team,
                student.favoriteMentors,
                '<div>' + student.tasks + '</div>' + '<div><select class="task"></select><button type="button" onclick="window.shri.assignTask(this.previousElementSibling.value,[' + student.id + ']); updateStudentTasks(this, ' + student.id + ');">Назначить</button></div>'
        ));
    }
    table.appendChild(tbody);
    
    // футер таблицы
    var tfooter = table.createTFoot();
    tfooter.appendChild(
            createRow(
                '<div><input id="firstName" type="text"><input id="lastName" type="text"><select id="team"></select><button type="button" onclick="addStudentToTable(this)">Добавить студента</button></div>',
                ' ',
                ' ',
                ' '
        ));
   
    // вставить таблицу в container
    container.appendChild(table);
}

display();