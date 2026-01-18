import { Card, CardContent } from "@/components/ui/card";
import { stats } from "@/lib/about/data";

const StatsGrid = () => {
    return (
        <section className="relative flex items-center justify-center">
            <div className="container px-4 -mt-8 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                        <Card key={stat.label} className="p-4 text-center h-full hover:shadow-lg transition-shadow">
                            <CardContent className="p-0">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <stat.icon className="w-6 h-6 text-primary" />
                                </div>
                                <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.number}</p>
                                <p className="text-primary font-medium text-sm">{stat.label}</p>
                                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsGrid;
