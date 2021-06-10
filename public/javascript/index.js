const categorizedQuizzesDiv = document.querySelector("#categorized-quizzes");
const selectCategory = document.querySelector("#select-category");

selectCategory.addEventListener('change', function (event) {
    fetch(`/quizzes/category/${event.target.value}`)
    .then(response => response.json())
    .then(quizzes => {
        categorizedQuizzesDiv.innerHTML = "";
        if (quizzes.length > 0) {
            for (quiz of quizzes) {
                let newQuizDiv = document.createElement('div');
                newQuizDiv.classList.add("quiz-box");
                let quizId = quiz._id;
                newQuizDiv.addEventListener('click', (event) => {
                    window.location.href = `/take?quiz=${quizId}`;
                });
            
                let quizTitle = document.createElement('h3');
                quizTitle.innerText = quiz.title

                let quizDescription = document.createElement('p');
                quizDescription.innerText = quiz.description;

                newQuizDiv.append(quizTitle, quizDescription);
                
                categorizedQuizzesDiv.appendChild(newQuizDiv);
            }
        }
    });
})