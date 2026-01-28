import LoginLeftPanel from "@/components/home/login/loginLeftPanel";
import LoginForm from "@/components/home/login/loginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
        <LoginLeftPanel />
        <LoginForm />
      </div>
    </div>
  );
}
