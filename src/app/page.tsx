// pages/Home.tsx

import Image from "next/image";
import LoginForm from "../../src/components/LoginForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginForm /> {/* Render the LoginForm component */}
    </main>
  );
}
