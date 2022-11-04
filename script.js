

const rootElem = document.getElementById("root");
const showSelect = document.getElementById("show-select");
const allShows = getAllShows();
const wrapper = document.createElement("div");
wrapper.setAttribute("id", "wrapper");
const homeIcon = document.querySelector("#homeCtn");
const episodeSelect = document.getElementById("select-field");
 let episodeSearch = document.getElementById("episodeSearch")
 let searchbar = document.getElementById("showSearch")
 let displayNumber = document.querySelector(".display")
 let displayNumEpi = document.getElementById("display")

 displayNumEpi.innerText = "success"

//..............creating a function that takes an array and displays the
//episodes.......................................

function display(array) {
  rootElem.innerHTML = "";
  array.forEach((item) => {
    const showContainer = document.createElement("div");
    showContainer.setAttribute("id", "showCtn");
    const title = document.createElement("h1");
    const titleContainer = document.createElement("div");
    titleContainer.setAttribute("class", "title-container");
    const content = document.createElement("div");
    content.setAttribute("class", "content");
    const episodeImg = document.createElement("img");
    const imgContainer = document.createElement("div");
    imgContainer.setAttribute("id", "img-container");
    const summaryContainer = document.createElement("div");
    summaryContainer.setAttribute("class", "summaryContainer");
    const ratingContainer = document.createElement("div");
    ratingContainer.setAttribute("class", "ratingContainer");
    // const rating = document.createElement("p");
    // rating.setAttribute("id", "rating");
  

    const ratingContent = `<p><i class="fa-solid fa-star">
    </i><i class="fa-solid fa-star">
    </i><i class="fa-solid fa-star">
    </i><i class="fa-solid fa-star">
    </i><i class="fa-solid fa-star">
    </i>Rating: ${item.rating.average}</p>\n
    <p> <i class="fa-solid fa-circle"></i>Status: ${
      item.status
    }</p>\n<p> <i class="fa-solid fa-film"></i>Genres: ${item.genres}</p>\n<p><i class="fa-solid fa-hourglass-start"></i>Runtime: ${
      item.runtime
    }</p>`;

   

    ratingContainer.innerHTML += ratingContent;

    const summary = document.createElement("p");

    title.textContent = item.season
      ? `${item.name} - S${(item.season + "").padStart(2, "0")}E${(
          item.number + ""
        ).padStart(2, "0")}`
      : item.name;

    if (item.image) episodeImg.src = item.image.original;
    summary.innerHTML = item.summary;
    // rating.innerText = item.summary
    rootElem.appendChild(showContainer);
    showContainer.appendChild(titleContainer);
    titleContainer.appendChild(title);
    showContainer.appendChild(content);
    content.appendChild(imgContainer);
    content.appendChild(summaryContainer);
    content.appendChild(ratingContainer);
    imgContainer.appendChild(episodeImg);
    summaryContainer.appendChild(summary);
    // ratingContainer.appendChild(rating);


    title.addEventListener("click", () => {
      if (title.textContent.includes(item.name)) {
        showSelect.value = item.name
        getEpisodes(item)
      }
    })
  });
}

function setUp() {
  display(allShows)
  episodeSearch.style.display = "none"
  searchbar.style.display = "block"
  let search = document.getElementById("search")
  search.value = ""
  showSelect.selectedIndex = 0;
  episodeSelect.selectedIndex = 0
  renderDisplayNum(displayNumber, allShows, allShows)
}

setUp()



//adding event listener to home button
homeIcon.addEventListener("click", setUp)



//select functionality

