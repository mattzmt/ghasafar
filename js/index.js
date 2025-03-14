fetch('js/birds.json')
    .then(response => response.json())
    .then(data => {
        const randomBird = data[Math.floor(Math.random() * data.length)];
        const randomBirdImg = randomBird.img;
        document.getElementById('wtd-birds').style.backgroundImage = `url('${randomBirdImg}')`;
    })
    .catch(error => console.error('Error loading birds.json:', error));

fetch('js/places.json')
    .then(response => response.json())
    .then(data => {
        const randomPlace = data[Math.floor(Math.random() * data.length)];
        const randomPlaceImg = randomPlace.img;
        document.getElementById('wtd-places').style.backgroundImage = `url('${randomPlaceImg}')`;
    })
    .catch(error => console.error('Error loading places.json:', error));