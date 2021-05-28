const start = document.querySelector('#start');
const container = document.querySelector('#quiz');

start.onclick = (() => {
    fetch(`/quizzes/${start.value}/questions`)
        .then(response => response.json())
        .then(questions => { 
            console.log(questions);
            start.style.display = "none";
            questions.forEach((question) => {
                let description = document.createElement('p');
                description.innerHTML = question.description;
                container.appendChild(description);
                question.choices.forEach(choice => {
                    let input = document.createElement('input');
                    input.type = "radio";
                    input.name = question.id;
                    input.value = choice.text;
                    let label = document.createElement('label');
                    label.setAttribute("for", choice.text);
                    label.innerHTML = choice.text;
                    container.appendChild(input);
                    container.appendChild(label);
                });
            });
        });
});
