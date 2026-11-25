"use client";
import { useState, useEffect } from "react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// CAMBIA ESTE NÚMERO POR EL TUYO (con prefijo 34, sin espacios ni el signo +)
const WHATSAPP_NUMERO = "34600000000";

function TarjetaMueble({ mueble, onClick }: { mueble: any, onClick: () => void }) {
  const [indice, setIndice] = useState(0);
  const [mostrarFlechas, setMostrarFlechas] = useState(false);

  const cambiarFoto = (e: React.MouseEvent, direccion: number) => {
    e.stopPropagation();
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
        {mueble.imagenes.length > 0 ? (
          <img src={mueble.imagenes[indice]} alt={mueble.titulo} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">Sin fotos</div>
        )}
        
        {mostrarFlechas && mueble.imagenes.length > 1 && (
          <>
            <button onClick={(e) => cambiarFoto(e, -1)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white w-8 h-8 flex items-center justify-center rounded-full shadow text-neutral-800">◀</button>
            <button onClick={(e) => cambiarFoto(e, 1)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white w-8 h-8 flex items-center justify-center rounded-full shadow text-neutral-800">▶</button>
          </>
        )}
      </div>
      <h2 className={`${playfair.className} text-xl font-medium`}>{mueble.titulo}</h2>
      <p className="text-neutral-500">{mueble.precio} · Envío incluido</p>
    </article>
  );
}

export default function TiendaClient({ muebles }: { muebles: any[] }) {
  const [vista, setVista] = useState("inicio");
  const [muebleActivo, setMuebleActivo] = useState<any>(null);
  const [imagenDetalle, setImagenDetalle] = useState(0);
  const [imagenZoom, setImagenZoom] = useState<string | null>(null);

  const [nombreForm, setNombreForm] = useState("");
  const [emailForm, setEmailForm] = useState("");
  const [mensajeForm, setMensajeForm] = useState("");
  const [enviadoForm, setEnviadoForm] = useState(false);

  useEffect(() => {
    window.history.replaceState({ vista: "inicio", muebleId: null }, "");

    const manejarPopState = (event: PopStateEvent) => {
      if (event.state) {
        setVista(event.state.vista || "inicio");
        if (event.state.muebleId) {
          const encontrado = muebles.find((m) => m.id === event.state.muebleId) || null;
          setMuebleActivo(encontrado);
        } else {
          setMuebleActivo(null);
        }
        setImagenDetalle(0);
        setImagenZoom(null);
      } else {
        setVista("inicio");
        setMuebleActivo(null);
        setImagenZoom(null);
      }
    };

    window.addEventListener("popstate", manejarPopState);
    return () => window.removeEventListener("popstate", manejarPopState);
  }, [muebles]);

  const irA = (nuevaVista: string, mueble: any = null) => {
    setVista(nuevaVista);
    setMuebleActivo(mueble);
    setImagenDetalle(0);
    setImagenZoom(null);
    window.history.pushState({ vista: nuevaVista, muebleId: mueble ? mueble.id : null }, "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const irASeccion = (idSeccion: string) => {
    if (vista !== "inicio") {
      setVista("inicio");
      setMuebleActivo(null);
      setImagenZoom(null);
      window.history.pushState({ vista: "inicio", muebleId: null }, "");
      setTimeout(() => {
        document.getElementById(idSeccion)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(idSeccion)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const abrirWhatsApp = (mensaje: string) => {
    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  const enviarFormulario = (e: React.FormEvent) => {
    e.preventDefault();
    const asunto = `Consulta web - ${nombreForm}`;
    const cuerpo = `Nombre: ${nombreForm}\nEmail: ${emailForm}\n\nMensaje:\n${mensajeForm}`;
    window.location.href = `mailto:jaalvest@gmail.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    setEnviadoForm(true);
    setNombreForm("");
    setEmailForm("");
    setMensajeForm("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-sans">
      <nav className="sticky top-0 z-40 bg-neutral-50/90 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className={`${playfair.className} text-2xl font-semibold tracking-tight cursor-pointer`} onClick={() => irA("inicio")}>
            El Taller de Juan
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <button onClick={() => irA("inicio")} className="hover:text-neutral-500 transition-colors">Inicio</button>
            <button onClick={() => irA("catalogo")} className="hover:text-neutral-500 transition-colors">Catálogo</button>
            <button onClick={() => irASeccion("nosotros")} className="hover:text-neutral-500 transition-colors">Quiénes somos</button>
            <button onClick={() => irASeccion("contacto")} className="hover:text-neutral-500 transition-colors">Contacto</button>
          </div>
          <div className="md:hidden flex gap-4 text-xs font-medium">
            <button onClick={() => irA("catalogo")}>Catálogo</button>
            <button onClick={() => irASeccion("contacto")}>Contacto</button>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {vista === "inicio" && (
          <div>
            <section className="relative h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center text-white overflow-hidden">
              <img src="/fondo.jpg" alt="El Taller de Juan" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/55" />
              <div className="relative z-10 px-6 max-w-3xl mx-auto">
                <h1 className={`${playfair.className} text-5xl md:text-7xl font-normal tracking-tight mb-6`}>Nueva vida a tu historia</h1>
                <p className="text-xl text-neutral-200 mb-10 max-w-2xl mx-auto">Restauración artesanal de piezas únicas. Descubre nuestra colección de muebles recuperados y dales un nuevo hogar.</p>
                <button onClick={() => irA("catalogo")} className="bg-white text-neutral-900 px-8 py-3 rounded-full text-sm font-medium hover:bg-neutral-200 transition-colors">Ver colección</button>
              </div>
              <button onClick={() => irASeccion("nosotros")} aria-label="Bajar a Quiénes somos" className="absolute bottom-8 z-10 text-white/80 hover:text-white transition-colors animate-bounce cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </section>

            <section id="nosotros" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-neutral-50">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className={`${playfair.className} text-4xl font-medium mb-8`}>Quiénes somos</h2>
                <p className="text-lg text-neutral-600 mb-6 leading-relaxed">El Taller de Juan es un pequeño taller de restauración artesanal que busca darle una nueva vida a piezas abandonadas y desechadas con el objetivo de demostrar que siempre se le puede dar una segunda oportunidad a lo que se cree perdido.</p>
                <p className="text-lg text-neutral-600 leading-relaxed">Nuestro objetivo no es solo reparar, sino devolver el alma a estas piezas, combinando técnicas artesanales tradicionales con acabados modernos para que puedan vivirse y disfrutarse por muchas generaciones más.</p>
              </div>
              <button onClick={() => irASeccion("contacto")} aria-label="Bajar a Contacto" className="absolute bottom-8 text-neutral-400 hover:text-neutral-900 transition-colors animate-bounce cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </section>

            <section id="contacto" className="min-h-[85vh] flex flex-col items-center justify-center px-6 py-24 bg-neutral-100">
              <div className="max-w-xl w-full mx-auto text-center">
                <h2 className={`${playfair.className} text-4xl font-medium mb-6`}>Contacto</h2>
                <p className="text-lg text-neutral-600 mb-8">¿Te interesa alguna de nuestras piezas del catálogo o quieres hacer un encargo? Escríbenos directamente.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                  <button onClick={() => abrirWhatsApp("Hola Juan, te escribo desde tu página web.")} className="w-full sm:w-auto bg-neutral-900 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer">
                    Escribir por WhatsApp
                  </button>
                  <a href="mailto:jaalvest@gmail.com" className="text-sm font-medium text-neutral-700 hover:text-neutral-900 underline underline-offset-4">
                    jaalvest@gmail.com
                  </a>
                </div>
                <form onSubmit={enviarFormulario} className="bg-white p-6 md:p-8 rounded-xl border border-neutral-200 text-left space-y-4 shadow-sm">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-neutral-500 mb-1">Nombre</label>
                    <input type="text" required value={nombreForm} onChange={(e) => setNombreForm(e.target.value)} placeholder="Tu nombre" className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-900 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-neutral-500 mb-1">Correo electrónico</label>
                    <input type="email" required value={emailForm} onChange={(e) => setEmailForm(e.target.value)} placeholder="tu@email.com" className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-900 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-neutral-500 mb-1">Mensaje</label>
                    <textarea rows={4} required value={mensajeForm} onChange={(e) => setMensajeForm(e.target.value)} placeholder="Cuéntanos qué pieza te interesa o qué tienes en mente..." className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-900 text-sm resize-none" />
                  </div>
                  <button type="submit" className="w-full bg-neutral-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer">
                    Enviar mensaje
                  </button>
                  {enviadoForm && (
                    <p className="text-xs text-neutral-600 text-center pt-2">Se ha abierto tu aplicación de correo con el mensaje listo para enviar.</p>
                  )}
                </form>
              </div>
            </section>
          </div>
        )}

        {vista === "catalogo" && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className={`${playfair.className} text-4xl font-medium mb-10`}>Colección</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {muebles.map((mueble) => (
                <TarjetaMueble key={mueble.id} mueble={mueble} onClick={() => irA("detalle", mueble)} />
              ))}
            </div>
          </div>
        )}

        {vista === "detalle" && muebleActivo && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                {muebleActivo.imagenes.length > 0 ? (
                  <>
                    <div onClick={() => setImagenZoom(muebleActivo.imagenes[imagenDetalle])} className="relative aspect-square overflow-hidden bg-neutral-200 rounded-lg mb-4 cursor-zoom-in group" title="Haz clic para ampliar">
                      <img src={muebleActivo.imagenes[imagenDetalle]} alt={muebleActivo.titulo} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                      <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        Ampliar foto
                      </span>
                    </div>
                    {muebleActivo.imagenes.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {muebleActivo.imagenes.map((img: string, i: number) => (
                          <button key={i} onClick={() => setImagenDetalle(i)} className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 cursor-pointer ${imagenDetalle === i ? 'border-neutral-900' : 'border-transparent hover:border-neutral-300'}`}>
                            <img src={img} alt={`Vista ${i}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="aspect-square bg-neutral-200 rounded-lg flex items-center justify-center text-neutral-400">Sin fotos disponibles</div>
                )}
              </div>

              <div>
                <button onClick={() => irA("catalogo")} className="text-sm text-neutral-500 mb-6 hover:text-neutral-900 transition-colors cursor-pointer">← Volver al catálogo</button>
                <div className="mb-3">
                  <span className="inline-block text-xs font-medium uppercase tracking-wider bg-neutral-200 text-neutral-800 px-3 py-1 rounded-full">Pieza única</span>
                </div>
                <h1 className={`${playfair.className} text-4xl font-medium mb-3`}>{muebleActivo.titulo}</h1>
                <p className="text-2xl font-light mb-6">
                  {muebleActivo.precio} <span className="text-sm text-neutral-500 ml-2">· Envío a península incluido</span>
                </p>
                <div className="grid grid-cols-3 gap-4 border-y border-neutral-200 py-4 mb-6 text-sm">
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-neutral-400">Alto</span>
                    <span className="font-medium text-neutral-800">{muebleActivo.medidas.alto}</span>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-neutral-400">Ancho</span>
                    <span className="font-medium text-neutral-800">{muebleActivo.medidas.ancho}</span>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-neutral-400">Fondo</span>
                    <span className="font-medium text-neutral-800">{muebleActivo.medidas.fondo}</span>
                  </div>
                </div>
                <div className="text-neutral-700 leading-relaxed mb-8">
                  <p>{muebleActivo.descripcion}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={() => abrirWhatsApp(`Hola Juan, me interesa la pieza "${muebleActivo.titulo}" (${muebleActivo.precio}).`)} className="w-full sm:w-auto bg-neutral-900 text-white px-8 py-4 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors cursor-pointer">
                    Me interesa esta pieza (WhatsApp)
                  </button>
                  <button onClick={() => irASeccion("contacto")} className="w-full sm:w-auto border border-neutral-300 text-neutral-800 px-6 py-4 rounded-lg text-sm font-medium hover:border-neutral-900 transition-colors cursor-pointer">
                    Consultar por correo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {imagenZoom && (
        <div onClick={() => setImagenZoom(null)} className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out">
          <button onClick={() => setImagenZoom(null)} className="absolute top-6 right-6 text-white/80 hover:text-white text-3xl font-light cursor-pointer" aria-label="Cerrar imagen">✕</button>
          <img src={imagenZoom} alt="Vista ampliada" className="max-w-full max-h-[90vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <footer className="bg-neutral-900 text-neutral-400 py-10 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div>
            <span className={`${playfair.className} text-white text-lg font-medium`}>El Taller de Juan</span>
            <p className="text-neutral-500 mt-1">Restauración artesanal · Vigo, España</p>
          </div>
          <div className="text-xs text-neutral-500">
            © {new Date().getFullYear()} El Taller de Juan. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}