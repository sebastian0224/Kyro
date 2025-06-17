export default function SharedBackground({
  children,
  className = "",
  variant = "default",
}) {
  return (
    <section className={`relative bg-[#0F0F10] overflow-hidden ${className}`}>
      {/* Fondo con mayor intensidad y animaciones crypto */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradientes de fondo principales - MÁS INTENSOS */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3B82F6]/15 via-transparent to-[#1E40AF]/12"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-[#10B981]/12 via-transparent to-[#8B5CF6]/10"></div>

        {/* Efectos de luz más intensos */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3B82F6]/20 rounded-full blur-[120px] opacity-80 animate-pulse"></div>
        <div
          className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-[#10B981]/18 rounded-full blur-[100px] opacity-70 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-2/3 left-1/2 w-72 h-72 bg-[#8B5CF6]/15 rounded-full blur-[90px] opacity-60 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Líneas decorativas más visibles */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#3B82F6]/25 to-transparent"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-[#10B981]/20 to-transparent"></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-[#8B5CF6]/18 to-transparent"></div>

        {/* Patrón de puntos más visible */}
        <div className="absolute inset-0 opacity-[0.08]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.6) 1px, transparent 0)`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        {/* ANIMACIONES CRYPTO - Iconos flotantes */}
        {variant === "hero" && (
          <>
            {/* Bitcoin symbol */}
            <div
              className="absolute top-20 right-1/4 text-[#F59E0B]/20 text-4xl animate-bounce"
              style={{ animationDelay: "1s", animationDuration: "3s" }}
            >
              ₿
            </div>
            {/* Ethereum symbol */}
            <div
              className="absolute bottom-1/4 left-1/5 text-[#627EEA]/25 text-3xl animate-bounce"
              style={{ animationDelay: "2s", animationDuration: "4s" }}
            >
              Ξ
            </div>
            {/* Dollar signs */}
            <div
              className="absolute top-1/3 right-1/6 text-[#10B981]/20 text-2xl animate-pulse"
              style={{ animationDelay: "0.5s" }}
            >
              $
            </div>
            <div
              className="absolute bottom-1/3 right-1/2 text-[#10B981]/15 text-xl animate-pulse"
              style={{ animationDelay: "3s" }}
            >
              $
            </div>
          </>
        )}

        {variant === "features" && (
          <>
            {/* Blockchain nodes */}
            <div
              className="absolute top-16 left-1/6 w-3 h-3 bg-[#3B82F6]/30 rounded-full animate-ping"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 right-1/5 w-2 h-2 bg-[#10B981]/35 rounded-full animate-ping"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-[#8B5CF6]/25 rounded-full animate-ping"
              style={{ animationDelay: "3s" }}
            ></div>

            {/* Connection lines */}
            <div
              className="absolute top-20 left-1/4 w-16 h-px bg-[#3B82F6]/20 animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className="absolute bottom-1/3 right-1/4 w-12 h-px bg-[#10B981]/20 animate-pulse"
              style={{ animationDelay: "2.5s" }}
            ></div>
          </>
        )}

        {variant === "howitworks" && (
          <>
            {/* Wallet icons */}
            <div
              className="absolute top-1/4 left-1/8 text-[#F59E0B]/20 text-2xl animate-pulse"
              style={{ animationDelay: "1s" }}
            >
              👛
            </div>
            <div
              className="absolute bottom-1/3 right-1/8 text-[#3B82F6]/25 text-2xl animate-pulse"
              style={{ animationDelay: "2s" }}
            >
              🔗
            </div>
            {/* Arrow flow */}
            <div
              className="absolute top-1/2 left-1/4 text-[#10B981]/20 text-xl animate-bounce"
              style={{ animationDelay: "0.5s", animationDuration: "2s" }}
            >
              →
            </div>
            <div
              className="absolute top-1/2 right-1/4 text-[#10B981]/20 text-xl animate-bounce"
              style={{ animationDelay: "1.5s", animationDuration: "2s" }}
            >
              →
            </div>
          </>
        )}

        {variant === "pricing" && (
          <>
            {/* Money symbols */}
            <div
              className="absolute top-1/5 left-1/5 text-[#10B981]/25 text-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            >
              💰
            </div>
            <div
              className="absolute bottom-1/4 right-1/6 text-[#F59E0B]/20 text-2xl animate-pulse"
              style={{ animationDelay: "2s" }}
            >
              💎
            </div>
            {/* Price charts */}
            <div
              className="absolute top-1/3 right-1/3 text-[#3B82F6]/20 text-xl animate-bounce"
              style={{ animationDelay: "0.5s", animationDuration: "3s" }}
            >
              📈
            </div>
          </>
        )}
      </div>

      {/* Contenido */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
