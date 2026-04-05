"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useChat } from "@/context/chatContext";
import { MessageCircle } from "lucide-react";

const AIChatSection = () => {
    const { openChat } = useChat();

    return (
        <Card className="mt-6 p-6">
            <CardContent className="p-0 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-7 h-7" />
                </div>

                <div>
                    <h3 className="font-bold">¿Prefieres hablar con nuestra IA?</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                        PromoTrip AI puede ayudarte en tiempo real
                    </p>
                    <Button size="sm" onClick={openChat}>
                        Iniciar chat
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default AIChatSection;
