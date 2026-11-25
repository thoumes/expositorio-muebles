import type { Metadata } from "next";
import { obtenerMuebles } from "@/lib/muebles";
import TarjetaMueble from "@/components/TarjetaMueble";

export const metadata: Metadata = {
  title: "Catálogo | El Taller de Juan",
  description: "Explora nuestra colección completa de muebles restaurados.",
};

export default function CatalogoPage() {
  const muebles = obtenerMuebles();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl font-medium mb-10">Colección</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {muebles.map((mueble) => (
          <TarjetaMueble key={mueble.id} mueble={mueble} />
        ))}
      </div>
    </div>
  );
}