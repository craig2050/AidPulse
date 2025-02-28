import { questionFormationPrompt } from "./promts.js";

const promptFunction = (questionObj) => {
  return `${questionFormationPrompt}${questionObj}. Example: {question: What is your name?}`;
};

const findFirstEmptyValue = (json) => {
  for (const section of Object.values(json)) {
    const result = section.data.find(
      (item) => item.value === "" || item.value === null
    );
    console.log(`obj`, result)
    if (result) return result;
  }

  return null;
};

const updateValueById = (data, id, newValue) => {
  for (const category in data) {
    const items = data[category].data;
    const item = items.find(obj => obj.id === id);
    if (item) {
      item.value = newValue;
      break
    }
  }
  
  localStorage.setItem("questionData", JSON.stringify(data))
};


export { promptFunction, findFirstEmptyValue, updateValueById };