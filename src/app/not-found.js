import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "100px 20px" }}>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe o ha sido movida.</p>
      <Link
        href="/"
        style={{
          marginTop: "20px",
          display: "inline-block",
          textDecoration: "underline",
        }}
      >
        Volver al inicio
      </Link>
    </div>
  );
}
