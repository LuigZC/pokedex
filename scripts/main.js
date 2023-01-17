import {loadJSON} from "./loadJSON.js";

function detectivePikachu(sound) {
    sound.play();
    console.log("u")
}

loadJSON("./datas/pokedex.json").then(pokedex => {
    const mainContent = document.querySelector("#main-content");
    const pikaSound = new Audio("./sounds/pika.mp3");
    
    document.querySelector("#detective").addEventListener("click", () => detectivePikachu(pikaSound));
    
    for (const index in pokedex) {
        const pokemon = pokedex[index];

        const card = document.createElement("div");
        card.classList.add("card");
        for (const type of pokemon.types) {
            card.classList.add(type.toLowerCase());
        }

        const image = document.createElement("img");
        image.src = `./images/pokemon/${pokemon.number.toString().padStart(3, "0")}.png`

        const name = document.createElement("p");
        name.innerHTML = pokemon.name;

        card.addEventListener("click", () => {
            document.location.href = `./pokemon.html?number=${pokemon.number}`;
        });

        card.appendChild(image);
        card.appendChild(name);
        mainContent.appendChild(card);
    }
});