let startDiv = document.getElementById('start').addEventListener('click', beginning);

let selectedCharacter = null;
function beginning() {
    console.log('Hello');
    this.style.display = "none";
}

document.getElementById('console').addEventListener('click', function () {
    document.getElementById('console').innerHTML =
        `
    <label>
    <input type="radio" name="characters" class="pozitionareInput" id="ch1">
    <div id="first-character" class="pozitionare">
    </div>
    </label>
    
    <label>
    <input type="radio" name="characters" class="pozitionareInput" id="ch2">
    <div id="second-character" class="pozitionare">
    </div>
    </label>

    `;

    let inputs = document.querySelectorAll('.pozitionareInput');
    Object.keys(inputs).forEach((item) => {
        inputs[item].addEventListener('change', getSelectedCharacter)
    })

}, { once: true });

function getSelectedCharacter() {

    selectedCharacter = this.id;
    console.log('selected character: ', selectedCharacter);
    document.getElementById('btn-lock-in').style.display = 'inline';

}

document.getElementById('btn-lock-in').addEventListener('click', function () {
    console.log('locked in player: ', selectedCharacter);
    let inputs = document.querySelectorAll('.pozitionareInput'); // NodeList
    inputs.forEach(input => {
        console.log('for each inputs: ', input);
        input.removeEventListener('change', getSelectedCharacter);
        if (!input.checked) {
            input.setAttribute('disabled', true);
        }

    });
}, { once: true });
let storyOptions = document.getElementById('story-options')

// addAnswer
// addAnswer('barracks', 'YES' 'Sleep on bed / go to hotel');
// addAnswer('barracks', 'NO', 'Talk to SO / Get ammo');

let options = {
    questionTitle: "Would you like to deploy to okinawa / tokyo gulf?",
    answers: [
        {
            from: "okinawa",
            questionTitle: "Go vizit the beach / go to barracks",
            answers: [
                {
                    from: "beach",
                    questionTitle: "Life is a beach? Panic / relax",
                    answers: []
                },
                {
                    from: "barracks",
                    questionTitle: "Get some rest? (YES, NO)",
                    answers: [

                    ]
                }
            ]
        },
        {
            from: "tokyo",
            questionTitle: "Go to HQ / visit city",
            answers: [
                {
                    from: "HQ",
                    questionTitle: "What to do in HQ? Talk to staff / check supplies / restart day",
                    answers: [
                        {
                            from: "talk-to-staff",
                            questionTitle: "",
                            answers: [

                            ]
                        },
                        {
                            from: "check-supplies",
                            questionTitle: "",
                            answers: [

                            ]
                        },
                        {
                            from: "restart-day",
                            questionTitle: "",
                            answers: [

                            ]
                        }
                    ]
                },
                {
                    from: "CITY",
                    questionTitle: "",
                    answers: []
                }
            ]
        }
    ]
};


// TODO: after the game is over, the player should see the paths he took
// TODO: players want save functionality -> save the current option in localStorage



function displayCurrentOption(option) {

    console.log('Optiunea este: ', option);
    // storyOptions.innerHTML = "";//am golit innerhtml, nu am stiut sa folosesc recursivitatea!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    for (let [key, value] of Object.entries(option)) {

        console.log('value: ', value);

        if (value.length == 0) {
            return
        }

        if (typeof value === 'string') {
            storyOptions.innerHTML += '<div>' + value + '</div>'

        }
        else {

            value.forEach(x => storyOptions.innerHTML += `<button data-from="${x.from}" onclick="storyOptionButton(this)">${x.from}</button>`)

        }
        if (typeof value === 'string' && value === "restart-day") {
            displayCurrentOption(options)
            console.clear()
        }

    }


}
displayCurrentOption(options); // displaying the initial question

// let answerSelected = options;

function findSelectedAnswer(option, from) {

    console.log('scanning for option: ', option)


    if (option.from && option.from == from) { //inca o explicatie aici te rog de unde este from-ul!!!!!!!!!!!!!!!!!!!!!!!

        return option;
    }

    let optionFound = null;
    for (let answer of option.answers) {
        console.log('Option answers este: ', option.answers)
        optionFound = findSelectedAnswer(answer, from);//la fel si aici!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        console.log('Answer este: ', answer, 'From este: ', from)

        if (optionFound) {
            return optionFound;
        }

    }


}

function storyOptionButton(buttonClicked) {
    let from = buttonClicked.getAttribute('data-from');
    console.log('story option selected: ', from)

    let answerSelected = findSelectedAnswer(options, from);

    console.log('selected answer -> next question: ', answerSelected);
    displayCurrentOption(answerSelected);

    if (!from) {
        return
    }

    console.log('Optiunile sunt: ', answerSelected.questionTitle)

}


function addAnswer(from, option, newFrom, optionTitle) {
    if (!option.from) {
        // root option
    }
    for (let answer of option.answers) {
        if (answer.from == from) {
            // we should append the new option to the answer
            let theNewAnser = {
                from: newFrom,
                questionTitle: optionTitle,
                answers: []
            };
            answer.answers.push(theNewAnser);
            return;
        }
        addAnswer(from, answer, newFrom, optionTitle);

    }
}