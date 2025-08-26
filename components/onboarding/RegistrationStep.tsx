"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Apple, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FormData } from "@/lib/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface RegistrationStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
}

const registrationSchema = z
  .object({
    name: z.string().min(1, "Nombre es requerido"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Mínimo 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type RegistrationForm = z.infer<typeof registrationSchema>;

export default function RegistrationStep({ formData, setFormData, onNext }: RegistrationStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: formData.name ?? "",
      email: formData.email ?? "",
      password: formData.password ?? "",
      confirmPassword: formData.confirmPassword ?? "",
    },
  });

  const onSubmit = (data: RegistrationForm) => {
    setFormData((prev) => ({ ...prev, ...data }));
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Nombre"
                {...register("name")}
                className="bg-white text-black placeholder:text-gray-500 border-white"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="bg-white text-black placeholder:text-gray-500 border-white"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <Input
                type="password"
                placeholder="Contraseña"
                {...register("password")}
                className="bg-white text-black placeholder:text-gray-500 border-white"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div>
              <Input
                type="password"
                placeholder="Confirmar contraseña"
                {...register("confirmPassword")}
                className="bg-white text-black placeholder:text-gray-500 border-white"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
              Registrarme
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
