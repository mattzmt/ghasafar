function adjustGrid() {
    const parent = document.querySelector('#wtd');
    const containerWidth = parent.clientWidth;
    const itemMinWidth = 170;
  
    let cols = Math.floor(containerWidth / itemMinWidth);
    if (cols % 2 !== 0) cols--;
  
    parent.style.gridTemplateColumns = `repeat(${Math.max(cols, 2)}, 1fr)`;
}

window.addEventListener('resize', adjustGrid);
window.addEventListener('load', adjustGrid);

fetch('js/birds.json')
    .then(response => response.json())
    .then(data => {
        const randomItem = data[Math.floor(Math.random() * data.length)];
        const randomSmallImg = randomItem.smallImg;
        document.getElementById('wtd-birds').style.backgroundImage = `url('${randomSmallImg}')`;
    })
    .catch(error => console.error('Error loading images:', error));