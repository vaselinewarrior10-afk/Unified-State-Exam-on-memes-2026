const buttonStartExam = document.getElementById("buttonStart");
const buttonFinishWork = document.getElementById("buttonFinishWork");
const buttonLeave = document.getElementById("buttonLeave");
const buttonTimeIsUp = document.getElementById("buttonTimeIsUp");

const registrationPage = document.getElementById("registrationPage");
const examPage = document.getElementById("examPage");
const resultPage = document.getElementById("resultPage");

const countdown = document.getElementById("countdown");
let time = 235;
let timeSeconds = time * 60;
let stopTimer = false;
let startTime = 0;
const totalTime = document.getElementById("totalTime");

examPage.style.display = "none";
resultPage.style.display = "none";

let rawPoint = 0;
let scaledPoint = 0;
const rawScores = document.getElementById("rawScores");
const scaledScores = document.getElementById("scaledScores");
const totalPoint = document.getElementById("totalPoint");

const questionScores = [2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,5,5,5,6,6,6,7,7]

const examPassed = document.getElementById("examPassed");

let examStart = false;

let surname
let name
let patronymic
const errorMessage = document.getElementById("errorMessage");
errorMessage.style.display = "none";
const fullName = document.getElementById("fullName");

const noticeOfExclusion = document.getElementById("noticeOfExclusion");
noticeOfExclusion.style.display = "none";

const examContent = document.getElementById("examContent");

const questionInput = document.getElementsByClassName("questionInput");
let userAnswers = [];
let correctAnswers = ["1","3","1","2","4","2","1","2","2","2","3","4","2","2","3241","2","воздухан",
    "профессор Чудаков","вы чё творите ЖКХ","45",
    "обогащённый уран","чмошник","Эллис","Джимоти","Эмми Россум",
    "Бык тупогуб тупогубенький бычок у быка бела губа была тупа"]

const answersTableBody = document.getElementById("answersTableBody");

const memeRank = document.getElementById("memeRank");

const timeIsUp = document.getElementById("timeIsUp");

setInterval(updateCountDown,1000);

    function updateCountDown(){
        if(examStart === true && stopTimer === false){
            timeSeconds--;
            let hours = Math.floor(timeSeconds/3600);
            let minutes = Math.floor((timeSeconds % 3600)/60);
            let seconds = timeSeconds % 60;
            countdown.textContent = String(hours).padStart(2,"0") + ":" + String(minutes).padStart(2,"0") + ":" + String(seconds).padStart(2,"0");
            if(timeSeconds <= 0){
                timeIsUp.style.display = "flex";
                stopTimer = true;
                document.body.style.overflow = "hidden";
                examContent.inert = true;
            }
        }
    }

buttonLeave.addEventListener("click",function(){
    location.reload();
})

document.addEventListener("visibilitychange", function(){
    if(examStart === true && stopTimer === false){
        noticeOfExclusion.style.display = "block";
        examContent.style.userSelect = "none";
        document.body.style.overflow = "hidden";
        examContent.inert = true;
        stopTimer = true;
    }
})

buttonStartExam.addEventListener("click",function()
{
    startTime = timeSeconds;
    surname = document.getElementById("surname").value;
    name = document.getElementById("name").value;
    patronymic = document.getElementById("patronymic").value;

    if(surname.trim() === "" || name.trim() === "" || patronymic.trim() === ""){
        errorMessage.style.display = "block";
        return;
    }

    registrationPage.style.display = "none";
    examPage.style.display = "flex";
    examStart = true;
})

buttonTimeIsUp.addEventListener("click",finishExam);
buttonFinishWork.addEventListener("click",finishExam);

function finishExam(){
    window.scrollTo(0,0);
    document.body.style.overflow = "visible";
    examStart = false;
    fullName.textContent = surname + " " + name + " "+ patronymic;
    examPage.style.display = "none";
    resultPage.style.display = "flex";

    let spentTime = startTime - timeSeconds;
    let hours = Math.floor(spentTime/3600);
    let minutes = Math.floor((spentTime % 3600)/60);
    let seconds = spentTime % 60;
    totalTime.textContent = "Время сдачи экзамена - " + String(hours).padStart(2,"0") + ":" + String(minutes).padStart(2,"0") + ":" + String(seconds).padStart(2,"0");

    for(let i = 0; i<questionInput.length;i++){
        userAnswers[i] = questionInput[i].value;
    }
    
    for(let i = 0; i < userAnswers.length;i++){
        if(userAnswers[i].trim().toLowerCase() === correctAnswers[i].trim().toLowerCase()){
            rawPoint++;
            scaledPoint += questionScores[i];
        }
    }

    if(scaledPoint < 27){
        examPassed.textContent = "ЭКЗАМЕН НЕ СДАН"
        totalPoint.style.color = "rgb(190,55,55)";
        examPassed.style.color = "rgb(190,55,55)";
        examPassed.style.backgroundColor = "rgb(255,220,220)";
    }

    totalPoint.textContent = scaledPoint + "/100";
    rawScores.textContent = "Первичных баллов набрано - " + rawPoint + "/26";
    scaledScores.textContent = "Вторичных баллов набрано - " + scaledPoint + "/100";
    for(let i = 0; i < userAnswers.length ; i++){
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        const cell2 = document.createElement("td");
        const cell3= document.createElement("td");
        const cell4 = document.createElement("td");
        row.appendChild(cell)
        row.appendChild(cell2)
        row.appendChild(cell3)
        row.appendChild(cell4)
        answersTableBody.appendChild(row);
        cell.textContent = i+1;
        cell2.textContent = userAnswers[i];
        cell3.textContent = correctAnswers[i];
        if(userAnswers[i].trim().toLowerCase() === correctAnswers[i].trim().toLowerCase()){
            cell4.style.backgroundColor = "rgb(220, 245, 230)";
            cell4.textContent = questionScores[i];
        }
        else{
            cell4.style.backgroundColor = "rgb(255,220,220)";
            cell4.textContent = 0;
        }
    }

    if(scaledPoint <= 26){
        memeRank.textContent = "Не знаком с мем-культурой";
    }
    else if( 27 <= scaledPoint && scaledPoint <= 39){
        memeRank.textContent = "Новичок мем-культуры";
    }
    else if(40 <= scaledPoint && scaledPoint <= 59){
        memeRank.textContent = "Любитель мемов";
    }
    else if(60 <= scaledPoint && scaledPoint <= 69){
        memeRank.textContent = "Мем-эксперт";
    }
    else if(70 <= scaledPoint && scaledPoint <= 79){
        memeRank.textContent = "Мемолог III степени";
    }
    else if(80 <= scaledPoint && scaledPoint<= 89){
        memeRank.textContent = "Мемолог II степени";
    }
    else if(90 <= scaledPoint && scaledPoint<= 99){
        memeRank.textContent = "Мемолог I степени";
    }
    else if(scaledPoint === 100){
        memeRank.textContent = "Верховный мемолог";
    }
}