//You can edit ALL of the code here
let rootElem = document.getElementById("root");

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);

  let fild = document.querySelector("#searchFild");
  fild.addEventListener("keyup", searshUp);
  //selectApisode();
}
function searshUp() {
  let fild = document.querySelector("#searchFild");
  console.log(fild.value);

  const allEpisodes = getAllEpisodes();
  let allFiltered = allEpisodes.filter(allFilter);
  makePageForEpisodes(allFiltered);
}

function allFilter(episo) {
  let fild = document.querySelector("#searchFild");
  console.log(fild.value);

  if (episo.name.toLowerCase().includes(fild.value.toLowerCase())) {
    return true;
  } else {
    return false;
  }
}
function episodeSelect(episode) {
  let select = document.querySelector("#selectEpisode");
  select.addEventListener("keyup", displyEpisode);
  console.log(episode.value);
}
function displyEpisode(episode) {
  if (episode > 10) {
    return (
      episode.season.toString().padStart(3, S0) +
      episode.number.toString().padStart(3, E0)
    );
  } else {
    return `S0${episode.season} . E0${episode.number}`;
  }
}
function makePageForEpisodes(episodeList) {
  rootElem.innerHTML = "";
  episodeList.forEach(episodeAll);
}
function episodeAll(episode) {
 let  rootElem = document.getElementById("root");
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  let rootEle = document.createElement("span");
  rootElem.appendChild(rootEle);

  let h3 = document.createElement("h3");
  h3.innerText = episode.name;
  rootEle.appendChild(h3);
  let numberCode = document.createElement("h4");
  numberCode.innerText = "S0" + episode.number + "E0" + episode.season;
  rootEle.appendChild(numberCode);

  let image = document.createElement("img");
  rootEle.appendChild(image);
  image.src = episode.image.medium;

  let summary = document.createElement("summary");
  summary.innerHTML = episode.summary;
  rootEle.appendChild(summary);
}
 window.onload = setup;
