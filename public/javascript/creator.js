const submissions = document.querySelector('#submissions-field');

function showQuizSubmissions(event) {
    let tr = event.target.parentElement;
    let quizTitle = tr.querySelector('.quiz-title').innerHTML;
    let previousActive = document.querySelector(".active-quiz");
    if (previousActive) previousActive.classList.remove("active-quiz");
    if (previousActive === tr) {
        previousActive.classList.remove("active-quiz");
        submissions.innerHTML = "";
        return;
    }
    tr.classList.add('active-quiz');
    fetch(`submissions/active/quiz/${tr.id}`)
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
            for (key in submission) {
                if (key=="id") continue;
                let newP = document.createElement('p');
                newP.innerHTML = submission[key];
                submissionDiv.appendChild(newP);
            }
            submissionsDiv.appendChild(submissionDiv);
        }
    });
}