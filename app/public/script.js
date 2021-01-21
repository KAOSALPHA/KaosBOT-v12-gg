console.log("Hoşgeldiniz :o");

const dreamsList = document.getElementById("dreams");
const dreamsForm = document.querySelector("form");

function appendNewDream(dream) {
  const newListItem = document.createElement("li");
  newListItem.innerText = dream;
  dreamsList.appendChild(newListItem);
}

fetch("/dreams")
  .then(response => response.json()) 
  .then(dreams => {

        dreamsList.firstElementChild.remove();
  
    dreams.forEach(appendNewDream);
  
    dreamsForm.addEventListener("submit", event => {

      event.preventDefault();

      let newDream = dreamsForm.elements.dream.value;
      dreams.push(newDream);
      appendNewDream(newDream);

      dreamsForm.reset();
      dreamsForm.elements.dream.focus();
    });
  });
