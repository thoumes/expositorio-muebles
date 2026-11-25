"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function GaleriaDetalle({
  imagenes,
  titulo,
}: {
  imagenes: string[];
  titulo: string;
}) {
  const [indice, setIndice] = useState(0);
  const [zoomAbierto, setZoomAbierto] = useState(false);

  const anterior = () =>
    setIndice((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  const siguiente = () =>
    setIndice((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    if (!zoomAbierto) return;

    const manejarTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomAbierto(false);
      if (e.key === "ArrowLeft" && imagenes.length > 1) anterior();
      if (e.key === "ArrowRight" && imagenes.length > 1) siguiente();
    };

    window.addEventListener("keydown", manejarTecla);
    return () => window.removeEventListener("keydown", manejarTecla);
  }, [zoomAbierto, imagenes.length]);

  if (imagenes.length === 0) {
    return (
      <div className="aspect-square bg-neutral-200 rounded-lg flex items-center justify-center text-neutral-400">
        Sin fotos disponibles
      </div>
    );
  }

  return (
    <div>
      <div
        onClick={() => setZoomAbierto(true)}
        className="relative aspect-square overflow-hidden bg-neutral-200 rounded-lg mb-4 cursor-zoom-in group"
        title="Haz clic para ampliar"
      >
        <Image
          src={imagenes[indice]}
          alt={titulo}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          Ampliar foto
        </span>
      </div>

      {imagenes.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {imagenes.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setIndice(i)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 cursor-pointer ${
                indice === i
                  ? "border-neutral-900"
                  : "border-transparent hover:border-neutral-300"
              }`}
            >
              <Image
                src={img}
                alt={`${titulo} - vista ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {zoomAbierto && (
        <div
          onClick={() => setZoomAbierto(false)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <button
            type="button"
            onClick={() => setZoomAbierto(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white text-3xl font-light cursor-pointer z-10"
            aria-label="Cerrar imagen"
          >
            ✕
          </button>

          {imagenes.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Foto anterior"
                onClick={(e) => {
                  e.stopPropagation();
                  anterior();
                }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/30 text-white w-11 h-11 rounded-full flex items-center justify-center cursor-pointer z-10"
              >
                ◀
              </button>
              <button
                type="button"
                aria-label="Foto siguiente"
                onClick={(e) => {
                  e.stopPropagation();
                  siguiente();
                }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/30 text-white w-11 h-11 rounded-full flex items-center justify-center cursor-pointer z-10"
              >
                ▶
              </button>
            </>
          )}

          <div
            className="relative w-full max-w-5xl h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imagenes[indice]}
              alt={`${titulo} ampliada`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}