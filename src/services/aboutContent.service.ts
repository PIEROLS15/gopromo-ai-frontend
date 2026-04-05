import type { AboutStat, AboutValue, TeamMember } from "@/types/about";

export const values: AboutValue[] = [
  { icon: "heart", title: "Compromiso", description: "Nos comprometemos..." },
  { icon: "lightbulb", title: "Innovación", description: "Usamos IA..." },
  {
    icon: "users",
    title: "Comunidad",
    description: "Conectamos instituciones...",
  },
  {
    icon: "award",
    title: "Excelencia",
    description: "Garantizamos calidad...",
  },
];

export const stats: AboutStat[] = [
  {
    icon: "plane",
    number: "500+",
    label: "Viajes realizados",
    description: "Experiencias educativas",
  },
  {
    icon: "graduationCap",
    number: "15,000+",
    label: "Estudiantes felices",
    description: "En toda la región",
  },
  {
    icon: "badgeCheck",
    number: "50+",
    label: "Proveedores verificados",
    description: "Calidad garantizada",
  },
  {
    icon: "thumbsUp",
    number: "98%",
    label: "Satisfacción",
    description: "Clientes satisfechos",
  },
];

export const team: TeamMember[] = [
  { name: "Carlos Mendoza", role: "Director General", avatar: "CM" },
  { name: "María García", role: "Directora de Operaciones", avatar: "MG" },
  { name: "Juan Pérez", role: "Jefe de Tecnología", avatar: "JP" },
  { name: "Ana Torres", role: "Atención al Cliente", avatar: "AT" },
];
