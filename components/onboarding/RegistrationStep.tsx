"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Apple, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FormData } from "@/lib/types";

interface RegistrationStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
}

export default function RegistrationStep({ formData, setFormData, onNext }: RegistrationStepProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setError(null);
    onNext();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">EFIN</h1>
            <p className="text-muted-foreground text-sm">Aprender finanzas nunca fue tan fácil</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                className="flex items-center justify-center p-3 bg-white text-black border-white hover:bg-gray-100"
              >
                <FcGoogle className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center p-3 bg-white text-black border-white hover:bg-gray-100"
              >
                <Apple className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center p-3 bg-white text-black border-white hover:bg-gray-100"
              >
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Nombre"
              value={formData.name}
              required
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="bg-white text-black placeholder:text-gray-500 border-white"
            />
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              required
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className="bg-white text-black placeholder:text-gray-500 border-white"
            />
            <Input
              type="password"
              placeholder="Contraseña"
              value={formData.password}
              required
              minLength={6}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              className="bg-white text-black placeholder:text-gray-500 border-white"
            />
            <Input
              type="password"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              required
              minLength={6}
              onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
              className="bg-white text-black placeholder:text-gray-500 border-white"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
              Registrarme
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
