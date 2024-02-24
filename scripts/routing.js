// import Navigo from "navigo";

import VanillaJSRouter from "@daleighan/vanilla-js-router";
import homePage from "../pages/home.js";
import aboutUsPage from "../pages/aboutus.js";
import accountantPage from "../pages/accountant.js";
import legalPage from "../pages/legal.js";
import virtualAssistantPage from "../pages/virtualAssistant.js";
import itPage from "../pages/it.js";
// import settingsPage from "./pages/settings.js";

const routes = {
  "/": homePage,
  "/aboutUs": aboutUsPage,
  "/Accounting-and-Bookkeeping": accountantPage,
  "/Legal-Contract-Drafting": legalPage,
  "/Virtual-Assistants": virtualAssistantPage,
  "/IT-Infrastructure-and-Services": itPage,
};

const router = new VanillaJSRouter("root", routes);

document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    router.navigate(link.getAttribute("href"));
  });
});

router.init();
