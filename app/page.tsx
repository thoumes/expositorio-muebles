"use client";
import { useState } from "react";

const muebles = [
  { 
    id: 1, 
    titulo: "Aparador Hidalgo", 
    descripcion: "Este imponente mueble castellano ha sido completamente rescatado y reinventado para convertirse en el centro de atención de cualquier estancia. Tras un laborioso proceso de decapado manual para retirar décadas de pintura anterior, el cuerpo principal ha renacido bajo un vibrante color rojo china, patinado a mano con betún de Judea para aportarle profundidad y un elegante efecto envejecido. El tablero superior contrasta cálidamente gracias a su madera teñida en tono miel oscuro con un acabado satinado. Una de las joyas de esta pieza de madera maciza son sus herrajes originales de hierro (tiradores, pasadores y bisagras), confeccionados a mano, que han sido restaurados y protegidos para lucir su belleza industrial. Su interior, renovado en un luminoso blanco satinado, lo hace tan práctico por dentro como espectacular por fuera. Toda la pieza cuenta con un acabado final a la cera incolora que protege la madera y le confiere un tacto sedoso inigualable.", 
    precio: "690€", 
    imagenes: ["/foto1-1.png", "/foto1-2.png", "/foto1-3.png", "/foto1-4.png"]
  },
  { 
    id: 2, 
    titulo: "Cómoda Cabriolé 'Ciel de Nuit'", 
    descripcion: "Esta coqueta cómoda de líneas clásicas y elegantes patas cabriolé ha sido transformada en una pieza romántica y llena de personalidad. Tras retirar su acabado original, el cuerpo del mueble ha sido trabajado con exquisito detalle mediante la aplicación artesanal de cinco capas de policromía, logrando una paleta única de azules y grises empolvados. Para realzar sus espectaculares tallas laterales y simular el encanto del desgaste natural por el paso del tiempo, se han añadido sutiles rozaduras en color oro y sombreados artesanales con betún de Judea. El tablero superior, teñido en un tono oscuro y rematado con cera incolora, ofrece un contraste sofisticado y cálido. La pieza se corona con sus tres clásicos tiradores originales de bronce, los cuales han sido cuidadosamente bruñidos a mano y protegidos para recuperar su esplendor. Un mueble que es pura poesía visual, protegido íntegramente para garantizar su durabilidad diaria.", 
    precio: "320€", 
    imagenes: ["/foto2-1.png", "/foto2-2.png", "/foto2-3.png", "/foto2-4.png"]
  },
  { 
    id: 3, 
    titulo: "Silla Balloon Back 'Pureza'", 
    descripcion: "Esta exquisita silla de comedor de estilo Louis Philippe destaca por el elegante perfil de su respaldo 'balloon back' y sus delicadas tallas frontales. Ha sido sometida a una restauración integral y minuciosa, despojándola de sus antiguos barnices para revelar la auténtica nobleza y el veteado natural de su madera maciza de nogal, ahora protegida con un suave barniz satinado incoloro. Su mayor tesoro se oculta en su interior: el asiento ha sido reconstruido por completo utilizando técnicas de alta tapicería tradicional. Se ha renovado la base de cinchas, restaurado y atado a mano los muelles originales, y acolchado con tela de arpillera y auténtica crin vegetal. Para culminar su renacer, ha sido tapizada con un resistente y luminoso tejido de algodón en blanco crudo por ambas caras, rematado con un elegante cordón textil. Una pieza clásica, robusta y atemporal, lista para aportar luz y sofisticación a cualquier rincón.", 
    precio: "390€", 
    imagenes: ["/foto3-1.png", "/foto3-2.png", "/foto3-3.png", "/foto3-4.png"] 
  },
  { 
    id: 4, 
    titulo: "Silla Cabriolé 'Jardín Dorado'", 
    descripcion: "Esta encantadora silla de comedor con patas cabriolé es un juego de contrastes diseñado para enamorar. Su estructura de madera maciza ha sido completamente reforzada y trabajada a mano mediante un laborioso proceso de cepillado. Esta técnica ha permitido retirar los antiguos barnices y sacar a relucir el relieve natural de la veta, que ahora destaca gracias a un delicado teñido en blanco y una protección de barniz incoloro mate. El asiento, renovado desde su base con nuevas cinchas y espumas de alta densidad para garantizar su máxima comodidad, se viste de gala con una tapicería de acabado sedoso. Sus vibrantes motivos florales sobre un fondo dorado aportan un toque de lujo y luz, enmarcado a la perfección por un elegante cordón dorado en todo su contorno. Una pieza firme, cómoda y con un carácter visual innegable.", 
    precio: "240€", 
    imagenes: ["/foto4-1.png", "/foto4-2.png", "/foto4-3.png"] 
  }
];

