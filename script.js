
const allEpisodes = getAllEpisodes();
const rootElem = document.getElementById("root");

function displayEpisodes(object) {
  object.forEach((x) => {
    const episode = document.createElement("div");
    episode.setAttribute("id", "testId");
    const title = document.createElement("h3");
    const titleContainer = document.createElement("div")
    titleContainer.setAttribute("id", "title-container")
    const episodeImg = document.createElement("img");
    const imgContainer = document.createElement("div")
    imgContainer.setAttribute("id", "img-container")
    const summary = document.createElement("p");


    title.textContent = `${x.name} - S${(x.season + "").padStart(2, "0")}E${(
      x.number + ""
    ).padStart(2, "0")}`;
    episodeImg.src = x.image.medium;
    summary.innerHTML = x.summary;
    rootElem.appendChild(episode);
    episode.appendChild(titleContainer);
    titleContainer.appendChild(title)
    episode.appendChild(imgContainer)
    imgContainer.appendChild(episodeImg)
    episode.appendChild(summary);
  });
}

displayEpisodes(allEpisodes);

//..............................Search Functionality...........................................................

let search = document.getElementById("search");
let display = document.getElementById("display");

search.addEventListener("keyup", () => {
  let newArray = [];
  // allEpisodes.forEach((x) => {
  //   let summaryLower = x.summary.toLowerCase();
  //   if (x.name.toLowerCase().includes(search.value.toLowerCase()) || summaryLower.includes(search.value.toLowerCase()))
  //     newArray.push(x);
  //   display.innerText = `Displaying: ${newArray.length} / ${allEpisodes.length}`;
  //   rootElem.innerHTML = "";
  //   displayEpisodes(newArray);
  // });

  for (let episode of allEpisodes) {
    let summaryLower = episode["summary"].toLowerCase();
    if ((episode["name"]).toLowerCase().includes(search.value.toLowerCase()) || summaryLower.includes(search.value.toLowerCase())) {
      newArray.push(episode)
    }
    display.innerText = `Displaying: ${newArray.length} / ${allEpisodes.length}`;
    rootElem.innerHTML = "";
    displayEpisodes(newArray)
  }


});

search.addEventListener("click", () => {
  rootElem.innerHTML = ""
  displayEpisodes(allEpisodes)
})

//......................Select Functionality............................................................................
const select = document.getElementById("select-field");

allEpisodes.forEach((x) => {
  const option = document.createElement("option");
  option.innerText = `S${(x.season + "").padStart(2, "0")}E${(
    x.number + ""
  ).padStart(2, "0")} - ${x.name}`;
  select.appendChild(option)
});

select.addEventListener("change", ()=> {
  let newArray = []
 let selectValue = select.value
  selectValue = selectValue.substring(8);
 allEpisodes.forEach((x) => {
  if (selectValue.includes(x.name)) {
    newArray.push(x);
    rootElem.innerHTML = "";
    displayEpisodes(newArray)

  }
 })

})

document.getElementById("reset").addEventListener("click", () => {
  rootElem.innerHTML = "";
  select.selectedIndex = 0;
  displayEpisodes(allEpisodes)
})
