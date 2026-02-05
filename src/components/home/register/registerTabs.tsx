"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, Building2 } from "lucide-react";
import PublicRegisterForm from "@/components/home/register/publicRegisterForm";
import SupplierRegisterForm from "@/components/home/register/supplierRegisterForm";
import Link from "next/link";

const RegisterTabs = () => {
  return (
    <Tabs defaultValue="public" className="w-full">
      <TabsList
        className="mb-8 flex h-12 w-full rounded-lg bg-muted p-1 text-muted-foreground shadow-xs">
        <TabsTrigger
          value="public"
          className="flex w-1/2 items-center justify-center gap-2 rounded-md text-sm font-medium transition-all hover:bg-background/50 hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
          <User className="h-4 w-4" />
          Público General
        </TabsTrigger>

        <TabsTrigger
          value="provider"
          className="flex w-1/2 items-center justify-center gap-2 rounded-md text-sm font-medium transition-all hover:bg-background/50 hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
          <Building2 className="h-4 w-4" />
          Proveedor
        </TabsTrigger>
      </TabsList>

      <TabsContent value="public">
        <PublicRegisterForm />
      </TabsContent>

      <TabsContent value="provider">
        <SupplierRegisterForm />
      </TabsContent>

      <div className="mt-6">
        <div className="flex items-center gap-4 mb-6">
          <span className="flex-1 border-t border-zinc-300 dark:border-zinc-700" />
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </Tabs>
  );
}

export default RegisterTabs;
