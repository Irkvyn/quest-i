const submissions = document.querySelector('#submissions-field');

function showQuizSubmissions(event) {
    let tr = event.target.parentElement;
    let quizTitle = tr.querySelector('.quiz-title').innerHTML;
    let previousActiveQuizzes = document.querySelectorAll(".active-quiz");
    for (previousActive of previousActiveQuizzes) {
        previousActive.classList.remove('active-quiz');
    }
    tr.classList.add('active-quiz');
    fetch(`submissions/quiz/${tr.id}`)
    .then(response => response.json())
    .then(data => {
        submissions.innerHTML = "";
        let header = document.createElement('h3');
        header.innerHTML = `Submissions for ${quizTitle}`;
        submissions.appendChild(header);

        let submissionsDiv = document.createElement('div');
        submissionsDiv.id = "submissions-div";
        submissions.appendChild(submissionsDiv);

        for (submission of data) {
            let submissionDiv = document.createElement('div');
            submissionDiv.classList.add('record');
            let id = submission.id;
            submissionDiv.onclick = (event) => {
                location.href = `/submissions/${id}`;
            }
            if (submission.status == 'passed') submissionDiv.classList.add('passed');
            if (submission.status == 'failed') submissionDiv.classList.add('failed');
            if (submission.active) submissionDiv.classList.add('active-submission');
            for (key in submission) {
                if (key=="active") continue;
                let newP = document.createElement('p');
                newP.innerHTML = submission[key];
                submissionDiv.appendChild(newP);
            }
            submissionsDiv.appendChild(submissionDiv);
        }
    });
}