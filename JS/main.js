let trySection = document.querySelector(".try-section")
let changeWord = document.querySelector(".change-word")

let numberOfInputWritten = 0;
let correctChar = 0;
let nextFormIndex = 1;
let allForms ="";

const words = [
    "planet", "silver", "orange", "little", "bridge", "castle", "rocket", "forest", "spring", "summer",
    "winter", "autumn", "butter", "yellow", "purple", "animal", "school", "friend", "circle", "square",
    "nature", "hunter", "doctor", "driver", "window", "guitar", "violin", "strong", "weaker", "father",
    "mother", "sister", "cousin", "garden", "flower", "poetry", "letter", "chance", "people", "family",
    "danger", "energy", "public", "secret", "system", "future", "magnet", "random", "market", "number"
];

let randomWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
console.log(randomWord);


changeWord.onclick = ()=>{
    randomWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    createTryElement()
    correctChar = 0;
    numberOfInputWritten = 0;
    nextFormIndex = 1;
    console.log(randomWord);
}


function createTryElement(){
    let ele = "";
    for(var i = 1 ; i <= 5 ; i++){
        ele +=
        `
        <div class="try-box row mb-2">
            <p class="col-lg-2 fw-bold fs-5 mb-0 p-2 d-flex justify-content-center align-items-center"><span id="try-${i}">try ${i}</span></span></p>
            <div class="inputs-feild col-lg-10">
                <form action="" class="row"  id="try-form-${i}">
                    <div class="col-2"><input type="text" class="form-control text-center" id="0-form-${i}"></div>
                    <div class="col-2"><input type="text" class="form-control text-center" id="1-form-${i}"></div>
                    <div class="col-2"><input type="text" class="form-control text-center" id="2-form-${i}"></div>
                    <div class="col-2"><input type="text" class="form-control text-center" id="3-form-${i}"></div>
                    <div class="col-2"><input type="text" class="form-control text-center" id="4-form-${i}"></div>
                    <div class="col-2"><input type="text" class="form-control text-center" id="5-form-${i}"></div>
                </form>
            </div>
        </div>
        `
    }
    trySection.innerHTML = ele;
    allForms = Array.from(document.forms)
    disapleAntherForms(1)
}
createTryElement()



document.addEventListener("click",(e)=>{
    if(e.target.tagName === "INPUT"){
        e.target.oninput = ()=>{
            if(e.target.value.length === 1){
                numberOfInputWritten++
                e.target.disabled = true
                if(randomWord.includes(`${e.target.value.toUpperCase()}`)){
                    if(randomWord.charAt(parseInt(e.target.id)).toUpperCase() == e.target.value.toUpperCase()){
                        e.target.style.backgroundColor = "orange";
                        correctChar++;
                    }else{
                        e.target.style.backgroundColor = "green";
                    }
                }else{
                    e.target.style.backgroundColor = "#00000087";
                }
            }
            if(correctChar !== 6 && numberOfInputWritten === 6){
                let inputs = allForms[nextFormIndex++].querySelectorAll("input")
                inputs.forEach((input)=>{
                input.disabled = false;
                })
                let tryText = document.getElementById(`try-${nextFormIndex}`);
                tryText.classList.remove("dis-text");
                correctChar = 0;
                numberOfInputWritten = 0;
            }
        }
    }
})


function disapleAntherForms(start){
    for(let i = start ; i < allForms.length ; i++){

        let tryText = document.getElementById(`try-${i + 1}`);
        tryText.classList.add("dis-text");

        let inputs = allForms[i].querySelectorAll("input")
        inputs.forEach((input)=>{
            input.disabled = true;
        })
    }
}