let test;
[...allShows].sort((a, b) => a.name.localeCompare(b.name))
  .forEach((x) => {
    const option = document.createElement("option");
    option.innerText = x.name;
    showSelect.appendChild(option);
  });

 
  
  showSelect.addEventListener("change", () => {
    let newArray = []
    let selectValue = showSelect.value;
     searchbar.style.display = "none"
     episodeSearch.style.display = "block"
    allShows.forEach((x) => {
      if (selectValue === x.name) {
        newArray.push(x)
        display(newArray)
      //  getEpisodes(x)
      }
    });
  });

  // search functionality
    searchbar.addEventListener("input", (e) => {
      let result = allShows.filter(x => {
      return  x.name.toLowerCase().includes(e.target.value.toLowerCase())
      })
      display(result)
      renderDisplayNum(displayNumber, result, allShows)
    });
  
    

 




  
  /// defining the function that fetches api 

 let allEpisodes;
  function getEpisodes(show) {
    let url = `https://api.tvmaze.com/shows/${show.id}/episodes`;
    fetch(url)
    .then (response => response.json())
    .then(data => {
      makePageForEpisodes(data)
      renderDisplayNum(displayNumEpi, data, data);
      episodeSelect.innerHTML = `<option>Select an episode</option>`
      data.forEach(x => {
        let option = document.createElement("option");
        option.innerText =  `S${(x.season + "").padStart(2, "0")}E${( x.number + "").padStart(2, "0")} - ${x.name}`
        episodeSelect.appendChild(option);
        episodeSelect.addEventListener("change", ()=> {
          if(episodeSelect.value.substring(9) === x.name) {
            let newArray = [];
           newArray.push(x)
           makePageForEpisodes(newArray)
           renderDisplayNum(displayNumEpi, newArray, data)
          } 
        })
      })

      episodeSearch.addEventListener("input", (e)=> {
        let result = data.filter((x) => {
          return x.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        makePageForEpisodes(result);
        renderDisplayNum(displayNumEpi, result, data)
        // displayNumEpi.innerText = `Displaying: ${result.length} / ${data.length}`
      })
     
      //  search.addEventListener("input", () => {
      //    let result = data.filter((x) => {
      //      return x.name.toLowerCase().includes(search.value.toLowerCase());
      //    });
      //    makePageForEpisodes(result);
      //  });
    })
  }

  



  function renderDisplayNum(element, subArr, mainArr) {
    element.innerText = `Displaying; ${subArr.length} / ${mainArr.length}`
  }

 
  


//.........making pages for episode

function makePageForEpisodes(array) {
  rootElem.innerHTML = ""
  wrapper.innerHTML = ""
  array.forEach((x) => {
    const episode = document.createElement("div");
    episode.setAttribute("id", "episode");
    const title = document.createElement("h3");
    const titleContainer = document.createElement("div");
    titleContainer.setAttribute("class", "title-container");
    const episodeImg = document.createElement("img");
    episodeImg.setAttribute("id", "eImg")
    const EImgContainer = document.createElement("div");
    EImgContainer.setAttribute("id", "EImg-container");
    const ESummary = document.createElement("p");
    ESummary.setAttribute("class", "ESummary");

    title.textContent = `${x.name} - S${(x.season + "").padStart(2, "0")}E${(
      x.number + ""
    ).padStart(2, "0")}`;
    if (x.image) {
      episodeImg.src = x.image.original
    }
    ESummary.innerHTML = x.summary;
    rootElem.appendChild(wrapper);
    wrapper.appendChild(episode);
    episode.appendChild(titleContainer)
    titleContainer.appendChild(title);
    episode.appendChild(EImgContainer)
    EImgContainer.appendChild(episodeImg)
    episode.appendChild(ESummary)
  });
}



// function display(array) {
//     array.forEach((x) => {
//       const episode = document.createElement("div");
//       episode.setAttribute("id", "testId");
//       const title = document.createElement("h3");
//       const titleContainer = document.createElement("div");
//       titleContainer.setAttribute("class", "title-container");
//       const episodeImg = document.createElement("img");
//       const imgContainer = document.createElement("div");
//       imgContainer.setAttribute("id", "img-container");
//       const summary = document.createElement("p");

//       //  title.textContent = `${x.name} - S${(x.season + "").padStart(2, "0")}E${(
//       //     x.number + ""
//       //   ).padStart(2, "0")}`;
//       title.textContent = x.name
//         episodeImg.src = x.image.original;
//         summary.innerHTML = x.summary;
//         rootElem.appendChild(episode);
//         episode.appendChild(titleContainer);
//         titleContainer.appendChild(title);
//         // titleContainer.addEventListener("click", ()=> {
//         //   allShows.forEach(x => {
//         //     let url = x._links.self.href
//         //     fetch(url)
//         //     .then(response => response.json())
//         //     .then(data=> display(data))
//         //   })
//         // })
//         episode.appendChild(imgContainer)
//         imgContainer.appendChild(episodeImg)
//         episode.appendChild(summary);
//     }
//   );
// }

// // Fetching data from API

// fetch("https://api.tvmaze.com/shows/527/episodes")
//   .then((response) => response.json())
//   .then((data) => {
//     allEpisodes = data;
//     display(allShows)
//     allFunctions();
//   });

//   //  .....................Search Functionality.....................................................................
// function allFunctions () {
//   let search = document.getElementById("search");
//   let display = document.getElementById("display");

//   search.addEventListener("input", () => {
//     let result = allEpisodes.filter((object) => {
//       return (
//         object.name.toLowerCase().includes(search.value.toLowerCase()) ||
//         object.summary.toLowerCase().includes(search.value.toLowerCase())
//       );
//     });
//     display.innerText = `Displaying: ${result.length} / ${allEpisodes.length}`;
//     rootElem.innerHTML = "";
//     display(result);
//   });

//   // refreshing the search on click

//   search.addEventListener("click", () => {
//     rootElem.innerHTML = "";
//     display(allEpisodes);
//   });

//   //...........................Select Functionality..................................................................
//   const select = document.getElementById("select-field");

//   //creating the options and appending to the select tag

//   allEpisodes.forEach((x) => {
//     const option = document.createElement("option");
//     option.innerText = `S${(x.season + "").padStart(2, "0")}E${(
//       x.number + ""
//     ).padStart(2, "0")} - ${x.name}`;
//     select.appendChild(option);
//   });

//   //adding event listener for when the select value changes

//   select.addEventListener("change", () => {
//     let newArray = [];
//     let selectValue = select.value;
//     selectValue = selectValue.substring(8);
//     allEpisodes.forEach((x) => {
//       if (selectValue.includes(x.name)) {
//         newArray.push(x);
//         rootElem.innerHTML = "";
//         display(newArray);
//       }
//     });
//   });

//   //adding event listener on the refresh button

//   document.getElementById("reset").addEventListener("click", () => {
//     rootElem.innerHTML = "";
//     select.selectedIndex = 0;
//     display(allEpisodes);
//   });
// }
