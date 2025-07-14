import { element } from "../JSTools";

function setLanguage(language: "en" | "pt") {
  switch (language) {
  case "en":
    document.cookie = "language=" + language + "; expires=Thu, 01 Jan 2040 00:00:00 UTC; path=/;";
    document.title = "Animation 1";
    canvas.innerHTML = "Your browser doesn't support the HTML5 canvas tag.";
    element("backToIndex")!.innerHTML = "Back";
    element("reloadButton")!.innerHTML = "Reload";
    element("speed")!.innerHTML = "Speed: ";
    element("speedBox")!.title = "Ball(s) speed.";
    element("randomPosition")!.innerHTML = "Randomize Position";
    element("randomSpeed")!.innerHTML = "Randomize Speed";
    element("balls")!.innerHTML = "Balls: ";
    element("ballsBox")!.title = "Number of balls in the animation.";
    break;
  default:
    document.cookie = "language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("language");
    document.title = "Animação 1";
    canvas.innerHTML = "O teu browser não suporta a tag canvas do HTML5.";
    element("backToIndex")!.innerHTML = "Voltar";
    element("reloadButton")!.innerHTML = "Recarregar";
    element("speed")!.innerHTML = "Velocidade: ";
    element("speedBox")!.title = "Velocidade da(s) bola(s).";
    element("randomPosition")!.innerHTML = "Aleatorizar Posição";
    element("randomSpeed")!.innerHTML = "Aleatorizar Velocidade";
    element("balls")!.innerHTML = "Bolas: ";
    element("ballsBox")!.title = "Número de bolas na animação.";
    break;
  }
}

export { setLanguage };