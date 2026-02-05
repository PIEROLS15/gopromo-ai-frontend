import RegisterView from "@/components/home/register/registerView";

export const metadata = {
  title: "Registro | GoPromo AI",
};

export default function RegisterPage() {
  return (
    <main
      className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-24">
      <RegisterView />
    </main>
  );
}
