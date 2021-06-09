const start = document.querySelector('#start');
const container = document.querySelector('#quiz');

start.onclick = (() => {
    fetch('/submissions', {
        method: 'POST',
        credentials: 'same-origin',
        body: new URLSearchParams({
            'quiz': start.value
        })
    })
        .then(response => response.text())
        .then(newSubmissionId => {
            fetch(`/quizzes/${start.value}/questions`)
                .then(response => response.json())
                .then(questions => { 
                    start.style.display = "none";
                    addQuestions(questions, JSON.parse(newSubmissionId));
                });
        });
});

function addQuestions(questions, newSubmissionId) {
    let form = document.createElement('form');
    questions.forEach(question => {
        let questionDiv = document.createElement('div');
        let descriptionDiv = document.createElement('div');
        let description = document.createElement('h3');
        let points = document.createElement('p');
        let choices = document.createElement('div');

        descriptionDiv.classList.add("description");
        choices.classList.add("choices");

        description.innerText = question.description;
        if (question.points == 1) {
            points.innerHTML = `(${question.points} point)`;
        } else {
            points.innerHTML = `(${question.points} points)`;
        }

        descriptionDiv.append(description, points);
        questionDiv.appendChild(descriptionDiv);
        questionDiv.appendChild(choices);

        switch (question.questionType) {
            case 'text':
                let textInput = document.createElement('input');
                textInput.type = 'text';
                textInput.name = question._id;
                choices.appendChild(textInput);
                choices.classList.add('text-answer');
                break;
            case 'single':
                question.choices.forEach(choice => {
                    let input = document.createElement('input');
                    let label = document.createElement('label');
                    let choiceDiv = document.createElement('div');
        
                    input.type = "radio";
                    input.name = question._id;
                    input.value = choice.text;
        
                    label.setAttribute("for", choice.text);
                    label.innerText = choice.text;
        
                    choiceDiv.appendChild(input);
                    choiceDiv.appendChild(label);
                    choices.appendChild(choiceDiv);
                    choices.classList.add('single-answer');
                });
                break;
            case 'multiple':
                question.choices.forEach(choice => {
                    let input = document.createElement('input');
                    let label = document.createElement('label');
                    let choiceDiv = document.createElement('div');
        
                    input.type = "checkbox";
                    input.name = question._id;
                    input.value = choice.text;
        
                    label.setAttribute("for", choice.text);
                    label.innerText = choice.text;
        
                    choiceDiv.appendChild(input);
                    choiceDiv.appendChild(label);
                    choices.appendChild(choiceDiv);
                    choices.classList.add('multiple-answer');
                });
                break;
        }
        form.appendChild(questionDiv);
    });

    let button = document.createElement('button');

    button.type = "submit";
    button.innerHTML = "Submit";
    button.onclick = (event) => {
        let formData = new FormData(form);
        let reqBody = {};
        let answers = [];
        try {

            for (let answer of formData.entries()) {
                let answerObj = {};
                let existingAnswerObj = answers.filter((obj) => obj.id == answer[0])[0];
                if (!existingAnswerObj) {
                    answerObj['id'] = answer[0];
                    answerObj['value'] = [answer[1]];
                    answers.push(answerObj);
                } else {
                    existingAnswerObj.value.push(answer[1]);
                }
            }
            reqBody.answers = answers;
            reqBody.submission = newSubmissionId;
            fetch(`/submissions/${newSubmissionId}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify(reqBody)
            }).then(response => {
                if (response.status == 200) {
                    let message = document.createElement('p');
                    message.style.color = 'green';
                    message.innerHTML = 'Submitted successfully!';
                    event.target.remove();
                    document.querySelector('form').remove();
                    container.appendChild(message);
                }
            });
        } catch (err) {
            console.log(err);
        }
        event.preventDefault();
    }

    container.appendChild(form);
    container.appendChild(button);
}