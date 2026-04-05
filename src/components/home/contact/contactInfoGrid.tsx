import { Card, CardContent } from "@/components/ui/card";
import { contactInfo } from "@/services/contactContent.service";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

const contactIcons = {
    phone: Phone,
    mail: Mail,
    mapPin: MapPin,
    clock: Clock,
};

const ContactInfoGrid = () => {
    return (
        <section className="container mx-auto px-4 -mt-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {contactInfo.map((info) => {
                    const Icon = contactIcons[info.icon];
                    return (
                    <a key={info.title} href={info.action}>
                        <Card className="p-4 text-center h-full hover:shadow-lg">
                            <CardContent className="p-0">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-bold text-sm">{info.title}</h3>
                                <p className="text-primary text-sm">{info.value}</p>
                                <p className="text-xs text-muted-foreground">
                                    {info.description}
                                </p>
                            </CardContent>
                        </Card>
                    </a>
                    );
                })}
            </div>
        </section>
    );
};

export default ContactInfoGrid;
