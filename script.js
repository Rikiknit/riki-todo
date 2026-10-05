const today = new Date();
const day = today.getDay();

const messages = [
    "日曜日！今日はゆっくりいこう！",
    "月曜日！今週もぼちぼちいこう！",
    "火曜日！今日も一緒にがんばろう！",
    "水曜日！週の真ん中だよ！",
    "木曜日！あとちょっと！",
    "金曜日！今週もおつかれさま！",
    "土曜日！今日は何する？"
];

const speech = document.getElementById("speech");

speech.textContent = messages[day];

const riki = document.querySelector(".riki");

const todos = [
    ["部屋を片付ける", "明日の準備をする"],       // 日曜日
    ["仕事に行く", "筋トレをする"],              // 月曜日
    ["仕事に行く", "ダンスに行く"],              // 火曜日
    ["仕事に行く", "ダンスに行く"],              // 水曜日
    ["仕事に行く", "洗濯をする"],                // 木曜日
    ["仕事に行く", "筋トレをする"],              // 金曜日
    ["部屋を掃除する", "ゆっくり休む"]           // 土曜日
];

const dayNames = [
    "日曜日",
    "月曜日",
    "火曜日",
    "水曜日",
    "木曜日",
    "金曜日",
    "土曜日"
];

const dayTitle = document.getElementById("day-title");
const todoList = document.getElementById("todo-list");

dayTitle.textContent = dayNames[day] + "のTODO";

const savedTodayTodos = JSON.parse(
    localStorage.getItem("rikiTodos-" + day)
);

const todayTodos = savedTodayTodos || todos[day];

todayTodos.forEach(function(todo) {
    const li = document.createElement("li");

    const text = typeof todo === "string" ? todo : todo.text;
    const checked = typeof todo === "string" ? false : todo.checked;

    li.innerHTML = `
        <input type="checkbox" ${checked ? "checked" : ""}>
        <span>${text}</span>
    `;

    if (checked) {
        li.classList.add("completed");
    }

    todoList.appendChild(li);
});

const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");

addButton.addEventListener("click", function() {
    const todoText = todoInput.value;

    if (todoText !== "") {

        const li = document.createElement("li");

        li.innerHTML = `
            <input type="checkbox">
            <span>${todoText}</span>
        `;

   todoList.appendChild(li);

saveTodos();

todoInput.value = "";
    }
});


todoList.addEventListener("change", function(event) {


    if (event.target.type === "checkbox") {

        const li = event.target.closest("li");

        if (event.target.checked) {
    li.classList.add("completed");

} else {
    li.classList.remove("completed");
}
saveTodos();
checkAllCompleted();
    }
});

function saveTodos() {
    const todoItems = [];

    todoList.querySelectorAll("li").forEach(function(li) {
        const text = li.querySelector("span").textContent;
        const checked = li.querySelector("input").checked;

        todoItems.push({
            text: text,
            checked: checked
        });
    });

    localStorage.setItem("rikiTodos-" + day, JSON.stringify(todoItems));
}

function checkAllCompleted() {
    const checkboxes = todoList.querySelectorAll('input[type="checkbox"]');

    if (checkboxes.length === 0) {
        return;
    }

    const allCompleted = Array.from(checkboxes).every(function(checkbox) {
        return checkbox.checked;
    });

    if (allCompleted) {
    speech.textContent = "ぜんぶできた！今日もおつかれさま！";

    riki.classList.remove("riki-happy");

    setTimeout(function() {
        riki.classList.add("riki-happy");
    }, 10);

} else {
    speech.textContent = messages[day];
    riki.classList.remove("riki-happy");
}
}

checkAllCompleted();
