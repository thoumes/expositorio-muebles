import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { obtenerMuebles, obtenerMueblePorSlug } from "@/lib/muebles";
import { WHATSAPP_NUMERO } from "@/lib/config";
import GaleriaDetalle from "@/components/GaleriaDetalle";

export function generateStaticParams() {
  return obtenerMuebles().map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mueble = obtenerMueblePorSlug(slug);
  if (!mueble) return { title: "Pieza no encontrada | El Taller de Juan" };

  return {
    title: `${mueble.titulo} (${mueble.precio}) | El Taller de Juan`,
    description: mueble.descripcion.slice(0, 155) + "...",
  };
}

export default async function DetalleMueblePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mueble = obtenerMueblePorSlug(slug);

  if (!mueble) notFound();

  const mensajeWhatsApp = `Hola Juan, me interesa la pieza "${mueble.titulo}" (${mueble.precio}).`;
  const urlWhatsApp = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
    mensajeWhatsApp
  )}`;
  const urlContacto = `/?pieza=${encodeURIComponent(mueble.titulo)}#contacto`;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <GaleriaDetalle imagenes={mueble.imagenes} titulo={mueble.titulo} />

        <div>
          <Link
            href="/catalogo"
            className="inline-block text-sm text-neutral-500 mb-6 hover:text-neutral-900 transition-colors"
          >
            ← Volver al catálogo
          </Link>

          <div className="mb-3 flex gap-2">
            <span className="inline-block text-xs font-medium uppercase tracking-wider bg-neutral-200 text-neutral-800 px-3 py-1 rounded-full">
              Pieza única
            </span>
            {mueble.estado !== "disponible" && (
              <span
                className={`inline-block text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full ${
                  mueble.estado === "vendido"
                    ? "bg-neutral-900 text-white"
                    : "bg-amber-100 text-amber-900"
                }`}
              >
                {mueble.estado === "vendido" ? "Vendido" : "Reservado"}
              </span>
            )}
          </div>

          <h1 className="font-serif text-4xl font-medium mb-3">
            {mueble.titulo}
          </h1>

          <p className="text-2xl font-light mb-6">
            {mueble.estado === "vendido" ? (
              <span className="text-neutral-500">Pieza vendida</span>
            ) : (
              <>
                {mueble.precio}{" "}
                <span className="text-sm text-neutral-500 ml-2">
                  · Envío a península incluido
                </span>
              </>
            )}
          </p>

          <div className="grid grid-cols-3 gap-4 border-y border-neutral-200 py-4 mb-6 text-sm">
            <div>
              <span className="block text-xs uppercase tracking-wider text-neutral-400">
                Alto
              </span>
              <span className="font-medium text-neutral-800">
                {mueble.medidas.alto}
              </span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider text-neutral-400">
                Ancho
              </span>
              <span className="font-medium text-neutral-800">
                {mueble.medidas.ancho}
              </span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider text-neutral-400">
                Fondo
              </span>
              <span className="font-medium text-neutral-800">
                {mueble.medidas.fondo}
              </span>
            </div>
          </div>

          <div className="text-neutral-700 leading-relaxed mb-8">
            <p>{mueble.descripcion}</p>
          </div>

          {mueble.estado !== "vendido" ? (
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={urlWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center bg-neutral-900 text-white px-8 py-4 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                Me interesa esta pieza (WhatsApp)
              </a>
              <Link
                href={urlContacto}
                className="w-full sm:w-auto text-center border border-neutral-300 text-neutral-800 px-6 py-4 rounded-lg text-sm font-medium hover:border-neutral-900 transition-colors"
              >
                Consultar por correo
              </Link>
            </div>
          ) : (
            <Link
              href="/#contacto"
              className="inline-block border border-neutral-300 text-neutral-800 px-6 py-4 rounded-lg text-sm font-medium hover:border-neutral-900 transition-colors"
            >
              ¿Buscas algo similar? Consúltanos
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}