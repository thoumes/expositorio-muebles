"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { WHATSAPP_NUMERO } from "@/lib/muebles";

export default function FormularioContacto() {
  const searchParams = useSearchParams();
  const piezaParam = searchParams.get("pieza");

  const [nombreForm, setNombreForm] = useState("");
  const [emailForm, setEmailForm] = useState("");
  const [mensajeForm, setMensajeForm] = useState("");
  const [enviadoForm, setEnviadoForm] = useState(false);

  useEffect(() => {
    if (piezaParam) {
      setMensajeForm(`Hola Juan, me interesa la pieza "${piezaParam}". ¿Sigue disponible?`);
    }
  }, [piezaParam]);

  const abrirWhatsApp = () => {
    const texto = piezaParam
      ? `Hola Juan, te escribo desde tu web por la pieza "${piezaParam}".`
      : "Hola Juan, te escribo desde tu página web.";
    window.open(
      `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`,
      "_blank"
    );
  };

  const enviarFormulario = (e: React.FormEvent) => {
    e.preventDefault();
    const asunto = `Consulta web - ${nombreForm}`;
    const cuerpo = `Nombre: ${nombreForm}\nEmail: ${emailForm}\n\nMensaje:\n${mensajeForm}`;
    window.location.href = `mailto:jaalvest@gmail.com?subject=${encodeURIComponent(
      asunto
    )}&body=${encodeURIComponent(cuerpo)}`;
    setEnviadoForm(true);
    setNombreForm("");
    setEmailForm("");
    setMensajeForm("");
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
        <button
          type="button"
          onClick={abrirWhatsApp}
          className="w-full sm:w-auto bg-neutral-900 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          Escribir por WhatsApp
        </button>
        <a
          href="mailto:jaalvest@gmail.com"
          className="text-sm font-medium text-neutral-700 hover:text-neutral-900 underline underline-offset-4"
        >
          jaalvest@gmail.com
        </a>
      </div>

      <form
        onSubmit={enviarFormulario}
        className="bg-white p-6 md:p-8 rounded-xl border border-neutral-200 text-left space-y-4 shadow-sm"
      >
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-neutral-500 mb-1">
            Nombre
          </label>
          <input
            type="text"
            required
            value={nombreForm}
            onChange={(e) => setNombreForm(e.target.value)}
            placeholder="Tu nombre"
            className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-900 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-neutral-500 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            required
            value={emailForm}
            onChange={(e) => setEmailForm(e.target.value)}
            placeholder="tu@email.com"
            className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-900 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-wider text-neutral-500 mb-1">
            Mensaje
          </label>
          <textarea
            rows={4}
            required
            value={mensajeForm}
            onChange={(e) => setMensajeForm(e.target.value)}
            placeholder="Cuéntanos qué pieza te interesa o qué tienes en mente..."
            className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-900 text-sm resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-neutral-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          Enviar mensaje
        </button>
        {enviadoForm && (
          <p className="text-xs text-neutral-600 text-center pt-2">
            Se ha abierto tu aplicación de correo con el mensaje listo para enviar.
          </p>
        )}
      </form>
    </>
  );
}