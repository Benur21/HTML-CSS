import { element } from "../../src/JSTools";
import { canvas } from "../../src/Monopoly_Initialization";

function setLanguage(language: "en" | "pt") {
  switch (language) {
  case "en":
    document.cookie = "language=" + language + "; expires=Thu, 01 Jan 2040 00:00:00 UTC; path=/;";
    document.title = "Monopoly";
    canvas.innerHTML = "Your browser doesn't support the HTML5 canvas tag.";
    element("backToIndex")!.innerHTML = "Back";
    element("reloadButton")!.innerHTML = "Reload";
    break;
  default:
    document.cookie = "language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("language");
    document.title = "Monopólio";
    canvas.innerHTML = "O teu browser não suporta a tag canvas do HTML5.";
    element("backToIndex")!.innerHTML = "Voltar";
    element("reloadButton")!.innerHTML = "Recarregar";
    break;
  }
}

export { setLanguage };