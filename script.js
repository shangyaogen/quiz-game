var questions = [
    {
        question: "JavaScript中，哪个方法可以把字符串转成整数？",
        options: ["parseInt()", "parseFloat()", "Number.toFixed()", "toString()"],
        answer: 0
    },
    {
        question: "HTML中，哪个标签用来创建超链接？",
        options: ["&lt;link&gt;", "&lt;a&gt;", "&lt;href&gt;", "&lt;url&gt;"],
        answer: 1
    },
    {
        question: "CSS中，哪个属性用来改变背景颜色？",
        options: ["color", "bgcolor", "background-color", "font-color"],
        answer: 2
    },
    {
        question: "哪个不是JavaScript的数据类型？",
        options: ["string", "boolean", "float", "undefined"],
        answer: 2
    },
    {
        question: "CSS中 position: absolute 是相对于谁定位的？",
        options: ["浏览器窗口", "父元素", "最近的定位祖先元素", "body"],
        answer: 2
    },
    {
        question: "JavaScript中 === 和 == 的区别是？",
        options: ["没有区别", "===会比较类型", "==会比较类型", "===更慢"],
        answer: 1
    },
    {
        question: "HTML5中，哪个标签用来播放视频？",
        options: ["&lt;media&gt;", "&lt;movie&gt;", "&lt;video&gt;", "&lt;play&gt;"],
        answer: 2
    },
    {
        question: "CSS的flex布局中，主轴默认方向是？",
        options: ["从上到下", "从下到上", "从左到右", "从右到左"],
        answer: 2
    },
    {
        question: "在JavaScript里，数组的第一个元素的索引是？",
        options: ["1", "0", "-1", "取决于数组长度"],
        answer: 1
    },
    {
        question: "HTTP状态码404表示什么？",
        options: ["服务器错误", "请求成功", "页面未找到", "重定向"],
        answer: 2
    }
];

var currentQuestion = 0;
var score = 0;
var answered = false;

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";
    document.getElementById("result-screen").style.display = "none";
    showQuestion();
}

function showQuestion() {
    answered = false;
    var q = questions[currentQuestion];

    document.getElementById("question-count").textContent =
        "第 " + (currentQuestion + 1) + "/" + questions.length + " 题";
    document.getElementById("score-display").textContent = "得分: " + score;
    document.getElementById("question-text").textContent = q.question;

    var optionsHtml = "";
    for (var i = 0; i < q.options.length; i++) {
        optionsHtml += '<button class="option-btn" onclick="selectOption(' + i + ')">';
        optionsHtml += q.options[i];
        optionsHtml += "</button>";
    }
    document.getElementById("options").innerHTML = optionsHtml;

    document.getElementById("feedback").style.display = "none";
}

function selectOption(index) {
    if (answered) return;
    answered = true;

    var q = questions[currentQuestion];
    var buttons = document.querySelectorAll(".option-btn");
    var feedback = document.getElementById("feedback");

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.add("disabled");
    }

    buttons[q.answer].classList.add("correct");

    if (index === q.answer) {
        score += 10;
        feedback.textContent = "回答正确！";
        feedback.className = "correct";
    } else {
        buttons[index].classList.add("wrong");
        feedback.textContent = "回答错误，正确答案是：" + q.options[q.answer];
        feedback.className = "wrong";
    }

    feedback.style.display = "block";
    document.getElementById("score-display").textContent = "得分: " + score;

    setTimeout(function () {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";

    document.getElementById("final-score").textContent = score + " / " + (questions.length * 10);

    var msg = "";
    var percent = score / (questions.length * 10);
    if (percent === 1) {
        msg = "满分！太厉害了！";
    } else if (percent >= 0.8) {
        msg = "很不错，大部分都答对了";
    } else if (percent >= 0.6) {
        msg = "还行，继续加油";
    } else if (percent >= 0.4) {
        msg = "得多复习复习了";
    } else {
        msg = "基础不太行啊，回去好好看看书吧";
    }
    document.getElementById("result-msg").textContent = msg;
}

function restartQuiz() {
    startQuiz();
}