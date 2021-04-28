// For creating the game 
// $.post('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/',
// {
// name: 'Game',
// }
// ,function(data, status){
// console.log(data);
// console.log(status);
// });

const section = document.querySelector('section');
const container = document.querySelector('.container');
const result = document.querySelector('.result');
container.setAttribute('class','form');
const button = document.createElement('button');
button.textContent = 'Refresh Scores List';
section.appendChild(button);





function createForm () {
    const br = document.createElement('br');
    const form = document.createElement('form');
    form.setAttribute("method", "post");
    form.setAttribute("action", "submit.php");
    
    const formHeader = document.createElement('span');
    formHeader.setAttribute('class','formHeader');
    formHeader.textContent = 'Enter your name and score below';
    const userNameLabel = document.createElement('label');
    userNameLabel.textContent = 'Username';
    const userName = document.createElement('input');
    userName.setAttribute('type','text');
    userName.setAttribute('name','username');
    userName.setAttribute('id','username');
    userName.setAttribute("placeholder", "Username");

    const scoreLabel = document.createElement('label');
    scoreLabel.textContent = 'Score';
    const score = document.createElement('input');
    score.setAttribute('id','score');
    score.setAttribute('type','number');
    score.setAttribute('name','score');
    score.setAttribute('placeholder','Score');
    const submit = document.createElement('button');
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        postData();
    })
    submit.textContent = 'Submit';

    form.appendChild(formHeader);
    form.appendChild(br.cloneNode());
    form.appendChild(br.cloneNode());
    form.appendChild(userNameLabel);
    form.appendChild(br.cloneNode());
    form.appendChild(userName);
    form.appendChild(br.cloneNode());
    form.appendChild(scoreLabel);
    form.appendChild(br.cloneNode());
    form.appendChild(score);
    form.appendChild(br.cloneNode());
    form.appendChild(submit);

    return form;
};

container.appendChild(createForm());

const form = document.querySelector('form');

function postData() {
    const name = document.querySelector('#username');
    const score = document.querySelector('#score');

    const data = {user: name.value, score: score.value};
    fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/bFQvTZfPrvjkHOOILnoM/scores', 
    {mode: 'cors', 
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)})
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        console.log(response);
    })
};

button.addEventListener('click', getData);


function getData(){
    fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/bFQvTZfPrvjkHOOILnoM/scores',{mode: 'cors'})
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        display(response)
    })
};



function display (response) {
    result.innerHTML = '';
    const arr = response.result;
    arr.sort(function(a,b) {return b.score - a.score});

    const ul = document.createElement('ul');
    for(let i=0; i<arr.length; i += 1){
        const li = document.createElement('li');
        li.textContent = `${arr[i].user}, ${arr[i].score}`;
        ul.appendChild(li);
    };
    result.appendChild(ul);
}
