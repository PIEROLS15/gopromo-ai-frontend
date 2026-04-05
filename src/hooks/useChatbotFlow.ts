"use client";

import { useEffect, useRef, useState } from "react";
import {
  chatbotStorageKeys,
  filterPackagesByPreferences,
  getDurationQuestionMessage,
  getGenericReplyMessage,
  getInitialChatbotMessages,
  getLevelQuestionMessage,
  getResultsMessage,
  toLabel,
} from "@/services/chatbot.service";
import type {
  ChatbotMessage,
  ChatbotPreferences,
  ChatbotStep,
} from "@/types/chatbot";

const createMessageId = () => Date.now().toString();

export const useChatbotFlow = () => {
  const [messages, setMessages] = useState<ChatbotMessage[]>(
    getInitialChatbotMessages()
  );
  const [inputValue, setInputValue] = useState("");
  const [currentStep, setCurrentStep] = useState<ChatbotStep>("category");
  const [preferences, setPreferences] = useState<ChatbotPreferences>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem(chatbotStorageKeys.messages);
    const savedStep = localStorage.getItem(chatbotStorageKeys.step);
    const savedPreferences = localStorage.getItem(chatbotStorageKeys.preferences);

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    if (savedStep) {
      setCurrentStep(JSON.parse(savedStep));
    }
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(chatbotStorageKeys.messages, JSON.stringify(messages));
    localStorage.setItem(chatbotStorageKeys.step, JSON.stringify(currentStep));
    localStorage.setItem(
      chatbotStorageKeys.preferences,
      JSON.stringify(preferences)
    );
  }, [messages, currentStep, preferences]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOptionClick = (value: string) => {
    const nextPreferences = { ...preferences };

    if (currentStep === "category") {
      nextPreferences.category = value;
      setPreferences(nextPreferences);

      const userMessageId = createMessageId();
      setMessages((prev) => [
        ...prev,
        {
          id: userMessageId,
          type: "user",
          content: toLabel(value),
        },
        getDurationQuestionMessage(`${Number(userMessageId) + 1}`),
      ]);
      setCurrentStep("duration");
      return;
    }

    if (currentStep === "duration") {
      nextPreferences.duration = value;
      setPreferences(nextPreferences);

      const userMessageId = createMessageId();
      setMessages((prev) => [
        ...prev,
        {
          id: userMessageId,
          type: "user",
          content: value,
        },
        getLevelQuestionMessage(`${Number(userMessageId) + 1}`),
      ]);
      setCurrentStep("level");
      return;
    }

    if (currentStep === "level") {
      nextPreferences.level = value;
      setPreferences(nextPreferences);

      const results = filterPackagesByPreferences(nextPreferences);
      const userMessageId = createMessageId();

      setMessages((prev) => [
        ...prev,
        {
          id: userMessageId,
          type: "user",
          content: toLabel(value),
        },
        getResultsMessage(`${Number(userMessageId) + 1}`, results),
      ]);
      setCurrentStep("results");
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessageId = createMessageId();

    setMessages((prev) => [
      ...prev,
      {
        id: userMessageId,
        type: "user",
        content: inputValue,
      },
      getGenericReplyMessage(`${Number(userMessageId) + 1}`),
    ]);
    setInputValue("");
  };

  const handleRestart = () => {
    setMessages(getInitialChatbotMessages());
    setCurrentStep("category");
    setPreferences({});
  };

  const handleClearChat = () => {
    handleRestart();
    localStorage.removeItem(chatbotStorageKeys.messages);
    localStorage.removeItem(chatbotStorageKeys.step);
    localStorage.removeItem(chatbotStorageKeys.preferences);
  };

  return {
    messages,
    inputValue,
    setInputValue,
    messagesEndRef,
    handleOptionClick,
    handleSendMessage,
    handleRestart,
    handleClearChat,
  };
};
