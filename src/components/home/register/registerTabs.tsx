"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, Building2 } from "lucide-react";
import PublicRegisterForm from "@/components/home/register/publicRegisterForm";
import ProviderRegisterForm from "@/components/home/register/providerRegisterForm";

export default function RegisterTabs() {
  return (
    <Tabs defaultValue="public" className="w-full">
      {/* INPUT SELECTOR (LOVABLE REAL) */}
      <TabsList
        className="
          mb-8
          flex
          h-12
          w-full
          rounded-lg
          bg-[#0B1215]
          border
          border-white/10
          p-1
          shadow-inner
        "
      >
        <TabsTrigger
          value="public"
          className="
            flex
            w-1/2
            items-center
            justify-center
            gap-2
            rounded-md
            text-sm
            font-medium
            text-zinc-400
            transition-all

            data-[state=active]:bg-black/70
            data-[state=active]:text-white
            data-[state=active]:shadow
          "
        >
          <User className="h-4 w-4" />
          Público
        </TabsTrigger>

        <TabsTrigger
          value="provider"
          className="
            flex
            w-1/2
            items-center
            justify-center
            gap-2
            rounded-md
            text-sm
            font-medium
            text-zinc-400
            transition-all

            data-[state=active]:bg-black/70
            data-[state=active]:text-white
            data-[state=active]:shadow
          "
        >
          <Building2 className="h-4 w-4" />
          Proveedor
        </TabsTrigger>
      </TabsList>

      <TabsContent value="public">
        <PublicRegisterForm />
      </TabsContent>

      <TabsContent value="provider">
        <ProviderRegisterForm />
      </TabsContent>
    </Tabs>
  );
}

