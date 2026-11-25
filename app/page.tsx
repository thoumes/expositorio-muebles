import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { obtenerMuebles } from "@/lib/muebles";
import TarjetaMueble from "@/components/TarjetaMueble";
import FormularioContacto from "@/components/FormularioContacto";

export default function HomePage() {
  const muebles = obtenerMuebles();
  const destacados = muebles.filter((m) => m.destacado).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center text-white overflow-hidden">
        <Image
          src="/fondo.jpg"
          alt="El Taller de Juan"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 px-6 max-w-3xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl font-normal tracking-tight mb-6">
            Nueva vida a tu historia
          </h1>
          <p className="text-xl text-neutral-200 mb-10 max-w-2xl mx-auto">
            Restauración artesanal de piezas únicas. Descubre nuestra colección de
            muebles recuperados y dales un nuevo hogar.
          </p>
          <Link
            href="/catalogo"
            className="inline-block bg-white text-neutral-900 px-8 py-3 rounded-full text-sm font-medium hover:bg-neutral-200 transition-colors"
          >
            Ver colección
          </Link>
        </div>
        <a
          href="#destacados"
          aria-label="Bajar a Piezas destacadas"
          className="absolute bottom-8 z-10 text-white/80 hover:text-white transition-colors animate-bounce"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </a>
      </section>

      {/* Piezas destacadas */}
      <section id="destacados" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-serif text-4xl font-medium">Piezas destacadas</h2>
            <p className="text-neutral-500 mt-2">
              Muebles únicos restaurados a mano, listos para un nuevo hogar.
            </p>
          </div>
          <Link
            href="/catalogo"
            className="text-sm font-medium text-neutral-700 hover:text-neutral-900 underline underline-offset-4"
          >
            Ver todo el catálogo →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destacados.map((mueble) => (
            <TarjetaMueble key={mueble.id} mueble={mueble} />
          ))}
        </div>
      </section>

      {/* Quiénes somos */}
      <section
        id="nosotros"
        className="relative min-h-[75vh] flex flex-col items-center justify-center px-6 py-24 bg-white border-y border-neutral-200"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-medium mb-8">Quiénes somos</h2>
          <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
            El Taller de Juan es un pequeño taller de restauración artesanal que
            busca darle una nueva vida a piezas abandonadas y desechadas con el
            objetivo de demostrar que siempre se le puede dar una segunda
            oportunidad a lo que se cree perdido.
          </p>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Nuestro objetivo no es solo reparar, sino devolver el alma a estas
            piezas, combinando técnicas artesanales tradicionales con acabados
            modernos para que puedan vivirse y disfrutarse por muchas generaciones
            más.
          </p>
        </div>
      </section>

      {/* Contacto */}
      <section
        id="contacto"
        className="min-h-[85vh] flex flex-col items-center justify-center px-6 py-24 bg-neutral-100"
      >
        <div className="max-w-xl w-full mx-auto text-center">
          <h2 className="font-serif text-4xl font-medium mb-6">Contacto</h2>
          <p className="text-lg text-neutral-600 mb-8">
            ¿Te interesa alguna de nuestras piezas del catálogo o quieres hacer un
            encargo? Escríbenos directamente.
          </p>
          <Suspense fallback={<div className="h-64" />}>
            <FormularioContacto />
          </Suspense>
        </div>
      </section>
    </div>
  );
}