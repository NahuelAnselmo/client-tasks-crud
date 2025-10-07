import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNotification } from "../context/NotificationContext";
import { Button } from "../components/ui/Button"; // o ButtonLink si preferís
import {Input} from "../components/ui/Input"; // si ya lo tenés
// import { postContacts } from "../api/contact"; // cuando tengas tu endpoint

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { notify } = useNotification();
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => setCharCount(e.target.value.length);

  const onSubmit = async (data) => {
    try {
      // await postContacts(data); // acá va tu petición real

      notify("Tu mensaje fue enviado con éxito ✅", "success");
      reset();
      setCharCount(0);
    } catch (error) {
      console.error(error);
      notify("Error al enviar el mensaje ❌", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-zinc-800 text-white p-8 rounded-lg shadow-lg my-25">
      <h2 className="text-3xl font-bold mb-4 text-center">Contacto</h2>
      <p className="text-gray-400 text-center mb-6">
        Envíanos tus consultas o sugerencias. Te responderemos lo antes posible.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Nombre */}
        <div>
          <label className="block text-sm mb-1">Nombre</label>
          <Input
            {...register("name", {
              required: "El nombre es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
            })}
            placeholder="Tu nombre"
            className="w-full p-2 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <Input
            type="email"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Debe ser un email válido",
              },
            })}
            placeholder="ejemplo@gmail.com"
            className="w-full p-2 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Asunto */}
        <div>
          <label className="block text-sm mb-1">Asunto</label>
          <Input
            {...register("subject", {
              required: "El asunto es obligatorio",
              minLength: { value: 3, message: "Mínimo 3 caracteres" },
            })}
            placeholder="Motivo del mensaje"
            className="w-full p-2 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.subject && (
            <p className="text-red-400 text-sm mt-1">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Mensaje */}
        <div>
          <label className="block text-sm mb-1">Mensaje</label>
          <textarea
            {...register("message", {
              required: "El mensaje es obligatorio",
              minLength: { value: 10, message: "Mínimo 10 caracteres" },
              maxLength: { value: 500, message: "Máximo 500 caracteres" },
            })}
            rows={5}
            onChange={handleChange}
            placeholder="Escribe tu mensaje..."
            className="w-full p-2 rounded bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="text-right text-gray-400 text-sm">
            {charCount}/500
          </div>
          {errors.message && (
            <p className="text-red-400 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="text-center">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Envia tu consulta!!
          </Button>
        </div>
      </form>
    </div>
  );
}
