function setLanguage(language) {
  switch (language) {
  case "en":
    document.cookie = "language=" + language + "; expires=Thu, 01 Jan 2040 00:00:00 UTC; path=/;";
    document.title = "The Ball Game";
    canvas.innerHTML = "Your browser doesn't support the HTML5 canvas tag.";
    element("backToIndex").innerHTML = "Back";
    element("reloadButton").innerHTML = "Reload";
    element("downloadGame").innerHTML = "Download Game (Portuguese only)";
    livesText_lang = "Lives";
    scoreText_lang = "Score";
    playGameOption_lang = "Play";
    optionsOption_lang = "Options";
    downloadOption_lang = "Download";
    optionsSoon_lang = "Soon";
    backToMenu_lang = "Exit";
    exitOptionsButton_lang = "Back to Main Menu";
    break;
  default:
    localStorage.removeItem("language");
    document.cookie = "language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.title = "Jogo da Bolinha";
    canvas.innerHTML = "O teu browser não suporta a tag canvas do HTML5.";
    element("backToIndex").innerHTML = "Voltar";
    element("reloadButton").innerHTML = "Recarregar";
    element("downloadGame").innerHTML = "Descarregar Jogo";
    livesText_lang = "Vidas";
    scoreText_lang = "Pontuação";
    playGameOption_lang = "Jogar";
    optionsOption_lang = "Opções";
    downloadOption_lang = "Descarregar";
    optionsSoon_lang = "Brevemente";
    backToMenu_lang = "Sair";
    exitOptionsButton_lang = "Voltar para o Menu Principal";
    break;
  }
}