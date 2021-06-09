const basicOptionsButton = document.querySelector('#basic-options-button');
const basicOptions = document.querySelector("#basic-options");
const moreOptionsButton = document.querySelector('#more-options-button');
const moreOptions = document.querySelector('#more-options');
const addQuestionButton = document.querySelector('#add-question');
const questionsField = document.querySelector('#questions-field');
const createQuizButton = document.querySelector('#create-quiz');
let numberOfQuestions = 0;

basicOptionsButton.addEventListener('click', event => {
    if (basicOptions.classList.contains('hidden')) {
        basicOptions.classList.toggle('hidden');
        moreOptions.classList.toggle('hidden');
    }
});

moreOptionsButton.addEventListener('click', event => {
    if (moreOptions.classList.contains('hidden')) {
        basicOptions.classList.toggle('hidden');
        moreOptions.classList.toggle('hidden');
    }
});

addQuestionButton.addEventListener('click', event => {
    numberOfQuestions += 1;

    let questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    let questionDivDescritpion = document.createElement('div');
    questionDivDescritpion.classList.add('question-div-description');

    let questionDescription = document.createElement('input');
    let questionDescriptionLabel = document.createElement('label');
    questionDescription.classList.add("question-description");
    questionDescription.id = `question-description-${numberOfQuestions}`;
    questionDescription.type = 'text';
    questionDescriptionLabel.setAttribute("for", `question-description-${numberOfQuestions}`);
    questionDescriptionLabel.innerHTML = "Descritpion";
    questionDivDescritpion.append(questionDescriptionLabel, questionDescription);
    questionDiv.appendChild(questionDivDescritpion);

    let questionDivOptions = document.createElement('div');
    questionDivOptions.classList.add('question-div-options');

    let questionType = document.createElement('select');
    let questionTypeLabel = document.createElement('label');
    let questionTypeOptions = ["single", "multiple", "text"];
    questionType.classList.add("question-type");
    questionType.id = `question-type-${numberOfQuestions}`;
    for (let i = 0; i < questionTypeOptions.length; i++) {
        let option = document.createElement("option");
        option.value = questionTypeOptions[i];
        option.text = questionTypeOptions[i];
        questionType.appendChild(option);
    }
    questionTypeLabel.setAttribute("for", `question-type-${numberOfQuestions}`);
    questionTypeLabel.innerHTML = "Type";
    questionDivOptions.append(questionTypeLabel, questionType);
    questionDiv.appendChild(questionDivOptions);


    let questionPoints = document.createElement('input');
    let questionPointsLabel = document.createElement('label');
    questionPoints.type = "number";
    questionPoints.classList.add("question-points");
    questionPoints.id = `question-points-${numberOfQuestions}`;
    questionPoints.defaultValue = 1;
    questionPointsLabel.setAttribute("for", `question-points-${numberOfQuestions}`);
    questionPointsLabel.innerHTML = "Points";
    questionDivOptions.append(questionPointsLabel, questionPoints);

    let addChoiceButton = document.createElement("button");
    addChoiceButton.innerHTML = "Add Choice";
    questionDivOptions.appendChild(addChoiceButton);
    addChoiceButton.addEventListener('click', event => {
        let list = event.target.parentElement.parentElement.querySelector('ul');
        let newChoiceLi = document.createElement('li');

        let choiceText = document.createElement('input');
        choiceText.type = 'text';
        choiceText.classList.add('choice-text')

        let choiceIsCorrect = document.createElement('input');
        choiceIsCorrect.type = "checkbox";
        choiceIsCorrect.classList.add('choice-isCorrect');

        let removeChoiceIconSpan = document.createElement("span");
        let removeChoice = document.createElement('i');
        removeChoice.classList.add("fas");
        removeChoice.classList.add("fa-trash");
        removeChoice.addEventListener('click', event => {
            event.target.parentElement.parentElement.remove();
        })
        removeChoiceIconSpan.appendChild(removeChoice);

        newChoiceLi.append(choiceText, choiceIsCorrect, removeChoiceIconSpan);
        list.append(newChoiceLi);   
    })

    let removeIcon = document.createElement("i");
    let removeIconDiv = document.createElement("div");
    removeIcon.addEventListener("click", event => {
        event.target.parentElement.parentElement.remove();
    });
    removeIconDiv.classList.add("remove-icon");
    removeIconDiv.id = `question-remove-${numberOfQuestions}`;
    removeIcon.classList.add("fas");
    removeIcon.classList.add("fa-times");
    removeIconDiv.appendChild(removeIcon);
    questionDiv.appendChild(removeIconDiv);

    let choicesDiv = document.createElement('div');
    let choicesList = document.createElement('ul');
    choicesDiv.classList.add("question-choices");
    choicesDiv.appendChild(choicesList);
    questionDiv.appendChild(choicesDiv);

    questionsField.append(questionDiv);
});

createQuizButton.addEventListener('click', event => {
    let quiz = {};
    let quizFields = ["title", "description", "category", "availability",
        "start", "expiry", "passScore", "evaluation",
        "timeLimit", "submLimit", "questionsLimit"
    ];
    for (field of quizFields) {
        let value = document.querySelector(`#${field}`).value;
        if (value) quiz[field] = value;
    }
    quiz['shuffle'] = document.querySelector("#shuffle").checked;

    let questions = [];
    for (question of questionsField.querySelectorAll("div.question")) {
        let newQuestion = {};
        newQuestion['description'] = question.querySelector(".question-description").value;
        newQuestion['questionType'] = question.querySelector(".question-type").value;
        newQuestion['points'] = question.querySelector(".question-points").value;
        let choices = [];
        for (choice of question.querySelectorAll(".question-choices ul li")) {
            let newChoice = {};
            newChoice['text'] = choice.querySelector(".choice-text").value;
            newChoice['isCorrect'] = choice.querySelector(".choice-isCorrect").checked;
            choices.push(newChoice);
        }
        newQuestion['choices'] = choices;
        questions.push(newQuestion);
    }

    fetch('/creator/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({quiz: quiz, questions: questions})
    })
    .then(response => {
        if (response.status == 200) {
            let container = document.querySelector('#create-container');
            container.innerHTML = "";
            let newP = document.createElement('p');
            newP.innerText = "Quiz created successfully!"
            newP.style.textAlign = "center";
            newP.style.color = "green";
            container.appendChild(newP);
        }
    })
});