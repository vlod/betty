import { createLI, updateStaticData } from "./setup.js";
import engine from "./engine.js";

const addToLog = (logEntry) => {
  const logUL = document.querySelector("#tab-log ul");
  logUL.appendChild(createLI(logEntry));
};

const clearLog = () => {
  const tabLog = document.querySelector("#tab-log");
  const ul = document.createElement("ul");

  tabLog.replaceChild(ul, tabLog.children[0]);
};

// we want to rebuild the UI if a script is loaded
document.addEventListener("SCRIPT_LOADED", () => {
  console.log("## EVENT: onScriptLoaded: got event scriptLoaded");
  updateStaticData(engine.data());
  addToLog("SCRIPT_LOADED");
});

document.addEventListener("EVENT_LOG", (event) => {
  console.log(`## EVENT: [EVENT_LOG]: ${JSON.stringify(event.detail)}`);

  const { type, data } = event.detail;
  addToLog(`${type}: ${data}`);
});

document.addEventListener("EVENT_LOG_CLEAR", () => {
  console.log("## EVENT: [EVENT_LOG_CLEAR]");

  clearLog();
});

document.addEventListener("EVENT_BETTY_RESPONSE", (event) => {
  console.log("## EVENT: [EVENT_LOG_CLEAR]");

  const responseInput = document.getElementById("betty-response");
  responseInput.value = event.detail.data;
});

// load initial script
fetch("https://vlod.github.io/betty/static//Elizabeth.txt")
  .then((res) => res.text())
  .then((responseText) => {
    // apply the loaded script to UI
    const textarea = document.getElementById("schema");
    textarea.value = responseText;

    engine.initialize(responseText);
  });
