import { element, getCookie } from "../JSTools";
import { setLanguage } from "../languages/index";

const dropdownLanguage = element("dropdownLanguage") as HTMLSelectElement | null;
if (dropdownLanguage) {
  dropdownLanguage.onchange = () => setLanguage(dropdownLanguage.value as "pt" | "en");
  const cookieLang = getCookie("language");
  if (cookieLang != undefined && cookieLang !== "") {
    dropdownLanguage.value = cookieLang;
  } else {
    dropdownLanguage.value = "pt";
  }
}

setLanguage(getCookie("language") as "pt" | "en");
