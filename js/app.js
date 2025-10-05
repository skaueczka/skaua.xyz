const search = document.getElementById("search");
const songList = document.getElementById("songList");
const player = document.getElementById("player");

let songs = [];

async function loadSongs() {
  const res = await fetch("songs.json");
  songs = await res.json();
  renderList('');
}

function renderList(filter) {
  const query = filter.toLowerCase();
  const filtered = songs.filter(song => song.name.toLowerCase().includes(query));

  songList.innerHTML = filtered.map(song =>
    `<li data-url="${song.url}">${song.name}</li>`
  ).join('') || "<p>Brak wyników</p>";
}

search.addEventListener("input", (e) => renderList(e.target.value));

songList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const url = e.target.dataset.url;
    player.src = url;
    player.play();
  }
});

loadSongs();
