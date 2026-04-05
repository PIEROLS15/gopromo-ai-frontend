"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Send, Sparkles, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useChat } from "@/context/chatContext";
import { useChatbotFlow } from "@/hooks/useChatbotFlow";

export function Chatbot() {
  const { isOpen, openChat, closeChat } = useChat();
  const {
    messages,
    inputValue,
    setInputValue,
    messagesEndRef,
    handleOptionClick,
    handleSendMessage,
    handleRestart,
    handleClearChat,
  } = useChatbotFlow();

  if (!isOpen) {
    return (
      <Button
        size="lg"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg md:h-16 md:w-16"
        onClick={openChat}
      >
        <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 flex h-[70vh] w-[calc(100vw-48px)] max-w-sm flex-col shadow-2xl sm:h-125 sm:w-96 md:h-137.5 md:max-w-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-primary p-3 text-primary-foreground">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold">PromoTrip AI</h3>
            <p className="text-xs opacity-90">Asistente de viajes</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/20"
          onClick={closeChat}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                message.type === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>

              {message.options && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.options.map((option) => (
                    <Button
                      key={option.value}
                      variant="outline"
                      size="sm"
                      className="bg-background"
                      onClick={() => handleOptionClick(option.value)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              )}

              {message.packages && (
                <div className="mt-3 space-y-3">
                  {message.packages.map((pkg) => (
                    <Card key={pkg.id} className="overflow-hidden">
                      <div className="relative aspect-video">
                        <Image
                          src={pkg.image || "/placeholder.svg"}
                          alt={pkg.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold leading-tight">
                            {pkg.name}
                          </h4>
                          <Badge variant="secondary" className="shrink-0 text-xs">
                            S/{pkg.price}
                          </Badge>
                        </div>
                        <p className="mb-2 line-clamp-2 text-xs text-muted-foreground">
                          {pkg.description}
                        </p>
                        <Button asChild size="sm" className="w-full">
                          <Link href={`/packages/${pkg.id}`}>Ver detalles</Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={handleRestart}
                  >
                    Buscar otros viajes
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </CardContent>

      <CardFooter className="border-t p-3">
        <div className="flex w-full gap-2">
          <Input
            placeholder="Escribe un mensaje..."
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSendMessage();
              }
            }}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSendMessage} title="Enviar mensaje">
            <Send className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={handleClearChat}
            title="Limpiar chat"
            className="text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
