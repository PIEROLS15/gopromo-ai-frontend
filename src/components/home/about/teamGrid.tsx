import { team } from "@/services/aboutContent.service";
import { Badge } from "@/components/ui/badge";

const TeamGrid = () => {
    return (
        <section className="relative flex items-center justify-center">
            <div className="py-16 md:py-24 container px-4">
                <div className="text-center mb-12">
                    <Badge variant="orange" className="mb-4">Nuestro Equipo</Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Personas apasionadas por la educación
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Un equipo multidisciplinario comprometido con la seguridad.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {team.map((member) => (
                        <div key={member.name} className="text-center">
                            <div className="w-24 h-24 md:w-32 md:h-32 gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 text-2xl md:text-3xl font-bold">
                                {member.avatar}
                            </div>
                            <h3 className="font-bold">{member.name}</h3>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamGrid;
