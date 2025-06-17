export default function SharedBackground({ children, className = "" }) {
  return (
    <section className={`relative bg-[#0F0F10] overflow-hidden ${className}`}>
      {/* Fondo sutil con gradientes y efectos de luz */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradientes de fondo principales */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3B82F6]/3 via-transparent to-[#1E40AF]/2"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-[#10B981]/2 via-transparent to-[#8B5CF6]/2"></div>

        {/* Efectos de luz sutiles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3B82F6]/8 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-[#10B981]/6 rounded-full blur-[100px] opacity-50"></div>
        <div className="absolute top-2/3 left-1/2 w-72 h-72 bg-[#8B5CF6]/5 rounded-full blur-[90px] opacity-40"></div>

        {/* Líneas decorativas sutiles */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#3B82F6]/10 to-transparent"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-[#10B981]/8 to-transparent"></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-[#8B5CF6]/6 to-transparent"></div>

        {/* Patrón de puntos muy sutil */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.4) 1px, transparent 0)`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>
      </div>

      {/* Contenido */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
