import { Card, CardContent } from "@/components/ui/card";
import type { DashboardStat } from "@/types/adminViews";

const StatsGrid = ({ stats }: { stats: DashboardStat[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.id}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </div>
              <div className={`w-11 h-11 rounded-xl bg-muted flex items-center justify-center ${stat.colorClass}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;
