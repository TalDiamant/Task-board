var arrTasks = [];

setBackup();

function createTask(content, date, time) {
    var task = {
        content: content,
        date: date,
        time: time,
    }
    return task;
}

function setBackup() {
    var taskBackup = JSON.parse(localStorage.getItem("notes-backup"));

    if (taskBackup !== null) {
        arrTasks = taskBackup;
    }
    console.log(arrTasks);
    console.log(taskBackup);
    for (var i = 0; i < arrTasks.length; i++) {
        makeTaskElement(arrTasks[i].content, arrTasks[i].date, arrTasks[i].time);
    }
}

function existTask(content, date, time) {
    for (var i = 0; i < arrTasks.length; i++) {
        if (content == arrTasks[i].content && date == arrTasks[i].date) {
            if (time == "" || time == arrTasks[i].time) {
                return arrTasks[i];
            }
        }
    }
    return false;
}

function valueCheck(content, date, time) {
    if (content == "") {
        document.getElementById("message-container").innerHTML = "Please enter content";
        return false;
    }
    else if (date == "") {
        document.getElementById("message-container").innerHTML = "Please pick a date";
        return false;
    }
    else if (existTask(content, date, time) != false) {
        document.getElementById('message-container').innerHTML = "Existing task!";
        return false;
    } else {
        return true;
    }
}

function addTask() {
    var content = document.forms["task"]["content"].value;
    var date = document.forms["task"]["date"].value;
    var time = document.forms["task"]["time"].value;


    if (valueCheck(content, date, time) == true) {
        arrTasks.push(createTask(content, date, time));
        localStorage.setItem("notes-backup", JSON.stringify(arrTasks));
        document.getElementById('message-container').innerHTML = "Task added!";
        makeTaskElement(content, date, time);
        clearTask();
    }
}

function makeTaskElement(content, date, time) {

    var tasksContainer = document.getElementById('tasksContainer');

    var div = document.createElement("div");
    div.className = "div_style";

    var button_remove = document.createElement('button');
    button_remove.type = "button";
    button_remove.className = "far fa-times-circle fa-lg";
    button_remove.onclick = removeTask;

    var div_content = document.createElement('textarea');
    div_content.type= "textarea";
    div_content.className = "content";
    div_content.append(content);

    var div_date = document.createElement('div');
    div_date.className = "date";
    div_date.append(date);

    var div_time = document.createElement('div');
    div_time.className = "time";
    div_time.append(time);

    div.append(button_remove);
    div.append(div_content);
    div.append(div_date);
    div.append(div_time);

    tasksContainer.append(div);
}

function removeTask() {
    this.parentElement.parentElement.removeChild(this.parentElement);

    var content = this.parentElement.children[1].innerHTML;
    var date = this.parentElement.children[2].innerHTML;
    var time = this.parentElement.children[3].innerHTML;
    var index = arrTasks.indexOf(existTask(content, date, time));

    arrTasks.splice(index, 1);
    localStorage.setItem('notes-backup', JSON.stringify(arrTasks));
    document.getElementById('message-container').innerHTML = "Task is removed";
}

function clearTask() {
    document.forms["task"]["content"].value = "";
    document.forms["task"]["date"].value = "";
    document.forms["task"]["time"].value = "";
    document.getElementById('message-container').innerHTML = "";
}