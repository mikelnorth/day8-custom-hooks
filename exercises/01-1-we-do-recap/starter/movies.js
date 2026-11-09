// A pretend movie API, so the recap works without the internet. It answers after half a second.
// Search for "oops" to see the error state.
const movies = [
  { id: 1, title: "The Iron Giant", year: 1999 },
  { id: 2, title: "Spirited Away", year: 2001 },
  { id: 3, title: "Inside Out", year: 2015 },
  { id: 4, title: "Coco", year: 2017 },
  { id: 5, title: "Into the Spider-Verse", year: 2018 },
  { id: 6, title: "The Incredibles", year: 2004 },
];

export function fetchMovies(searchTerm) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (searchTerm.trim().toLowerCase() === "oops") {
        reject(new Error("Something went wrong. Try another search."));
        return;
      }
      const query = searchTerm.toLowerCase();
      resolve(movies.filter((movie) => movie.title.toLowerCase().includes(query)));
    }, 500);
  });
}
