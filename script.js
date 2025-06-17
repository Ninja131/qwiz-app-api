const container = document.querySelector(".container");

// section 1 Start 
const startSection  = container.querySelector(".startSection");
const startbtn  = container.querySelector(".startbtn");


// section 2 real Qwiz
const answerBox = container.querySelectorAll(".answers");
const icons = container.querySelectorAll(".icons");
const questionBox = container.querySelector(".questionBox");
const question = container.querySelector(".question");
const answerContainer = container.querySelector(".answerBox");
const btn = container.querySelector(".btn");


// end section 3 qwiz 
const endSection = container.querySelector(".endSection");
const ScoreIcon = container.querySelector(".ScoreIcon");
const PlayAgain = container.querySelector(".PlayAgain");
const resultHeading = container.querySelector(".resultHeading");



const url = 'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple';
const displayAnswer = [...answerBox];
const icnosArray = [...icons];
console.log(icnosArray);







//response store
let ResponseArray = [];


let AllAnswers = []
let InCorrectAnswers = [];
let correctAnswer= '';

let num = 0;
let score =0;
let CurrentQuestionIndex = 0;







//calling up the api
async function myData(){
    let response = await fetch(url);
    let data = await response.json();
    
    //store response of 10 q&a
    ResponseArray = data.results;

}



function NextQwiz(){
    // Clear old data
    AllAnswers = []; // ✅ RESET here!
    correctAnswer= '';
    


    if(num<10){
        

        //store incorrect answers in array and push them in all answers
        InCorrectAnswers = ResponseArray[num].incorrect_answers;
        InCorrectAnswers.forEach(element => {
        AllAnswers.push({
            type: "incorrect",
            answer: element
            })   
            });
        
        // store correct answers and push it in AllAnswer array
         correctAnswer = ResponseArray[num].correct_answer;
        AllAnswers.push({
        type: "correct",
        answer: correctAnswer
        });

        //shuffel array
        shuffleArray(AllAnswers);

        //show Question
        question.innerText = ResponseArray[num].question;
    

        //show Answers
        displayAnswer.forEach((element,index) => {
        element.dataset.name = AllAnswers[index].type
        element.innerText = AllAnswers[index].answer;
         });


        //remove the selected state from new displayed answer containers
        displayAnswer.forEach(element => {
        element.classList.remove("notTrue","true","disable")
         });



         // CurrentQuestion  icon status
        icnosArray[num].classList.add('CurrentQuestion');
        CurrentQuestionIndex = num;


        console.log(num);
        num++;
        btn.classList.add('hide');
        answerSelected = false;
        
        

    }
    else{
        questionBox.classList.add('hide');
        answerContainer.classList.add('hide');
        btn.classList.add('hide');

        endSection.classList.remove('hide');
        PlayAgain.classList.remove('hide');
        ScoreIcon.innerText = score;
        resultHeading.innerText = `You Scored ${score} out of 10!`

    }


}





btn.addEventListener("click",NextQwiz);



startbtn.addEventListener("click",()=>{
    startbtn.classList.add("hide");
    startSection.classList.add("hide");

    questionBox.classList.remove("hide");
    answerContainer.classList.remove("hide");
    myData();
    setTimeout(()=>{
         NextQwiz();
    },2000)
    
})













function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    
    // Swap elements at i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}





let answerSelected = false;
answerContainer.addEventListener("click",(e)=>{
    if (answerSelected) return; // ⛔ Prevent multiple selections
     let clicked = e.target;
    console.log(clicked)
    if (!clicked.classList.contains("answers")) return; // 🛑 Only handle clicks on answers
    answerSelected = true; // ✅ Lock further answers

    console.log(e.target)
    if(e.target.dataset.name === "incorrect"){
        e.target.classList.add("notTrue");
        btn.classList.remove('hide');
        icnosArray[CurrentQuestionIndex].classList.add('notTrue');




        displayAnswer.forEach(element => {
            if(element.dataset.name ==="correct"){
                element.classList.add("true");
    
            }
            else{
                element.classList.add("disable");
                clicked.classList.remove("disable");
            }
            


        });

    }
    else if (e.target.dataset.name === "correct"){
        btn.classList.remove('hide');
        e.target.classList.add("true");
        icnosArray[CurrentQuestionIndex].classList.add('true');

        score++;
    }

});






PlayAgain.addEventListener('click',()=>{

    PlayAgain.classList.add('hide');
    endSection.classList.add('hide');

    questionBox.classList.remove("hide");
    answerContainer.classList.remove("hide");
    btn.classList.remove("hide");
    score =0;
    num=0;
    icnosArray.forEach(element => {
        element.classList.remove('CurrentQuestion','true','notTrue');
    });

    myData();
    NextQwiz();

})





















