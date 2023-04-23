const apiKey = 'live_orrpFOkRnwETAI0ZqqSM7j2zGQr8USMtX9fimecmbPn2hlMQjzAFp4Co0Mvh56Rv';
const apiUrl = `https://api.thecatapi.com/v1/images/search?api_key=${apiKey}`;
const catFactUrl = 'https://catfact.ninja/fact';

const button = document.querySelector('#new-cat-button');
const backgroundMusic = document.querySelector('#background-music');

const catImageContainer = document.querySelector('#cat-image-container');
const catBreedContainer = document.querySelector('#cat-breed-container');
const catFunFactWrapper = document.querySelector('#cat-fun-fact-wrapper');
const catFunFactContainer = document.querySelector('#cat-fun-fact-container');

let musicMuted = false;
	
button.addEventListener('click', () => {
  if (!musicMuted && !backgroundMusic.paused) {
    backgroundMusic.volume = 0.3;
    backgroundMusic.play();
  }	  

  catFunFactWrapper.style.display = 'block';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      catImageContainer.innerHTML = '';
      catBreedContainer.innerHTML = '';

      data.forEach(cat => {
        const img = document.createElement('img');
        img.src = cat.url;
        catImageContainer.appendChild(img);

        const p = document.createElement('p');
        p.textContent = cat.breeds.length > 0 ? cat.breeds[0].name : "Cat";
        catBreedContainer.appendChild(p);

	  fetchRandomFunFact();
      });
    })
    .catch(error => {
      console.log('Error:', error);
    });
});

button.addEventListener('mouseover', () => {
    customCursor.classList.add('hover');
});

button.addEventListener('mouseout', () => {
    customCursor.classList.remove('hover');
});


const stopMusicButton = document.querySelector('#stop-music-button');

stopMusicButton.addEventListener('click', () => {
    backgroundMusic.pause();
    musicMuted = true;
});

stopMusicButton.addEventListener('mouseover', () => {
    customCursor.classList.add('hover');
});

stopMusicButton.addEventListener('mouseout', () => {
    customCursor.classList.remove('hover');
});

function fetchRandomFunFact() {
  fetch(catFactUrl)
    .then(response => response.json())
    .then(data => {
      catFunFactContainer.innerHTML = data.fact;
    })
    .catch(error => {
      console.log('Error:', error);
    });
}


const customCursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', (event) => {
    customCursor.style.left = `${event.clientX}px`;
    customCursor.style.top = `${event.clientY}px`;
});

document.addEventListener('mouseenter', () => {
    customCursor.style.display = 'block';
});

document.addEventListener('mouseleave', () => {
    customCursor.style.display = 'none';
});

document.addEventListener('mousedown', () => {
    customCursor.classList.add('clicked');
});

document.addEventListener('mouseup', () => {
    customCursor.classList.remove('clicked');
});


