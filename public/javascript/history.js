const container = document.querySelector('#history-container');

fetch('/submissions')
.then(response => response.json())
.then(data => {
    for (let record of data) {
        let recordDiv = document.createElement('div');
        recordDiv.classList.add('record');
        console.log(record);
        for (let key in record) {
            let newP = document.createElement('p');
            newP.innerHTML = record[key];
            recordDiv.appendChild(newP);
        }
        container.appendChild(recordDiv);
    }
});