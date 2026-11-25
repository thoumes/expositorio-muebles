export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-10 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <div>
          <span className="font-serif text-white text-lg font-medium">
            El Taller de Juan
          </span>
          <p className="text-neutral-500 mt-1">
            Restauración artesanal · Vigo, España
          </p>
        </div>
        <div className="text-xs text-neutral-500">
          © {new Date().getFullYear()} El Taller de Juan. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}