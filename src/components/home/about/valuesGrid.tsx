import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { values } from "@/lib/about/data";
import { Award, Heart, Lightbulb, Users } from "lucide-react";

const valueIcons = {
    heart: Heart,
    lightbulb: Lightbulb,
    users: Users,
    award: Award,
};

const ValuesGrid = () => {
    return (
        <section className="relative flex items-center justify-center bg-muted">
            <div className="py-16 md:py-24">
                <div className="container px-4">
                    <div className="text-center mb-12">
                        <Badge variant="turquoise" className="mb-4">Nuestros Valores</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold">Lo que nos define</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value) => {
                            const Icon = valueIcons[value.icon];
                            return (
                            <Card key={value.title} className="p-6 text-center">
                                <CardContent className="p-0">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                                    <p className="text-sm text-muted-foreground">{value.description}</p>
                                </CardContent>
                            </Card>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ValuesGrid;
