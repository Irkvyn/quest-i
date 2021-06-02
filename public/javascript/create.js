const addButton = document.querySelector('#add');
const form = document.querySelector('#form-container');
const submitButton = document.querySelector('#submit');
const questionTypeOptions = ['single', 'multiple', 'text'];
let numberOfQuestions = 0;

addButton.onclick = () => {
    const newFieldSet = document.createElement('fieldset');
    newFieldSet.id = `question-${numberOfQuestions+1}`;
    newFieldSet.classList.add('question');

    const newLegend = document.createElement('legend');
    newLegend.innerHTML = `Question`;
    newFieldSet.appendChild(newLegend);

    const header = document.createElement('div');
    const questionText = document.createElement('input');
    questionText.type = 'text';
    questionText.id = `question-${numberOfQuestions+1}-text`;
    questionText.name = `question-${numberOfQuestions+1}-text`;
    questionText.classList.add('question-text');
    const questionTextLabel = document.createElement('label');
    questionTextLabel.innerHTML = 'Text';
    questionTextLabel.setAttribute("for", `question-${numberOfQuestions+1}-text`);
    header.append(questionTextLabel, questionText);

    const selectList = document.createElement("select");
    const selectLabel = document.createElement("label");
    selectList.id = `question-${numberOfQuestions+1}-type`;
    selectLabel.setAttribute("for", `question-${numberOfQuestions+1}-type`);
    selectLabel.innerHTML = "Type";
    header.append(selectLabel, selectList);
    for (var i = 0; i < questionTypeOptions.length; i++) {
        var option = document.createElement("option");
        option.value = questionTypeOptions[i];
        option.text = questionTypeOptions[i];
        selectList.appendChild(option);
    }
    newFieldSet.appendChild(header);
    const questionPoints = document.createElement('input');
    questionPoints.type = 'number';
    questionPoints.id = `question-${numberOfQuestions+1}-points`;
    questionPoints.name = `question-${numberOfQuestions+1}-points`;
    const questionPointsLabel = document.createElement('label');
    questionPointsLabel.innerHTML = 'Points';
    questionPointsLabel.setAttribute("for", `question-${numberOfQuestions+1}-points`);
    questionPoints.classList.add('points')
    header.append(questionPointsLabel, questionPoints);
    
    let numberOfChoices = 0;
    const choiceButton = document.createElement('button');
    const removeQuestion = document.createElement('button');
    const newListChoices = document.createElement('ul');
    removeQuestion.innerHTML = 'Remove Question'
    removeQuestion.onclick = (event) => {
        newFieldSet.remove();
        event.preventDefault();
    }
    newListChoices.classList.add('choices');
    newListChoices.id = `question-${numberOfQuestions+1}-choices`;
    choiceButton.innerHTML = 'Add Answer';
    choiceButton.classList.add('choice-button')
    choiceButton.addEventListener('click', (event) => {
        const newLi = document.createElement('li');
        const newTextInputLi = document.createElement('input');
        let questionId = event.target.parentNode.id;
        newTextInputLi.id = `${questionId}-choice-${numberOfChoices+1}-text`;
        newTextInputLi.name = `${questionId}-choice-${numberOfChoices+1}-text`;
        newTextInputLi.classList.add('choice-text');
        const newCorrectLi = document.createElement('input');
        const newRemoveButton = document.createElement('button');
        const newRemoveIcon = document.createElement('i');
        newCorrectLi.classList.add("choice-isCorrect");
        newCorrectLi.name = `${questionId}-choice-${numberOfChoices+1}-correct`;
        newRemoveIcon.classList.add("fa","fa-trash-o");
        newRemoveButton.appendChild(newRemoveIcon);
        newCorrectLi.type = 'checkbox';
        newRemoveButton.onclick = (event) => {
            newLi.remove();
            event.preventDefault();
        }
        newLi.append(newTextInputLi, newCorrectLi, newRemoveButton);
        numberOfChoices += 1;

        newListChoices.appendChild(newLi);
        event.preventDefault();
    });
    newFieldSet.append(newListChoices, choiceButton, removeQuestion);

    numberOfQuestions += 1;
    newFieldSet.appendChild(newLegend);
    form.appendChild(newFieldSet);
};

submitButton.onclick = event => {
    const reqBody = {};
    reqBody.questions = [];
    reqBody.quiz = {}
    reqBody.quiz.title = document.querySelector('#name').value;
    reqBody.quiz.description = document.querySelector('#description').value;
    for (let i=1; i <= numberOfQuestions; i++) {
        if (document.querySelector(`#question-${i}`)) {
            let newQuestion = {};
            newQuestion.description = document.querySelector(`#question-${i}-text`).value;
            newQuestion.points = document.querySelector(`#question-${i}-points`).value || 1;
            newQuestion.choices = [];
            newQuestion.questionType = document.querySelector(`#question-${i}-type`).value
            const listOfChoices = document.querySelector(`#question-${i}-choices`);
            for (let j = 0; j < listOfChoices.children.length; j++) {
                let choice = {};
                choice.text = listOfChoices.children[j].querySelector('.choice-text').value;
                choice.isCorrect = listOfChoices.children[j].querySelector('.choice-isCorrect').checked;
                newQuestion.choices.push(choice);
            }
            reqBody.questions.push(newQuestion);
        }
    }
    fetch('/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(reqBody)
    }).then(()=> {
        document.querySelector('#create-container').remove();
        const successLog = document.createElement('p');
        successLog.innerHTML = 'Quiz created successfully!'
        document.querySelector('body').appendChild(successLog);
    });
    event.preventDefault();
}