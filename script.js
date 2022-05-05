const rootElem = document.querySelector("#root");

function setup(setEpisode) {
  rootElem.textContent = ` Got ${setEpisode.length} episode(s)`;
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  let input = document.getElementById("searchFor");
  input.addEventListener("keyup", searchForAll);
  fetchData();
}

function searchForAll() {
  const allEpisodes = getAllEpisodes();
  let filterEpisode = allEpisodes.filter(myEpisode);
  makePageForEpisodes(filterEpisode);
}

//this is input for searching in the all episode tv - show
function myEpisode(episo) {
  let input = document.getElementById("searchFor");
  rootElem.innerHTML = "";
  if (episo.name.toLowerCase().includes(input.value.toLowerCase())) {
    return true;
  } else if (episo.summary.toLowerCase().includes(input.value.toLowerCase())) {
    return true;
  } else {
    return false;
  }
}

function makePageForEpisodes(episodeList) {
  rootElem.textContent = ` displaying (  ${episodeList.length}) episode(s)`;
  const sorted = episodeList.sort(sortedByName);
  console.log(sorted);

  episodeList.forEach(callBack);
}

function sortedByName(a, b) {
  if (a.season > b.season) {
    return -1;
  } else if (b.season > a.season) {
    return 1;
  } else {
    return 0;
  }
}
// here is the function that content all the elements  created with dom

function callBack(episode) {
  let newRoot = document.createElement("card");
  rootElem.appendChild(newRoot);

  function padNumber(numberPad) {
    return numberPad.toString().padStart(2, "0");
  }

  let seasonCode =
    "S" + padNumber(episode.season) + "E" + padNumber(episode.number);
  let h2 = document.createElement("h3");
  newRoot.appendChild(h2);
  h2.innerText = episode.name + " - " + seasonCode;

  let img = document.createElement("img");
  newRoot.appendChild(img);
  img.src = episode.image.medium;

  let summary = document.createElement("p");
  newRoot.appendChild(summary);
  summary.innerHTML = episode.summary;

  //select  from dropdown option menue by the name of episode

  let menue = document.getElementById("selectMenue");
  let optionAll = document.createElement("option");
  optionAll.innerHTML = episode.name;
  menue.appendChild(optionAll);

  let selectinput = document.getElementById("mb3");
  let optionSelect = document.createElement("option");
  optionSelect.innerHTML = episode.name + "  - " + seasonCode;
  selectinput.appendChild(optionSelect);

  menue.addEventListener(
    "change",
    () => {
      let option = document.getElementById("selectMenue").value;
      console.log(option);

      if (option === "") {
        const allEpisodes = getAllEpisodes();
        let filterEpisode = allEpisodes.filter(checkTitle(option));
        makePageForEpisodes(filterEpisode);
      }

      function checkTitle(episode, option) {
        console.log(episode);
        rootElem.innerHTML = " ";
        if (episode.name.toLowerCase().includes(option.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      }
    },
    true
  );

  menue.onchange = function () {
    const root = menue.options[menue.selectedIndex].text;
    document.getElementById("inputSelect").value = root;
    console.log(root);

    document.body.style.backgroundColor = "blue";
  };
}
const api_url = "https://api.tvmaze.com/shows/82";

async function fetchData() {
  const response = await fetch(api_url);
  const data = await response.json();
  console.log(data);
  const { name, image, url } = data;
  console.log(name);
  console.log(image);
  console.log(url);

  const newData = document.createElement("card");

  rootElem.appendChild(newData);
  const newDat = document.createElement("h3");
  newData.appendChild(newDat);

  newDat.textContent = name;

  const newImg = document.createElement("img");
  newData.appendChild(newImg);
  newImg.src = image.medium;
}

window.onload = setup;
