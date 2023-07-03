const rootElem = document.querySelector("#root");
let intro = document.createElement("article");
intro.innerHTML =
  " Watch series online? Finding the best series to binge watch online  and  Just Watch is there to help you find all the series and make your life easier";
rootElem.appendChild(intro);
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  let input = document.getElementById("search-input");
  input.addEventListener("keyup", searchForAll);
  fetchData();
}

function searchForAll() {
  const allEpisodes = getAllEpisodes();
  let filterEpisode = allEpisodes.filter(myEpisode);
  makePageForEpisodes(filterEpisode);
}

//this is input for searching in the all episode tv - show
function myEpisode(episode) {
  let input = document.getElementById("search-input");
  let selectSection = document.querySelector("section");

  rootElem.innerHTML = "";
  selectSection.innerHTML = "";
  if (episode.name.toLowerCase().includes(input.value.toLowerCase())) {
    return true;
  } else {
    return false;
  }
}

function makePageForEpisodes(episodeList) {
  let episodeLength = document.createElement("h6");
  episodeLength.textContent = `displaying (${episodeList.length} / 73) episodes`;
  rootElem.appendChild(episodeLength);

  const sorted = episodeList.sort(sortedByName);
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
function padNumber(numberPad) {
  return numberPad.toString().padStart(2, "0");
}

function callBack(episode) {
  let seasonCode = `S  ${padNumber(episode.season)} E ${padNumber(
    episode.number
  )}`;
  let newRoot = document.createElement("card");
  newRoot.setAttribute("style", "width: 350px", "data-aos fade-left");
  rootElem.appendChild(newRoot);

  h2 = document.createElement("h3");
  h2.innerHTML = episode.name + " - " + seasonCode;
  newRoot.appendChild(h2);
  let img = document.createElement("img");
  newRoot.appendChild(img);
  img.src = episode.image.medium;

  let lia = document.createElement("a");
  newRoot.appendChild(lia);
  lia.href = episode.url;
  lia.innerText = "You Can watch this episode";

  let summary = document.createElement("p");
  newRoot.appendChild(summary);
  summary.innerHTML = episode.summary;
  //select  from dropdown option menu by the name of episode

  let menu = document.getElementById("selectFromMenu");
  let optionAll = document.createElement("option");
  optionAll.innerHTML = episode.name;
  menu.appendChild(optionAll);

  menu.addEventListener("change", () => {
    let option = document.getElementById("selectFromMenu").value;
    let selectSection = document.querySelector("section");

    if (option !== "") {
      const allEpisodes = getAllEpisodes();
      let checkedCard = allEpisodes.filter(checkTitle);
      makePageForEpisodes(checkedCard);

      let selectedA = document.createElement("a");
      let selectedH2 = document.createElement("h2");
      let selectedP = document.createElement("p");
      let selectedImg = document.createElement("img");
      selectedA.innerHTML = "see the series details";

      checkedCard.forEach((checked) => {
        selectedA.href = checked.url;
        selectedP.innerHTML = checked.summary;
        selectedImg.src = checked.image.medium;
        selectedH2.innerHTML = checked.name;

        selectSection.append(selectedH2);
        selectSection.append(selectedImg);
        selectSection.append(selectedP);
        selectSection.append(selectedA);
      });
    }
    function checkTitle(episode) {
      selectSection.innerHTML = "";
      if (episode.name == option) {
        selectSection.style.cssText =
          "background-image: linear-gradient( white, black,  black, white); margin: 30px auto; width: 100%";

        return true;
      } else {
        return false;
      }
    }
  });
}

const api_url = "https://api.tvmaze.com/shows/179";

async function fetchData() {
  const response = await fetch(api_url);
  const data = await response.json();
  //console.log(data);
  const { name, image, url } = data;
  const newData = document.createElement("div");
  rootElem.appendChild(newData);
  const newDat = document.createElement("h3");
  newData.appendChild(newDat);
  newDat.innerHTML = name;
  const newImg = document.createElement("img");
  newData.appendChild(newImg);
  newImg.src = image.medium;
}

window.onload = setup;
