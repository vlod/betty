import engine from "./engine.js";

const applyButtonClick = (elementId) => {
  const textarea = document.getElementById(elementId);
  const schemaText = textarea.value;

  engine.initialize(schemaText);
  updateStaticData(engine.data());
};

const updateInputStaticData = (engineDataInputs) => {
  var ul = document.createElement("ul");

  engineDataInputs.map((input) => {
    var li = document.createElement("li");
    li.appendChild(
      document.createTextNode(`${input.match} - ${input.replacement}`)
    );
    ul.appendChild(li);
  });
  document.getElementById("tab-input").appendChild(ul);
};

const updateOutputStaticData = (engineDataOutputs) => {
  var ul = document.createElement("ul");
  engineDataOutputs.map((output) => {
    var li = document.createElement("li");
    li.appendChild(
      document.createTextNode(`${output.match} - ${output.replacement}`)
    );
    ul.appendChild(li);
  });
  document.getElementById("tab-output").appendChild(ul);
};

const createLI = (text) => {
  const li = document.createElement("li");
  li.append(document.createTextNode(text));
  return li;
};
const updatMessagesStaticData = (params) => {
  const { welcomeMessage, voidResonseMessage, noKeywordReponseMessage } =
    params;

  const ul = document.createElement("ul");
  ul.appendChild(createLI(`Welcome: ${welcomeMessage}`));
  ul.appendChild(createLI(`Void Response: ${voidResonseMessage}`));
  ul.appendChild(createLI(`No Key: ${noKeywordReponseMessage}`));

  document.getElementById("tab-messages").appendChild(ul);
};

const switchTabTo = (tabName) => {
  // get the old tab-link and remove the classname of 'selected'
  const tabLinkSelected =
    document.getElementsByClassName("tab-link-selected")[0];
  tabLinkSelected.className = tabLinkSelected.className.replace(
    /\s*tab-link-selected\s*/,
    ""
  );

  // mark the newly clicked tab-link as selected
  const tabLinkElement = document.getElementById(`tab-link-${tabName}`);
  tabLinkElement.className = `${tabLinkElement.className} tab-link-selected`;

  // hide the previously selected tab
  const oldTab = document.getElementsByClassName("tab-selected")[0];
  oldTab.className = oldTab.className.replace(/\s*tab-selected\s*/, "");
  oldTab.style.display = "none";

  // mark the newly clicked tab as selected
  const tabElement = document.getElementById(`tab-${tabName}`);
  tabElement.className = `${oldTab.className} tab-selected`;
  tabElement.style.display = "block";
};

// we are using modules and html has a problem seeing these functions, so set it up manually
const setupClickEvents = () => {
  // LOG tab
  document.getElementById("tab-link-log").onclick = () => switchTabTo("log");

  // INPUT tab
  document.getElementById("tab-link-input").onclick = () =>
    switchTabTo("input");

  // OUTPUT tab
  document.getElementById("tab-link-output").onclick = () =>
    switchTabTo("output");

  // MESSAGES tab
  document.getElementById("tab-link-messages").onclick = () =>
    switchTabTo("messages");

  // APPLY button
  document.getElementById("schema-apply").onclick = () =>
    applyButtonClick("schema");

  document.getElementById("user-input-form").onsubmit = (e) => {
    e.preventDefault();

    const input = document.querySelector("#user-input-form input");
    engine.processUserInput(input.value);
  };
};

const updateStaticData = (engineData) => {
  updateInputStaticData(engineData.inputs);
  updateOutputStaticData(engineData.outputs);
  updatMessagesStaticData({
    welcomeMessage: engineData.welcomeMessage,
    voidResponseMessage: engineData.voidResponseMessage,
    noKeywordReponseMessage: engineData.noKeywordReponseMessage,
  });
};

setupClickEvents();

export { createLI, updateStaticData };
