fetch('js/birds.json')
    .then(response => response.json())
    .then(data => {
        const randomBird = data[Math.floor(Math.random() * data.length)];
        const randomSmallBirdImg = randomBird.smallImg;
        document.getElementById('wtd-birds').style.backgroundImage = `url('${randomSmallBirdImg}')`;
    })
    .catch(error => console.error('Error loading birds.json:', error));

fetch('js/places.json')
    .then(response => response.json())
    .then(data => {
        const randomPlace = data[Math.floor(Math.random() * data.length)];
        const randomSmallPlaceImg = randomPlace.smallImg;
        document.getElementById('wtd-places').style.backgroundImage = `url('${randomSmallPlaceImg}')`;
    })
    .catch(error => console.error('Error loading places.json:', error));