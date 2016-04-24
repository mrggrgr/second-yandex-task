;
(function () {

    "use strict";
    // счетчик уникального ID (для студентов и команд)
    var uniqueId = 0;

    /***************************** Студенты *********************************/

    var Students = {

        // Массив студентов
        students: [],

        // Добавить студента
        add: function (firstName, lastName, team) {
            var newStudent = new Student(firstName, lastName, team);
            this.students.push(newStudent);
            return newStudent;
        }

    };

    /**
     * Student - функция-конструктор студента
     */
    function Student(firstName, lastName, team) {
        this.id = ++uniqueId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.team = team;
        this.tasks = [];
        this.favoriteMentors = [];
    }

    /**
     * Добавить индивидуальное задание для студента
     */
    Student.prototype.addTask = function (task) {
        this.tasks.push(task);
    }

    /**
     * Поставить оценку студенту за задание
     */
    Student.prototype.markTask = function (taskTitle, mark) {
        for (var c = 0; c < this.tasks.length; c++) {
            if (this.tasks[c].title == taskTitle) {
                this.tasks[c].mark = mark;
            }
        }
    }
    
    /**
     * Добавить ментора в список приоритезированных менторов этого студента
     */
    Student.prototype.addFavoriteMentor = function (mentor) {
        this.favoriteMentors.push(mentor);
    }

    /***************************** Команды *********************************/

    var Teams = {

        // Массив команд
        teams: [],

        // Добавить команду
        add: function (name) {
            this.teams.push(new Team(name));
            return false;
        }
    };

    /**
     * Team - функция-конструктор команды
     */
    function Team(name) {
        this.id = ++uniqueId;
        this.name = name;
        this.tasks = [];
    }

    /**
     * Добавить задание для этой команды
     */
    Team.prototype.addTask = function (task) {
        this.tasks.push(task);
    }
    
    /**
     * Поставить оценку команде за задание
     */
    Team.prototype.markTask = function (taskTitle, mark) {
        for (var c = 0; c < this.tasks.length; c++) {
            if (this.tasks[c].title == taskTitle) {
                this.tasks[c].mark = mark;
            }
        }
    }

    /***************************** Задания *********************************/

    var Tasks = {

        // Массив заданий
        tasks: [],

        // Добавить задание
        add: function (title, description) {
            this.tasks.push(new Task(title, description));
            return false;
        }
    };

    /**
     * Task - функция-конструктор задания
     */
    function Task(title, description) {
        this.title = title;
        this.description = description;
        this.mark = "";
    }

    /**
     * Присвоить задание команде/ам, студенту/ам, 
     * taskTitle - имя задания
     * target - IDs команд, студентов, кому присваивается задание
     */
    function assignTask(taskTitle, target) {
        for (var i = 0; i < window.shri.Tasks.tasks.length; i++) {
            if (window.shri.Tasks.tasks[i].title == taskTitle) {
                var task = window.shri.Tasks.tasks[i];
            }
        }
        for (var j = 0; j < target.length; j++) {
            for (var i = 0; i < window.shri.Students.students.length; i++) {
                if (target[j] === window.shri.Students.students[i].id) {
                    window.shri.Students.students[i].addTask(task);
                }
            }

            for (var i = 0; i < window.shri.Teams.teams.length; i++) {
                if (target[j] === window.shri.Teams.teams[i].id) {
                    window.shri.Teams.teams[i].addTask(task);
                }
            }
        }
    }

    // Сделать публичными
    window.shri = {
        Students: Students,
        Teams: Teams,
        Tasks: Tasks,
        assignTask: assignTask
    };

})();