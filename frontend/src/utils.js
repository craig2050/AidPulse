import {questionFormationPrompt} from "./promts.js";

const promptFunction = (questionObj) => {
    return `${questionFormationPrompt}${questionObj}`
}

export default promptFunction