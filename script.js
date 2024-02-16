const SearchButton = document.querySelector(".search-button");
const Search = document.querySelector("#search");
const title = document.querySelector(".title");
const year = document.querySelector(".year");
const rated = document.querySelector(".rated");
const released = document.querySelector(".released");
const runtime = document.querySelector(".runtime");
const genre = document.querySelector(".genre");
const plot = document.querySelector(".plot");
const language = document.querySelector(".language");
const imdbRating = document.querySelector(".imdbRating");
const type = document.querySelector(".type");
const country = document.querySelector(".country");
const website = document.querySelector(".website");
const image = document.querySelector(".image");

document.addEventListener("DOMContentLoaded", function () {
  let titlequery;
  document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
  });
  SearchButton.addEventListener("click", function () {
    titlequery = Search.value;
    console.log(Search.value);
  });
  // Create an object with the form data
  const formData = {
    title: titlequery,
  };

  // Convert the data to a JSON string
  const jsonData = JSON.stringify(formData);

  fetch("http://http://localhost:5189/api/Movie/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((responseData) => {
      // Handle the response from the API, e.g., show a success message
      console.log("Event added successfully:", responseData);
      Cards(responseData.data);
    })
    .catch((error) => {
      console.error("Error adding event:", error);
    });
  function Cards(eventData) {
    title.textContent = eventData.title;
    year.textContent = eventData.year;
    rated.textContent = eventData.rated;
    runtime.textContent = eventData.runtime;
    released.textContent = eventData.released;
    genre.textContent = eventData.genre;
    plot.textContent = eventData.plot;
    language.textContent = eventData.language;
    country.textContent = eventData.country;
    imdbRating.textContent = eventData.imdbRating;
    image.src = eventData.poster;
    type.textContent = eventData.type;
  }

  fetch("http://localhost:5189/api/Movie/last-five-entries")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Call a function to create cards using the retrieved data
      searchs(data.data);
    })
    .catch((error) => {
      console.error("Error fetching event data:", error);
    });

  function searchs(data) {
    const container = document.querySelector(".search-list"); // Replace with your container selector

    data.forEach((eventData) => {
      const eventCard = document.createElement("div");

      eventCard.innerHTML = `
                    <h2>${eventData}</h2>`;
      container.insertBefore(eventCard, container.children[0]);
    });
  }
});
