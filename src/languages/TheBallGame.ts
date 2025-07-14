import { element } from "../JSTools";

function setLanguage(language: "en" | "pt") {
  const canvas = (window as any).globals.canvas;
  
  switch (language) {
  case "en":
    document.cookie = "language=" + language + "; expires=Thu, 01 Jan 2040 00:00:00 UTC; path=/;";
    document.title = "The Ball Game";
    canvas.innerHTML = "Your browser doesn't support the HTML5 canvas tag.";
    element("backToIndex")!.innerHTML = "Back";
    element("reloadButton")!.innerHTML = "Reload";
    element("downloadGame")!.innerHTML = "Download Game (Portuguese only)";
    (window as any).globals.livesText_lang = "Lives";
    (window as any).globals.scoreText_lang = "Score";
    (window as any).globals.playGameOption_lang = "Play";
    (window as any).globals.optionsOption_lang = "Options";
    (window as any).globals.downloadOption_lang = "Download";
    (window as any).globals.optionsSoon_lang = "Soon";
    (window as any).globals.backToMenu_lang = "Exit";
    (window as any).globals.exitOptionsButton_lang = "Back to Main Menu";
    break;
  default:
    localStorage.removeItem("language");
    document.cookie = "language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.title = "Jogo da Bolinha";
    canvas.innerHTML = "O teu browser não suporta a tag canvas do HTML5.";
    element("backToIndex")!.innerHTML = "Voltar";
    element("reloadButton")!.innerHTML = "Recarregar";
    element("downloadGame")!.innerHTML = "Descarregar Jogo";
    (window as any).globals.livesText_lang = "Vidas";
    (window as any).globals.scoreText_lang = "Pontuação";
    (window as any).globals.playGameOption_lang = "Jogar";
    (window as any).globals.optionsOption_lang = "Opções";
    (window as any).globals.downloadOption_lang = "Descarregar";
    (window as any).globals.optionsSoon_lang = "Brevemente";
    (window as any).globals.backToMenu_lang = "Sair";
    (window as any).globals.exitOptionsButton_lang = "Voltar para o Menu Principal";
    break;
  }
}

export { setLanguage };