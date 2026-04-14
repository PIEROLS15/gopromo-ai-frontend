import { MessageCircle, Clock, Shield, Star } from 'lucide-react'

const FeaturesSection = () => {
    return (
        <>
            <section className="border-y bg-muted/50 py-12 md:py-16">
                <div className="w-full px-4 md:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-3 text-3xl font-bold md:text-4xl">¿Por qué GoPromo AI?</h2>
                            <p className="text-lg text-muted-foreground">
                                La plataforma más confiable para viajes estudiantiles en Cañete
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                    <Shield className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold">Proveedores Verificados</h3>
                                <p className="text-muted-foreground">Todos validados por RENIEC y SUNAT para tu seguridad</p>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                                    <MessageCircle className="h-8 w-8 text-accent" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold">Asistente IA</h3>
                                <p className="text-muted-foreground">Chatbot inteligente que te ayuda a encontrar el viaje ideal</p>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                    <Clock className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold">Reserva Rápida</h3>
                                <p className="text-muted-foreground">Proceso simple en 5 pasos, diseñado para todos</p>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                                    <Star className="h-8 w-8 text-accent" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold">Pago Seguro</h3>
                                <p className="text-muted-foreground">Múltiples métodos: tarjeta, Yape, Plin y transferencia</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default FeaturesSection;
