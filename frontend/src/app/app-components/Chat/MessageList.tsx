"use client";

import { Avatar, useTheme } from "@mui/material";
import {
  VirtuosoMessageList,
  VirtuosoMessageListLicense,
  VirtuosoMessageListMethods,
  VirtuosoMessageListProps,
} from "@virtuoso.dev/message-list";
import { useContext, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import { Message } from "@/app/types/types";
import { AppContext } from "@/app/AppContext";
import Image from "next/image";
import {
  findFirstEmptyValue,
  generateQuestionFromLLM,
  generateVirtuosoMessage,
  promptFunction,
} from "@/app/utils";
import { WELCOME_MESSAGE } from "@/data/constants";

const key = process.env.NEXT_PUBLIC_VIRTUOSO_KEY || "";

const ItemContent: VirtuosoMessageListProps<Message, null>["ItemContent"] = ({
  data,
}: {
  data: Message;
}) => {
  const ownMessage = data.user === "me";
  const theme = useTheme();

  return (
    <div
      style={{
        paddingBottom: "2rem",
        display: "flex",
        alignItems: "flex-end",
        flexDirection: data.user === "me" ? "row-reverse" : "row",
      }}
    >
      {data.user !== "me" && (
        <Avatar style={{ backgroundColor: "#1E1E1E" }}>
          <Image
            alt="AidPulse Avatar"
            src="/assets/logo.webp"
            height={24}
            width={24}
          ></Image>
        </Avatar>
      )}

      <div
        style={{
          maxWidth: "65%",
          marginLeft: data.user === "me" ? undefined : 8,
          marginRight: data.user === "me" ? 8 : undefined,
          background: ownMessage
            ? theme.palette.primary.main
            : theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: "1rem",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {data.text}
      </div>
    </div>
  );
};

export default function MessageList() {
  const virtuoso = useRef<VirtuosoMessageListMethods<Message, null>>(null);
  const context = useContext(AppContext);
  if (!context) throw new Error("App must be used within an AppProvider");

  let idCounter = 0;

  useEffect(() => {
    const handleNewUserFlow = async () => {
      if (context?.userIdentifier === "") {
        context.configureNewUserSetup();
        generateVirtuosoMessage(
          "other",
          idCounter++,
          WELCOME_MESSAGE,
          virtuoso
        );
      }

      const firstQuestionObject = findFirstEmptyValue(
        JSON.parse(localStorage.getItem("questionData") ?? "")
      );
      context.setCurrentQuestion(firstQuestionObject.name);
      const question: string =
        promptFunction(
          JSON.stringify(firstQuestionObject),
          "QUESTION_FORMATION"
        ) ?? "";

      const generatedQuestionFromLLM = await generateQuestionFromLLM(question);
      generateVirtuosoMessage(
        "other",
        idCounter++,
        generatedQuestionFromLLM,
        virtuoso
      );
    };

    handleNewUserFlow();
  }, []);

  return (
    <div
      className="tall-example"
      style={{
        height: "calc(100vh - 84px)",
        display: "flex",
        flexDirection: "column",
        fontSize: "80%",
      }}
    >
      <VirtuosoMessageListLicense licenseKey={key}>
        <VirtuosoMessageList<Message, null>
          ref={virtuoso}
          style={{ flex: 1, backgroundColor: "black" }}
          computeItemKey={({ data }: { data: Message }) => data.key}
          initialLocation={{ index: "LAST", align: "end" }}
          shortSizeAlign="bottom-smooth"
          ItemContent={ItemContent}
        />
      </VirtuosoMessageListLicense>
      <div
        className="chat-input-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 16,
        }}
      >
        <ChatInput virtuoso={virtuoso} idCounter={idCounter} />
      </div>
    </div>
  );
}
