import { element } from "../JSTools";

function setLanguage(language: "en" | "pt") {
  switch (language) {
  case "en": //ENGLISH
    document.cookie = "language=" + language + "; expires=Thu, 01 Jan 2040 00:00:00 UTC; path=/;";
    document.title = "HTML&JS";
    element("subtitle")!.innerHTML = "Welcome to this page!";
    element("description")!.innerHTML = "Here will be a space for web pages ... Look out!";
    element("reloadButton")!.innerHTML = "Reload";
    element("Animation 1_html")!.innerHTML = "Animation 1";
    element("Animation 2_html")!.innerHTML = "Animation 2";
    element("Ball Game_html")!.innerHTML = "The Ball Game";
    element("Monopoly_html")!.innerHTML = "Monopoly";
    break;
  default:  //PORTUGUÊS
    document.cookie = "language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("language");
    document.title = "HTML&JS";
    element("subtitle")!.innerHTML = "Bem vindo a esta página!";
    element("description")!.innerHTML = "Aqui haverá um espaço para páginas web... Esteja atento!";
    element("reloadButton")!.innerHTML = "Recarregar";
    element("Animation 1_html")!.innerHTML = "Animação 1";
    element("Animation 2_html")!.innerHTML = "Animação 2";
    element("Ball Game_html")!.innerHTML = "Jogo da Bolinha";
    element("Monopoly_html")!.innerHTML = "Monopólio";
    break;
  }
}

export { setLanguage };