import LoginForm from "@/presentation/components/auth/LoginForm";
import { Suspense } from "react";

const page = () => {
  return (
    <main>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </main>
  );
};

export default page;
