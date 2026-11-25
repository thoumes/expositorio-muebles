import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-neutral-50/90 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-2xl font-semibold tracking-tight"
        >
          El Taller de Juan
        </Link>

        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <Link href="/" className="hover:text-neutral-500 transition-colors">
            Inicio
          </Link>
          <Link href="/catalogo" className="hover:text-neutral-500 transition-colors">
            Catálogo
          </Link>
          <Link href="/#nosotros" className="hover:text-neutral-500 transition-colors">
            Quiénes somos
          </Link>
          <Link href="/#contacto" className="hover:text-neutral-500 transition-colors">
            Contacto
          </Link>
        </div>

        <div className="md:hidden flex gap-4 text-xs font-medium">
          <Link href="/catalogo">Catálogo</Link>
          <Link href="/#nosotros">Nosotros</Link>
          <Link href="/#contacto">Contacto</Link>
        </div>
      </div>
    </nav>
  );
}