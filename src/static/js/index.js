const style = ["style1", "style2", "style3", "style4"];
const tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
const opacity = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"];

const getRandomArbitrary = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const updateWindowSize = () => {
  widthWindow = window.innerWidth;
  heightWindow = window.innerHeight;
};

let estrela = "";
const qtdeEstrelas = 250;
const noite = document.querySelector(".constelacao");
let widthWindow = window.innerWidth;
let heightWindow = window.innerHeight;

window.addEventListener("resize", updateWindowSize);

for (let i = 0; i < qtdeEstrelas; i++) {
  estrela +=
    `<span class='estrela ${style[getRandomArbitrary(0, 4)]} ${opacity[getRandomArbitrary(0, 6)]} ${tam[getRandomArbitrary(0, 5)]}' style='animation-delay: .${getRandomArbitrary(0, 9)}s; left: ${getRandomArbitrary(0, widthWindow)}px; top: ${getRandomArbitrary(0, heightWindow)}px;'></span>`;
}

noite.innerHTML = estrela;

const updateStarPositions = () => {
  const estrelas = document.querySelectorAll(".estrela");
  estrelas.forEach((estrela) => {
    estrela.style.left = `${getRandomArbitrary(0, widthWindow)}px`;
    estrela.style.top = `${getRandomArbitrary(0, heightWindow)}px`;
  });
};

window.addEventListener("resize", updateStarPositions);

let numeroAleatorio = 5000;
const meteoroContainer = document.querySelector(".chuvaMeteoro");

const carregarMeteoro = () => {
  setTimeout(carregarMeteoro, numeroAleatorio);
  numeroAleatorio = getRandomArbitrary(5000, 10000);
  const meteoro = `<div class='meteoro ${style[getRandomArbitrary(0, 4)]}'></div>`;
  meteoroContainer.innerHTML = meteoro;
  setTimeout(() => {
    meteoroContainer.innerHTML = "";
  }, 1000);
};

// init 함수를 정의합니다.
const init = () => {
  carregarMeteoro(); // 초기화할 때 메테오를 로드합니다.
};

window.onload = () => {
  init();
};
