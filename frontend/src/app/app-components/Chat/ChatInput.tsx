import { AppContext } from "@/app/AppContext";
import { ArrowUpwardRounded } from "@mui/icons-material";
import MicIcon from "@mui/icons-material/Mic";
import { Button, useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { VirtuosoMessageListMethods } from "@virtuoso.dev/message-list";
import { RefObject, useContext, useState } from "react";
import {
  findFirstEmptyValue,
  generateQuestionFromLLM,
  generateVirtuosoMessage,
  LLM_CALL_FOR_ANSWER_VALIATION,
  promptFunction,
  // updateValueById,
  updateValueByName,
} from "@/app/utils";
import { Message } from "../../types/types";
import useMic from "@/app/hooks/useMic";
interface ChatInputProps {
  virtuoso: RefObject<VirtuosoMessageListMethods<Message, null> | null>;
  idCounter: number;
}

const ChatInput = ({ virtuoso, idCounter }: ChatInputProps) => {
  const context = useContext(AppContext);
  if (!context) throw new Error("App must be used within an AppProvider");

  const theme = useTheme();
  const [message, setMessage] = useState<string>("");

  const { listening, handleMicClick } = useMic(setMessage);

  const handleSendClick = async () => {
    if (!message.trim()) return;

    generateVirtuosoMessage("me", idCounter++, message, virtuoso);
    setMessage("");

    const valid = await LLM_CALL_FOR_ANSWER_VALIATION(message);
    if (!valid) {
      // Waiting for the flow and prompt
    }

    const storedQuestionData = JSON.parse(
      localStorage.getItem("questionData") ?? "{}"
    );
    const storedVictimDataQuestionData = JSON.parse(
      localStorage.getItem("victimQuestionData") ?? "{}"
    );
    updateValueByName(storedQuestionData, storedVictimDataQuestionData, context.currentQuestion, message);

    const questionObject = findFirstEmptyValue(
      JSON.parse(localStorage.getItem("questionData") ?? "{}")
    );
    context.setCurrentQuestion(questionObject.name);
    const question: string =
      promptFunction(JSON.stringify(questionObject), "QUESTION_FORMATION") ??
      "";

    const generatedQuestionFromLLM = await generateQuestionFromLLM(question);
    generateVirtuosoMessage(
      "other",
      idCounter++,
      generatedQuestionFromLLM,
      virtuoso
    );
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Type a message..."
      fullWidth
      sx={{
        width: "95vw",
      }}
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      color="primary"
      slotProps={{
        input: {
          style: { borderRadius: 50 },
          endAdornment: (
            <InputAdornment position="start">
              {message ? (
                <Button
                  variant="contained"
                  onClick={handleSendClick}
                  color="primary"
                  sx={{
                    borderRadius: "50%",
                    width: 25,
                    height: 30,
                    minWidth: 0,
                  }}
                >
                  <ArrowUpwardRounded />
                </Button>
              ) : (
                <IconButton
                  onClick={handleMicClick}
                  sx={{
                    color: listening ? theme.palette.primary.main : "default",
                  }}
                >
                  <MicIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default ChatInput;
