// Static content shared across multiple pages (Home, Quiénes somos, Cómo adoptar, Donaciones)

export const RESCUE_STEPS = [
  { icon: "🐾", label: "Los llevamos al veterinario", color: "#f4c9cf" },
  { icon: "🐾", label: "Los desparasitamos", color: "#f5d7ad" },
  { icon: "🐾", label: "Los esterilizamos", color: "#d3e5b6" },
  { icon: "🐾", label: "Tratamiento médico si lo necesitan", color: "#c3d7ef" },
  { icon: "🐾", label: "Si es necesario, reciben entrenamiento", color: "#dcccee" },
];

export const ADOPT_STEPS = [
  {
    n: "1",
    title: "Elige a tu perrito",
    text: "Explora la galería y conoce la historia de cada uno para encontrar tu match ideal.",
    color: "#16808A",
  },
  {
    n: "2",
    title: "Escríbenos",
    text: "Contáctanos por WhatsApp o Instagram. Platicaremos sobre tu hogar y tu estilo de vida.",
    color: "#F0A95C",
  },
  {
    n: "3",
    title: "Entrevista y visita",
    text: "Hacemos una breve entrevista y coordinamos que conozcas al perrito en persona.",
    color: "#EF9BB4",
  },
  {
    n: "4",
    title: "Adopción responsable",
    text: "Firmamos carta compromiso y damos seguimiento para asegurar que todo vaya de maravilla.",
    color: "#6FA84E",
  },
];

export const DONATE_AMOUNTS = [100, 200, 500, 1000];

export const DONATE_METHODS = [
  { name: "Mercado Pago", desc: "Tarjeta, débito o efectivo", icon: "💳", color: "#7FA6D6" },
  { name: "PayPal", desc: "Pago internacional seguro", icon: "🅿️", color: "#16808A" },
  { name: "Transferencia / CLABE", desc: "Depósito directo a la cuenta", icon: "🏦", color: "#6FA84E" },
];
