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
        let description = document.createElement('h3');

        description.innerHTML = question.description;

        questionDiv.appendChild(description);

        question.choices.forEach(choice => {
            let input = document.createElement('input');
            let label = document.createElement('label');

            input.type = "radio";
            input.name = question._id;
            input.value = choice.text;

            label.setAttribute("for", choice.text);
            label.innerHTML = choice.text;

            questionDiv.appendChild(input);
            questionDiv.appendChild(label);
        });
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
                answerObj['id'] = answer[0];
                answerObj['value'] = answer[1];
                answers.push(answerObj);
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
                    container.appendChild(message);
                }
            });
        } catch (err) {
            console.log(err);
        }
        event.preventDefault();
    }

    form.appendChild(button);
    container.appendChild(form);
}
