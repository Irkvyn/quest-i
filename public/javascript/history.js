const container = document.querySelector('#history-container');

fetch('/submissions')
.then(response => response.json())
.then(data => {
    for (let record of data) {
        let recordDiv = document.createElement('div');
        recordDiv.onclick = () => {
            location.href = `/submissions/${record.id}`;
        }
        recordDiv.classList.add('record');
        if (record.status == 'passed') recordDiv.classList.add('passed');
        if (record.status == 'failed') recordDiv.classList.add('failed');
        for (let key in record) {
            if (key == 'id') continue;
            console.log(key)
            let newP = document.createElement('p');
            newP.innerHTML = record[key];
            recordDiv.appendChild(newP);
        }
        container.appendChild(recordDiv);
    }
});