"use client";

import { Backpack, Mail, Phone, MapPin } from "lucide-react";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-foreground text-background/90 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center">
                                <Backpack className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-background">
                                    PromoTrip <span className="text-primary">AI</span>
                                </span>
                            </div>
                        </Link>
                        <p className="text-sm text-background/70 mb-6">
                            Plataforma inteligente de viajes estudiantiles en Cañete, Perú.
                            Conectamos colegios con proveedores verificados.
                        </p>
                        <div className="flex gap-3">
                            {[SiFacebook, SiInstagram, SiYoutube].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
                                    aria-label="Social media"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-background mb-4">Navegación</h4>
                        <ul className="space-y-3 text-sm">
                            {[
                                { label: "Inicio", href: "/" },
                                { label: "Paquetes", href: "/packages" },
                                { label: "Nosotros", href: "/nosotros" },
                                { label: "Contacto", href: "/contacto" },
                                { label: "Blog", href: "/blog" },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-background/70 hover:text-primary transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* For Providers */}
                    <div>
                        <h4 className="font-bold text-background mb-4">Para Proveedores</h4>
                        <ul className="space-y-3 text-sm">
                            {[
                                "Registrar mi empresa",
                                "Panel de proveedor",
                                "Crear paquete",
                                "Gestionar reservas",
                                "Centro de ayuda",
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-background/70 hover:text-primary transition-colors"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-background mb-4">Contacto</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                                <span className="text-background/70">
                                    Av. Principal 123, San Vicente de Cañete, Lima, Perú
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary" />
                                <a
                                    href="tel:+51999888777"
                                    className="text-background/70 hover:text-primary transition-colors"
                                >
                                    +51 999 888 777
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary" />
                                <a
                                    href="mailto:info@promotrip.pe"
                                    className="text-background/70 hover:text-primary transition-colors"
                                >
                                    info@promotrip.pe
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/50">
                    <p>© 2025 PromoTrip AI. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <Link href="/terminos" className="hover:text-primary transition-colors">
                            Términos y condiciones
                        </Link>
                        <Link href="/privacidad" className="hover:text-primary transition-colors">
                            Política de privacidad
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
