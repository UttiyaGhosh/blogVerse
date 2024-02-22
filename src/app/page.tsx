'use client'

import Footer from "@/components/Footer";
import LoginForm from "@/components/LoginForm";

export default function Home() {
 
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center p-24">
        <LoginForm /> {/* Render the LoginForm component */}
      </main>
      <Footer /> {/* Include the Footer component */}
    </div>
  );
}