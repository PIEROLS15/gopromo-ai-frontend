import Link from "next/link";
import { Home } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export type AppBreadcrumbItem = {
  label: string;
  href?: string;
  icon?: "home";
};

type AppBreadcrumbProps = {
  items: AppBreadcrumbItem[];
  className?: string;
};

const AppBreadcrumb = ({ items, className }: AppBreadcrumbProps) => {
  if (!items.length) return null;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <BreadcrumbItem key={`${item.label}-${index}`}>
              {!isLast && item.href ? (
                <>
                  <BreadcrumbLink asChild className="text-muted-foreground hover:text-primary">
                    <Link href={item.href} className="inline-flex items-center gap-1.5">
                      {item.icon === "home" && <Home className="w-3.5 h-3.5" />}
                      <span>{item.label}</span>
                    </Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              ) : (
                <BreadcrumbPage className="text-primary">{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppBreadcrumb;
