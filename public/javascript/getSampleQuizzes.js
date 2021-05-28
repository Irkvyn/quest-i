const container = document.querySelector('#sample-quizzes');

fetch('/quizzes/sample')
    .then(response => response.json())
    .then(data => {
        data.forEach(quiz => {
            const newDiv = document.createElement('div');
            const title = document.createElement('h3');
            const description = document.createElement('p');
            newDiv.onclick = () => window.location.href = `/take?quiz=${quiz._id}`;
            title.innerHTML = quiz.title;
            description.innerHTML = quiz.description || "";
            newDiv.appendChild(title);
            newDiv.appendChild(description);
            container.appendChild(newDiv);
        });
    });
