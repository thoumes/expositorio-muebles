"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Mueble } from "@/lib/muebles";

export default function TarjetaMueble({ mueble }: { mueble: Mueble }) {
  const [indice, setIndice] = useState(0);

  const cambiarFoto = (e: React.MouseEvent, direccion: number) => {
    e.preventDefault();
    e.stopPropagation();
    setIndice((prev) => {
      const siguiente = prev + direccion;
      if (siguiente < 0) return mueble.imagenes.length - 1;
      if (siguiente >= mueble.imagenes.length) return 0;
      return siguiente;
    });
  };

  return (
    <Link href={`/muebles/${mueble.slug}`} className="group block">
      <article>
        <div className="relative aspect-square overflow-hidden bg-neutral-200 rounded-lg mb-4">
          {mueble.imagenes.length > 0 ? (
            <Image
              src={mueble.imagenes[indice]}
              alt={mueble.titulo}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                mueble.estado === "vendido" ? "opacity-75 grayscale-[30%]" : ""
              }`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">
              Sin fotos
            </div>
          )}

          {mueble.estado !== "disponible" && (
            <span
              className={`absolute top-3 left-3 z-10 text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full ${
                mueble.estado === "vendido"
                  ? "bg-neutral-900 text-white"
                  : "bg-amber-100 text-amber-900"
              }`}
            >
              {mueble.estado === "vendido" ? "Vendido" : "Reservado"}
            </span>
          )}

          {mueble.imagenes.length > 1 && (
            <>
              <button
  type="button"
  aria-label="Foto anterior"
  onClick={(e) => cambiarFoto(e, -1)}
  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white backdrop-blur-sm w-8 h-8 flex items-center justify-center rounded-full shadow-sm text-neutral-800 opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-all cursor-pointer"
>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
</button>
<button
  type="button"
  aria-label="Foto siguiente"
  onClick={(e) => cambiarFoto(e, 1)}
  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white backdrop-blur-sm w-8 h-8 flex items-center justify-center rounded-full shadow-sm text-neutral-800 opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-all cursor-pointer"
>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
</button>
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                {mueble.imagenes.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === indice ? "w-4 bg-white" : "w-1.5 bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <h3 className="font-serif text-xl font-medium">{mueble.titulo}</h3>
        <p className="text-neutral-500">
          {mueble.estado === "vendido"
            ? "Pieza vendida"
            : `${mueble.precio} · Envío incluido`}
        </p>
      </article>
    </Link>
  );
}