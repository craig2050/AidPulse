import {
  answerValidationPrompt,
  questionFormationPrompt,
} from "@/data/prompts.js";
import { LLMCOMMUNICATION_API_URL } from "@/data/constants.js";
import axios from "axios";

const promptFunction = (value, type) => {
  if (type === "QUESTION_FORMATION")
    return `${questionFormationPrompt}${value}. Example: {question: What is your name?}`;
  if (type === "ANSWER_VALIDATION") return `${answerValidationPrompt}${value}`;
};

const findFirstEmptyValue = (json) =>
  Object.values(json)
    .flatMap((section) => section.data)
    .find((item) => item.value === "" || item.value === null) || null;

const updateValueById = (data, id, newValue) => {
  for (const category in data) {
    const items = data[category].data;
    const item = items.find((obj) => obj.id === id);
    if (item) {
      item.value = newValue;
      break;
    }
  }

  localStorage.setItem("questionData", JSON.stringify(data));
};

const generateQuestionFromLLM = async (question) => {
  try {
    const payload = { prompt: question };
    const { data } = await axios.post(LLMCOMMUNICATION_API_URL, payload);
    return data.response;
  } catch (error) {
    console.error("Error communicating with LLM API:", error);
  }
};

const generateVirtuosoMessage = (user, idCounter, message, virtuoso) => {
  const messageObj = {
    user: user,
    key: `${idCounter}`,
    text: message,
  };

  virtuoso.current?.data.append([messageObj], "smooth");
};

const LLM_CALL_FOR_ANSWER_VALIATION = async (answer) => {
  try {
    const validationPrompt = promptFunction(answer, "ANSWER_VALIDATION");

    const response = await axios.post(LLMCOMMUNICATION_API_URL, {
      prompt: validationPrompt,
    });

    return response.data
  } catch (error) {
    console.log(error);
  }
};

export {
  promptFunction,
  findFirstEmptyValue,
  updateValueById,
  generateQuestionFromLLM,
  generateVirtuosoMessage,
  LLM_CALL_FOR_ANSWER_VALIATION,
};
