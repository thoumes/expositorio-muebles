import Image from "next/image";

// Aquí definirás tus muebles (más adelante puedes conectarlo a una base de datos)
const muebles = [
  { id: 1, titulo: "Silla Luis XV", descripcion: "Madera de nogal restaurada", imagen: "/mueble1.jpg" },
  { id: 2, titulo: "Aparador Años 60", descripcion: "Acabado en aceite de linaza", imagen: "/mueble2.jpg" },
  { id: 3, titulo: "Mesa Rústica", descripcion: "Tratamiento anticarcoma y barniz mate", imagen: "/mueble3.jpg" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 px-6 py-12">
      {/* Cabecera */}
      <header className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4">
          Antigüedades <span className="font-semibold">con Alma</span>
        </h1>
        <p className="text-lg text-neutral-600">
          Restauración artesanal de piezas únicas con historia.
        </p>
      </header>

      {/* Galería (Grid) */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {muebles.map((mueble) => (
          <article key={mueble.id} className="group cursor-pointer">
            <div className="relative aspect-square overflow-hidden bg-neutral-200 rounded-lg">
              {/* Nota: Necesitarás añadir imágenes en la carpeta 'public' con estos nombres */}
              <div className="w-full h-full bg-neutral-300 flex items-center justify-center text-neutral-500 transition-transform duration-500 group-hover:scale-105">
                [Imagen del {mueble.titulo}]
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-medium">{mueble.titulo}</h2>
              <p className="text-neutral-500">{mueble.descripcion}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}