const fetchData = url => fetch(url).then(res => res.json());

const select = document.getElementById('breed');
const card = document.querySelector('.card-body');

// Breed Options
fetchData('https://dog.ceo/api/breeds/list').then(data => {
  const breeds = data.message.map(breed => `<option value='${breed}'>${breed}</option>`);

  breeds.unshift(`<option>random</option>`)

  select.innerHTML = breeds.join(' ');
});

// Fetch Random Dog
function fetchRandomDog() {
  fetchData(`https://dog.ceo/api/breeds/image/random`).then(data => generateImage(data));
}

// Generate Image
function generateImage(data) {
  const html = `
    <img src="${data.message}" class="w-100">
    <p class="mt-3">Click to view another ${select.value}.</p>
  `;
  
  card.innerHTML = html;
}

// Fetch Specific Breed
function fetchBreedImage() {
  const breed = select.value;
  const img = card.querySelector('img');
  const p = card.querySelector('p');
  
  fetchData(`https://dog.ceo/api/breed/${breed}/images/random`).then(data => {
    img.src = data.message;
    p.textContent = `Click to view another ${breed}.`;
  });
}

// Fetch random or breed dog
function randomOrBreed() {
  if (select.value === "random") {
    fetchRandomDog();
  } else {
    fetchBreedImage();
  }
}

// Event Listeners
card.addEventListener('click', randomOrBreed);
select.addEventListener('change', randomOrBreed);

fetchRandomDog();