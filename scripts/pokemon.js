import {loadJSON} from "./loadJSON.js";

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
});

function changeTab(tab, tabs) {
    for (const tab of tabs) {
        tab.classList.remove("active");

        const tabContent = document.querySelector(`#${tab.getAttribute("data-tab")}`);
        tabContent.style.display = "none";
    }

    tab.classList.add("active");

    const tabContent = document.querySelector(`#${tab.getAttribute("data-tab")}`);
    tabContent.style.display = "block";
}

function fillColor(number) {
    if (number < 30) return "#ff0000";
    else if (number < 60) return "#ff7f00";
    else if (number < 90) return "#ffff00";
    else if (number < 120) return "#7fff00";
    else return "#00ff00";
}

loadJSON("./datas/pokedex.json").then(pokedex => {
    let pokemon;

    for (const index in pokedex) {
        if (pokedex[index].number == params.number) {
            pokemon = pokedex[index];

            break;
        }
    }

    const header = document.querySelector("#header");
    for (const type of pokemon.types) {
        header.classList.add(type.toLowerCase());
    }

    document.title = `${pokemon.name}`;

    const name = document.querySelector("#name");
    name.innerHTML = pokemon.name;

    const number = document.querySelector("#number");
    number.innerHTML = `#${pokemon.number.toString().padStart(3, "0")}`;

    const image = document.querySelector("#image");
    const img = document.createElement("img");
    img.src = `./images/pokemon/${pokemon.number.toString().padStart(3, "0")}.png`;
    image.appendChild(img);

    for (const type of pokemon.types) {
        const typeImage = document.createElement("img");
        typeImage.src = `./images/types/${type.toLowerCase()}_icon.png`;
        
        document.querySelector("#types").appendChild(typeImage);
    }

    const tabs = document.querySelectorAll("#nav .tab");
    for (const tab of tabs) {
        tab.addEventListener("click", () => changeTab(tab, tabs));
    }

    const description = document.querySelector("#description");
    description.innerHTML = pokemon.description;

    const hp = document.querySelector("#hp .fill");
    hp.style.width = `calc(${pokemon.baseStats.hp/255*100}%)`;
    hp.style.backgroundColor = fillColor(pokemon.baseStats.hp);

    const attack = document.querySelector("#attack .fill");
    attack.style.width = `calc(${pokemon.baseStats.atk/255*100}%)`;
    attack.style.backgroundColor = fillColor(pokemon.baseStats.atk);

    const defense = document.querySelector("#defense .fill");
    defense.style.width = `calc(${pokemon.baseStats.def/255*100}%)`;
    defense.style.backgroundColor = fillColor(pokemon.baseStats.def);

    const specialAttack = document.querySelector("#special-attack .fill");
    specialAttack.style.width = `calc(${pokemon.baseStats.spa/255*100}%)`;
    specialAttack.style.backgroundColor = fillColor(pokemon.baseStats.spa);

    const specialDefense = document.querySelector("#special-defense .fill");
    specialDefense.style.width = `calc(${pokemon.baseStats.spd/255*100}%)`;
    specialDefense.style.backgroundColor = fillColor(pokemon.baseStats.spd);

    const speed = document.querySelector("#speed .fill");
    speed.style.width = `calc(${pokemon.baseStats.spe/255*100}%)`;
    speed.style.backgroundColor = fillColor(pokemon.baseStats.spe);
});