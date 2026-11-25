import fs from "fs";
import path from "path";

export type EstadoMueble = "disponible" | "reservado" | "vendido";

export interface Mueble {
  id: number;
  slug: string;
  titulo: string;
  descripcion: string;
  precio: string;
  estado: EstadoMueble;
  destacado?: boolean;
  medidas: {
    alto: string;
    ancho: string;
    fondo: string;
  };
  imagenes: string[];
}

function obtenerImagenes(carpeta: string): string[] {
  const ruta = path.join(process.cwd(), "public", carpeta);
  if (!fs.existsSync(ruta)) return [];

  return fs
    .readdirSync(ruta)
    .filter((archivo) => /\.(png|jpe?g|webp)$/i.test(archivo))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((archivo) => `/${carpeta}/${archivo}`);
}

export function obtenerMuebles(): Mueble[] {
  return [
    {
      id: 1,
      slug: "aparador-hidalgo",
      titulo: "Aparador Hidalgo",
      descripcion:
        "Este imponente mueble castellano ha sido completamente rescatado y reinventado para convertirse en el centro de atención de cualquier estancia. Tras un laborioso proceso de decapado manual para retirar décadas de pintura anterior, el cuerpo principal ha renacido bajo un vibrante color rojo china, patinado a mano con betún de Judea para aportarle profundidad y un elegante efecto envejecido. El tablero superior contrasta cálidamente gracias a su madera teñida en tono miel oscuro con un acabado satinado. Una de las joyas de esta pieza de madera maciza son sus herrajes originales de hierro (tiradores, pasadores y bisagras), confeccionados a mano, que han sido restaurados y protegidos para lucir su belleza industrial. Su interior, renovado en un luminoso blanco satinado, lo hace tan práctico por dentro como espectacular por fuera. Toda la pieza cuenta con un acabado final a la cera incolora que protege la madera y le confiere un tacto sedoso inigualable.",
      precio: "690€",
      estado: "disponible",
      destacado: true,
      medidas: { alto: "00 cm", ancho: "00 cm", fondo: "00 cm" },
      imagenes: obtenerImagenes("product1"),
    },
    {
      id: 2,
      slug: "comoda-cabriole-ciel-de-nuit",
      titulo: "Cómoda Cabriolé 'Ciel de Nuit'",
      descripcion:
        "Esta coqueta cómoda de líneas clásicas y elegantes patas cabriolé ha sido transformada en una pieza romántica y llena de personalidad. Tras retirar su acabado original, el cuerpo del mueble ha sido trabajado con exquisito detalle mediante la aplicación artesanal de cinco capas de policromía, logrando una paleta única de azules y grises empolvados. Para realzar sus espectaculares tallas laterales y simular el encanto del desgaste natural por el paso del tiempo, se han añadido sutiles rozaduras en color oro y sombreados artesanales con betún de Judea. El tablero superior, teñido en un tono oscuro y rematado con cera incolora, ofrece un contraste sofisticado y cálido. La pieza se corona con sus tres clásicos tiradores originales de bronce, los cuales han sido cuidadosamente bruñidos a mano y protegidos para recuperar su esplendor. Un mueble que es pura poesía visual, protegido íntegramente para garantizar su durabilidad diaria.",
      precio: "320€",
      estado: "disponible",
      destacado: true,
      medidas: { alto: "00 cm", ancho: "00 cm", fondo: "00 cm" },
      imagenes: obtenerImagenes("product2"),
    },
    {
      id: 3,
      slug: "silla-balloon-back-pureza",
      titulo: "Silla Balloon Back 'Pureza'",
      descripcion:
        "Esta exquisita silla de comedor de estilo Louis Philippe destaca por el elegante perfil de su respaldo 'balloon back' y sus delicadas tallas frontales. Ha sido sometida a una restauración integral y minuciosa, despojándola de sus antiguos barnices para revelar la auténtica nobleza y el veteado natural de su madera maciza de nogal, ahora protegida con un suave barniz satinado incoloro. Su mayor tesoro se oculta en su interior: el asiento ha sido reconstruido por completo utilizando técnicas de alta tapicería tradicional. Se ha renovado la base de cinchas, restaurado y atado a mano los muelles originales, y acolchado con tela de arpillera y auténtica crin vegetal. Para culminar su renacer, ha sido tapizada con un resistente y luminoso tejido de algodón en blanco crudo por ambas caras, rematado con un elegante cordón textil. Una pieza clásica, robusta y atemporal, lista para aportar luz y sofisticación a cualquier rincón.",
      precio: "390€",
      estado: "disponible",
      destacado: true,
      medidas: { alto: "00 cm", ancho: "00 cm", fondo: "00 cm" },
      imagenes: obtenerImagenes("product3"),
    },
    {
      id: 4,
      slug: "silla-cabriole-jardin-dorado",
      titulo: "Silla Cabriolé 'Jardín Dorado'",
      descripcion:
        "Esta encantadora silla de comedor con patas cabriolé es un juego de contrastes diseñado para enamorar. Su estructura de madera maciza ha sido completamente reforzada y trabajada a mano mediante un laborioso proceso de cepillado. Esta técnica ha permitido retirar los antiguos barnices y sacar a relucir el relieve natural de la veta, que ahora destaca gracias a un delicado teñido en blanco y una protección de barniz incoloro mate. El asiento, renovado desde su base con nuevas cinchas y espumas de alta densidad para garantizar su máxima comodidad, se viste de gala con una tapicería de acabado sedoso. Sus vibrantes motivos florales sobre un fondo dorado aportan un toque de lujo y luz, enmarcado a la perfección por un elegante cordón dorado en todo su contorno. Una pieza firme, cómoda y con un carácter visual innegable.",
      precio: "240€",
      estado: "disponible",
      destacado: false,
      medidas: { alto: "00 cm", ancho: "00 cm", fondo: "00 cm" },
      imagenes: obtenerImagenes("product4"),
    },
  ];
}

export function obtenerMueblePorSlug(slug: string): Mueble | undefined {
  return obtenerMuebles().find((m) => m.slug === slug);
}