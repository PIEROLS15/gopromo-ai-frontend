"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle2 } from "lucide-react";
import { useContact } from "@/hooks/useContact";

const ContactForm = () => {
    const {
        handleSubmit,
        register,
        errors,
        isSubmitting,
        loading,
        apiError,
        isSubmitted,
        successMessage,
        resetSubmission,
    } = useContact();

    if (isSubmitted) {
        return (
            <Card variant="feature" className="p-8 text-center">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-foreground mb-2">
                    ¡Mensaje enviado!
                </h3>
                <p className="text-muted-foreground mb-4">
                    {successMessage ?? "Hemos recibido tu mensaje. Te contactaremos muy pronto."}
                </p>
                <Button variant="outline" onClick={resetSubmission}>
                    Enviar otro mensaje
                </Button>
            </Card>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Nombre completo
                    </label>
                    <Input placeholder="Tu nombre" {...register("name")} />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Correo electrónico
                    </label>
                    <Input
                        type="email"
                        placeholder="correo@ejemplo.com"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Teléfono
                    </label>
                    <Input placeholder="999888777" {...register("phone")} />
                    {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.phone.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Asunto
                    </label>
                    <Input
                        placeholder="¿Sobre qué nos escribes?"
                        {...register("subject")}
                    />
                    {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.subject.message}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    Mensaje
                </label>
                <Textarea
                    className="min-h-50"
                    placeholder="¿En qué podemos ayudarte?"
                    {...register("message")}
                />
                {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.message.message}
                    </p>
                )}
            </div>

            {apiError && <p className="text-red-600 text-sm">{apiError}</p>}

            <Button
                type="submit"
                variant="turquoise"
                size="lg"
                className="w-full gap-2"
                disabled={isSubmitting || loading}
            >
                {isSubmitting || loading ? (
                    <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Enviando...
                    </>
                ) : (
                    <>
                        <Send size={16} />
                        Enviar mensaje
                    </>
                )}
            </Button>
        </form>
    );
};

export default ContactForm;