function TarjetaMueble({ mueble, onClick }: { mueble: any, onClick: () => void }) {
  const [indice, setIndice] = useState(0);
  const [mostrarFlechas, setMostrarFlechas] = useState(false);

  // Función para pasar la foto
  const cambiarFoto = (e: React.MouseEvent, direccion: number) => {
    e.stopPropagation(); // Evita que entres al producto al clicar la flecha
    let nuevoIndice = indice + direccion;
    if (nuevoIndice < 0) nuevoIndice = mueble.imagenes.length - 1;
    if (nuevoIndice >= mueble.imagenes.length) nuevoIndice = 0;
    setIndice(nuevoIndice);
  };

  return (
    <article 
      onClick={onClick} 
      className="group cursor-pointer"
      onMouseEnter={() => setMostrarFlechas(true)}
      onMouseLeave={() => setMostrarFlechas(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-200 rounded-lg mb-4">
        {/* Foto actual */}
        <img src={mueble.imagenes[indice]} alt={mueble.titulo} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        
        {/* Las flechas (solo salen si pasas el ratón y hay más de 1 foto) */}
        {mostrarFlechas && mueble.imagenes.length > 1 && (
          <>
            <button onClick={(e) => cambiarFoto(e, -1)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white w-8 h-8 flex items-center justify-center rounded-full shadow text-neutral-800">◀</button>
            <button onClick={(e) => cambiarFoto(e, 1)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white w-8 h-8 flex items-center justify-center rounded-full shadow text-neutral-800">▶</button>
          </>
        )}
      </div>
      <h2 className="text-xl font-medium">{mueble.titulo}</h2>
      <p className="text-neutral-500">{mueble.precio}</p>
    </article>
  );
}

export default function Home() {
  const [vista, setVista] = useState("inicio");
  const [muebleActivo, setMuebleActivo] = useState<any>(null);
  const [imagenDetalle, setImagenDetalle] = useState(0);
  const irA = (nuevaVista: string, mueble: any = null) => {
    setVista(nuevaVista);
    setMuebleActivo(mueble);
    setImagenDetalle(0); // Añade esta línea para que siempre empiece en la primera foto
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      <nav className="sticky top-0 z-50 bg-neutral-50/90 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-semibold tracking-tighter cursor-pointer" onClick={() => irA("inicio")}>
            El Taller de Juan<span className="font-light"></span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <button onClick={() => irA("inicio")} className="hover:text-neutral-500 transition-colors">Inicio</button>
            <button onClick={() => irA("catalogo")} className="hover:text-neutral-500 transition-colors">Catálogo</button>
            <button onClick={() => irA("nosotros")} className="hover:text-neutral-500 transition-colors">Quiénes somos</button>
            <button onClick={() => irA("contacto")} className="hover:text-neutral-500 transition-colors">Contacto</button>
          </div>
          <div className="md:hidden flex gap-4 text-xs font-medium">
            <button onClick={() => irA("catalogo")}>Catálogo</button>
            <button onClick={() => irA("contacto")}>Contacto</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {vista === "inicio" && (
          <div className="text-center py-20">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">Nueva vida a tu historia</h1>
            <p className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto">Restauración artesanal de piezas únicas. Descubre nuestra colección de muebles recuperados y dales un nuevo hogar.</p>
            <button onClick={() => irA("catalogo")} className="bg-neutral-900 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors">Ver colección</button>
          </div>
        )}

        {vista === "catalogo" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {muebles.map((mueble) => (
              <TarjetaMueble key={mueble.id} mueble={mueble} onClick={() => irA("detalle", mueble)} />
            ))}
          </div>
        )}

        {vista === "detalle" && muebleActivo && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            
            {/* ZONA DE FOTOS */}
            <div>
              {/* Imagen Principal Grande */}
              <div className="relative aspect-square overflow-hidden bg-neutral-200 rounded-lg mb-4">
                <img src={muebleActivo.imagenes[imagenDetalle]} alt={muebleActivo.titulo} className="w-full h-full object-cover" />
              </div>
              
              {/* Fila de Miniaturas (Estilo Amazon) */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {muebleActivo.imagenes.map((img: string, i: number) => (
                  <button 
                    key={i} 
                    onClick={() => setImagenDetalle(i)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 ${imagenDetalle === i ? 'border-neutral-900' : 'border-transparent hover:border-neutral-300'}`}
                  >
                    <img src={img} alt={`Vista ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* ZONA DE TEXTOS */}
            <div>
              <button onClick={() => irA("catalogo")} className="text-sm text-neutral-500 mb-6 hover:text-neutral-900 transition-colors">← Volver al catálogo</button>
              <h1 className="text-4xl font-medium mb-4">{muebleActivo.titulo}</h1>
              <p className="text-2xl font-light mb-8">{muebleActivo.precio}</p>
              <div className="text-neutral-700 leading-relaxed mb-8">
                <p>{muebleActivo.descripcion}</p>
              </div>
              <button onClick={() => irA("contacto")} className="w-full md:w-auto bg-neutral-900 text-white px-8 py-4 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors">Me interesa esta pieza</button>
            </div>
          </div>
        )}

        {vista === "nosotros" && (
          <div className="max-w-2xl mx-auto py-12">
            <h1 className="text-4xl font-medium mb-8">Quiénes somos</h1>
            <p className="text-lg text-neutral-600 mb-6">El Taller de Juan es un pequeño taller de restauración artesanal que busca darle una nueva vida a piezas abandonadas y deshechadas con el objetivo de demostrar que siempre se le puede dar una segunda oportunidad a lo que se cree perdido.</p>
            <p className="text-lg text-neutral-600">Nuestro objetivo no es solo reparar, sino devolver el alma a estas piezas, combinando técnicas artesanales tradicionales con acabados modernos para que puedan vivirse y disfrutarse por muchas generaciones más.</p>
          </div>
        )}

        {vista === "contacto" && (
          <div className="max-w-xl mx-auto py-12 text-center">
            <h1 className="text-4xl font-medium mb-8">Contacto</h1>
            <p className="text-lg text-neutral-600 mb-8">¿Te interesa alguna de nuestras piezas del catálogo o quieres hacer un encargo de una nueva pieza? Escríbenos.</p>
            <a href="mailto:jaalvest@gmail.com" className="text-2xl font-light hover:underline mb-4 block">jaalvest@gmail.com</a>
            
          </div>
        )}
      </main>
    </div>
  );
}