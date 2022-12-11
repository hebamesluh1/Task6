const add = document.querySelector('#add');
let card = document.querySelector('.card');
const cancel = document.querySelector('#cancel');
const done = document.querySelector('#done');
let title = document.querySelector('#title');
let desc = document.querySelector('#description');

//when click on add button display form
add.addEventListener('click',()=>{
    document.querySelector('#form').style.display='inline-block';
    add.style.display='none';
})
//when click on cancel btn clear value 
cancel.addEventListener('click',()=>{
    document.querySelector('#form').style.display='none';
    add.style.display='inline-block';
})
//when click on done btn 
done.addEventListener('click',()=>{
    createToDo();
})

// read request by AJAx
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            let cards = "";
            data.forEach((post) => {
                cards += `
                        <div class="todo_card">
                            <h2>${post.title}</h2>
                            <p>${post.body}</p>
                        </div><br>
                        
                        `;
            });
            card.innerHTML = cards;
        }
    }
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
    xhr.send();

// create request using fetch
function createToDo() {
    const myNewCard = {
        title: title.value,
        body: desc.value,
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(myNewCard),
    })
        .then((res) => res.json())
        .catch((error) => {
            console.log("this line includes error", error);
        });

    let newCard = `<div class="todo_card">
                        <h2>${myNewCard.title}</h2>
                        <p>${myNewCard.body}</p>
                    </div>`;

    //add card to Daily List 
    card.innerHTML += newCard;

};