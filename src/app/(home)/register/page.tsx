import RegisterView from "@/components/home/register/registerView";

export const metadata = {
  title: "Registro | PromoTrip AI",
};

export default function RegisterPage() {
  return (
    <main
      className="
        min-h-[calc(100vh-4rem)]
        flex
        items-center
        justify-center
        px-4
        pt-24
        pb-14
        bg-linear-to-b from-[#0B1215] via-[#0E171B] to-[#0B1215]
      "
    >
      <RegisterView />
    </main>
  );
}


