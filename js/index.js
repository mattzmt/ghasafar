fetch('js/birds.json')
    .then(response => response.json())
    .then(data => {
        const randomItem = data[Math.floor(Math.random() * data.length)];
        const randomSmallImg = randomItem.smallImg;
        document.getElementById('wtd-birds').style.backgroundImage = `url('${randomSmallImg}')`;
    })
    .catch(error => console.error('Error loading images:', error));