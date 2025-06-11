const form = document.querySelector('form');
const firstColor = document.querySelector('#first-color');
const secondColor = document.querySelector('#second-color');
const thirdColor = document.querySelector('#third-color');
const fourthColor = document.querySelector('#fourth-color');
const fifthColor = document.querySelector('#fifth-color');

const colorsInfo = document.getElementsByClassName('color-info');

for (let colorInfo of colorsInfo) {
    console.log(colorInfo);
}

let color = '';
let colorType = '';


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = new FormData(form);
    color = data.get('color').slice(1, 7);
    colorType = data.get('color-type');
    getColors(color, colorType).then(r => {
        firstColor.style.backgroundColor = r[0].hex.value;
        secondColor.style.backgroundColor = r[1].hex.value;
        thirdColor.style.backgroundColor = r[2].hex.value;
        fourthColor.style.backgroundColor = r[3].hex.value;
        fifthColor.style.backgroundColor = r[4].hex.value;

        for (let i = 0; i < r.length; i++) {
            colorsInfo[i].textContent = r[i].hex.value;
        }
    });
})

async function getColors(color, colorType) {
    const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${colorType}&count=6`);
    const data = await response.json();
    console.log(data.colors)
    return data.colors;
}