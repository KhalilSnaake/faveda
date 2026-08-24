export const DELIVERY_FEE = 1500;
export const FREE_DELIVERY_FROM = 25000;

export const catalogProducts = [
  {
    slug: "traitement-ongles-teigne",
    name: "Traitement des ongles à la teigne",
    subtitle: "Solution végétale ciblée pour ongles fragilisés",
    description:
      "Formule Faveda à base d’extraits de plantes médicinales, conçue pour accompagner le soin des ongles atteints de teigne. Sa texture fluide pénètre facilement et respecte l’équilibre naturel de la peau autour de l’ongle.",
    usage:
      "Nettoyez l’ongle, appliquez quelques gouttes matin et soir jusqu’à nette amélioration. Évitez le contact avec les yeux. Usage externe uniquement.",
    ingredients:
      "Extraits de plantes médicinales, huiles végétales, eau florale, actifs botaniques Faveda.",
    volume: "1 L",
    category: "Soins ciblés",
    price: 8500,
    image: "/images/products/ongles-teigne.jpg",
    benefits: [
      "Soin ciblé des ongles",
      "Formule 100 % végétale",
      "Texture fluide, facile à appliquer",
      "Idéal en cure régulière",
    ],
    stock: 48,
    featured: true,
  },
  {
    slug: "tisane-ecorces-medicinales",
    name: "Tisane aux écorces médicinales",
    subtitle: "Infusion traditionnelle de plantes et d’écorces",
    description:
      "Mélange artisanal d’écorces et de plantes séchées, préparé selon le savoir-faire Faveda. Une tisane chaude, aromatique, pensée pour les rituels de détox douce et de bien-être quotidien.",
    usage:
      "Faites infuser une poignée dans 1 litre d’eau frémissante pendant 10 à 15 minutes. Filtrez. Buvez 1 à 2 tasses par jour, de préférence entre les repas.",
    ingredients:
      "Écorces médicinales, plantes séchées, racines aromatiques. Sans additif, sans colorant.",
    volume: "200 g",
    category: "Tisanes",
    price: 6500,
    image: "/images/products/tisane-plantes.jpg",
    benefits: [
      "Rituel détox en douceur",
      "Plantes séchées à la main",
      "Goût boisé et authentique",
      "Sachet refermable",
    ],
    stock: 60,
    featured: true,
  },
  {
    slug: "traitement-douleurs-ventre",
    name: "Traitement des douleurs au ventre",
    subtitle: "Formule concentrée pour le confort digestif",
    description:
      "Préparation végétale Faveda destinée à apaiser les tensions abdominales et à soutenir le confort digestif. Une formule concentrée, issue de plantes reconnues dans les soins traditionnels.",
    usage:
      "Selon les indications du livret : généralement une dose diluée dans un verre d’eau, 1 à 2 fois par jour. Ne pas dépasser la posologie recommandée.",
    ingredients:
      "Complexe de plantes digestives, extraits aqueux, actifs botaniques Faveda.",
    volume: "1 L",
    category: "Confort digestif",
    price: 9500,
    image: "/images/products/douleurs-ventre.jpg",
    benefits: [
      "Confort abdominal",
      "Formule concentrée",
      "Plantes traditionnelles",
      "Usage quotidien possible",
    ],
    stock: 42,
    featured: true,
  },
  {
    slug: "elixir-douleurs-ventre",
    name: "Élixir douleurs au ventre",
    subtitle: "Décoction liquide prête à l’emploi",
    description:
      "Grande bouteille d’élixir Faveda : une décoction ambrée de plantes, déjà infusée, pensée pour les cures plus longues. Le goût authentique des extraits végétaux, sans transformation industrielle.",
    usage:
      "Agitez avant emploi. Prenez un verre selon le livret d’accompagnement, de préférence après le repas. Conserver au frais après ouverture et consommer sous 15 jours.",
    ingredients:
      "Décoction de plantes médicinales, eau de source, extraits d’écorces et de feuilles.",
    volume: "1,5 L",
    category: "Confort digestif",
    price: 12000,
    image: "/images/products/elixir-ventre.jpg",
    benefits: [
      "Prêt à l’emploi",
      "Idéal en cure",
      "Grande contenance",
      "Goût d’infusion authentique",
    ],
    stock: 36,
    featured: true,
  },
  {
    slug: "soin-tete-noire",
    name: "Soin Tête noire sans prise de poids",
    subtitle: "Extrait traditionnel, formule légère",
    description:
      "Soin Faveda inspiré des recettes traditionnelles pour accompagner les déséquilibres dits « tête noire ». Une formule concentrée, pensée pour rester légère et ne pas favoriser la prise de poids.",
    usage:
      "Quelques gouttes selon le protocole indiqué dans le livret, de préférence le matin. Respectez la durée de cure recommandée. Demandez conseil en cas de grossesse.",
    ingredients:
      "Extraits de plantes sélectionnées, huile végétale porteuse, actifs botaniques Faveda.",
    volume: "50 ml",
    category: "Soins ciblés",
    price: 7500,
    image: "/images/products/tete-noire.jpg",
    benefits: [
      "Recette traditionnelle",
      "Formule légère",
      "Sans prise de poids",
      "Flacon compte-gouttes",
    ],
    stock: 50,
    featured: false,
  },
  {
    slug: "lotion-corporelle-plantes",
    name: "Lotion corporelle aux plantes",
    subtitle: "Soin quotidien nourrissant et apaisant",
    description:
      "Lotion corporelle Faveda aux extraits de plantes, karité et aloe. Elle hydrate, assouplit et laisse un voile satiné sans effet gras. Le geste simple d’un rituel beauté naturel, matin et soir.",
    usage:
      "Après la douche, appliquez sur peau encore humide en massages circulaires. Convient à toute la famille. Éviter le contour des yeux.",
    ingredients:
      "Beurre de karité, aloe vera, extraits de plantes, huiles végétales, eau florale.",
    volume: "250 ml",
    category: "Soins du corps",
    price: 5500,
    image: "/images/products/lotion-corporelle.jpg",
    benefits: [
      "Hydratation longue durée",
      "Texture non grasse",
      "Parfum végétal subtil",
      "Peaux sensibles bienvenues",
    ],
    stock: 70,
    featured: true,
  },
];

export const catalogDrivers = [
  {
    name: "Aminata Diallo",
    phone: "+225 07 12 34 56 78",
    vehicle: "Scooter",
    zone: "Cocody · Plateau",
    status: "available",
    username: "aminata",
    password: "livreur123",
  },
  {
    name: "Koffi Mensah",
    phone: "+225 05 98 76 54 32",
    vehicle: "Moto",
    zone: "Yopougon · Adjamé",
    status: "available",
    username: "koffi",
    password: "livreur123",
  },
  {
    name: "Fatou Ndiaye",
    phone: "+225 01 45 23 67 89",
    vehicle: "Voiture",
    zone: "Marcory · Treichville",
    status: "available",
    username: "fatou",
    password: "livreur123",
  },
];

export const paymentMethods = [
  {
    id: "cash",
    label: "Espèces à la livraison",
    hint: "Réglez directement au livreur",
  },
  {
    id: "orange",
    label: "Orange Money",
    hint: "Paiement mobile instantané",
  },
  {
    id: "mtn",
    label: "MTN Mobile Money",
    hint: "Paiement mobile instantané",
  },
  {
    id: "wave",
    label: "Wave",
    hint: "Transfert simple et rapide",
  },
  {
    id: "card",
    label: "Carte bancaire",
    hint: "Visa · Mastercard",
  },
] as const;

export const orderStatuses = [
  { id: "pending", label: "Nouvelle", tone: "sand" },
  { id: "confirmed", label: "Confirmée", tone: "leaf" },
  { id: "assigned", label: "Affectée", tone: "gold" },
  { id: "in_transit", label: "En livraison", tone: "gold" },
  { id: "delivered", label: "Livrée", tone: "leaf" },
  { id: "cancelled", label: "Annulée", tone: "muted" },
] as const;

export function statusLabel(status: string) {
  return orderStatuses.find((item) => item.id === status)?.label ?? status;
}

export function paymentLabel(method: string) {
  return paymentMethods.find((item) => item.id === method)?.label ?? method;
}

export function computeDeliveryFee(subtotal: number) {
  return subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
}

export const promoCodes: Record<
  string,
  { label: string; type: "percent" | "free_delivery"; value: number; min?: number }
> = {
  FAVEDA10: { label: "10 % de remise", type: "percent", value: 10 },
  NATURE15: { label: "15 % dès 15 000 F", type: "percent", value: 15, min: 15000 },
  LIVRAISON: { label: "Livraison offerte", type: "free_delivery", value: 0 },
};

export function applyPromo(subtotal: number, rawCode?: string | null) {
  const deliveryFee = computeDeliveryFee(subtotal);
  const code = (rawCode || "").trim().toUpperCase();
  const promo = code ? promoCodes[code] : undefined;

  if (!code) {
    return { ok: true as const, code: "", label: "", discount: 0, deliveryFee, total: subtotal + deliveryFee };
  }
  if (!promo) {
    return {
      ok: false as const,
      code: "",
      label: "",
      discount: 0,
      deliveryFee,
      total: subtotal + deliveryFee,
      error: "Code promo inconnu",
    };
  }
  if (promo.min && subtotal < promo.min) {
    return {
      ok: false as const,
      code: "",
      label: "",
      discount: 0,
      deliveryFee,
      total: subtotal + deliveryFee,
      error: `Ce code s’applique dès ${promo.min.toLocaleString("fr-FR")} F CFA`,
    };
  }

  const discount = promo.type === "percent" ? Math.round((subtotal * promo.value) / 100) : 0;
  const nextDelivery = promo.type === "free_delivery" ? 0 : deliveryFee;
  return {
    ok: true as const,
    code,
    label: promo.label,
    discount,
    deliveryFee: nextDelivery,
    total: Math.max(0, subtotal - discount + nextDelivery),
  };
}

export const testimonials = [
  {
    name: "Awa K.",
    city: "Cocody",
    text: "La lotion et la tisane sont devenues mon rituel du soir. Livraison claire, code secret rassurant.",
  },
  {
    name: "Jean-Marc T.",
    city: "Yopougon",
    text: "Le traitement ventre m’a vraiment aidé. J’ai suivi la commande en un clic, nickel.",
  },
  {
    name: "Mariam S.",
    city: "Marcory",
    text: "Produits authentiques, packaging soigné. J’ai partagé ma position, le livreur m’a trouvée facilement.",
  },
];

export const faqs = [
  {
    q: "Comment fonctionne le code secret ?",
    a: "À chaque commande, un code à 4 chiffres est généré. Vous le donnez uniquement au livreur Faveda pour confirmer la remise.",
  },
  {
    q: "Quels sont les délais de livraison ?",
    a: "À Abidjan, comptez généralement 24 à 48 h. Hors zone, 48 à 72 h selon le quartier.",
  },
  {
    q: "Puis-je payer à la livraison ?",
    a: "Oui, en espèces. Orange Money, MTN, Wave et carte sont aussi disponibles.",
  },
  {
    q: "Les soins sont-ils 100 % naturels ?",
    a: "Oui : plantes, écorces et extraits botaniques, sans colorant superflu. Lisez toujours le livret d’utilisation.",
  },
];

export const ritualPacks = [
  {
    id: "rituel-ventre",
    title: "Rituel confort ventre",
    description: "Traitement + élixir pour une cure complète.",
    slugs: ["traitement-douleurs-ventre", "elixir-douleurs-ventre"],
    badge: "Le plus demandé",
  },
  {
    id: "rituel-peau",
    title: "Rituel peau lumineuse",
    description: "Lotion corporelle + soin tête noire.",
    slugs: ["lotion-corporelle-plantes", "soin-tete-noire"],
    badge: "Beauté",
  },
];

export const whatsappNumber = "2250700112233";

export const catalogJobs = [
  {
    title: "Livreur(se) — Abidjan",
    department: "Logistique",
    location: "Abidjan",
    contract: "Temps plein",
    description:
      "Vous assurez la livraison des commandes Faveda auprès de nos clients, avec soin et ponctualité. Vous gérez l'encaissement à la livraison et le code secret de confirmation avec le client.",
    requirements:
      "Moto ou scooter personnel\nSens du contact et ponctualité\nBonne connaissance des communes d'Abidjan\nSmartphone Android pour le suivi des courses",
    active: true,
  },
  {
    title: "Community manager — contenus vidéo",
    department: "Communication",
    location: "Abidjan / hybride",
    contract: "Temps partiel",
    description:
      "Vous créez et publiez les vidéos TikTok, YouTube et Instagram de Faveda : tutoriels d'utilisation, coulisses de l'atelier et témoignages clients.",
    requirements:
      "Aisance en tournage et montage mobile\nSensibilité pour les produits naturels\nCréativité et régularité de publication",
    active: true,
  },
  {
    title: "Préparateur(trice) en herboristerie",
    department: "Atelier",
    location: "Abidjan",
    contract: "Temps plein",
    description:
      "Au sein de l'atelier, vous participez à la sélection des plantes, au pilage, aux infusions et au conditionnement des soins Faveda dans le respect de nos recettes.",
    requirements:
      "Intérêt pour la phytothérapie traditionnelle\nRigueur et hygiène\nEsprit d'équipe",
    active: true,
  },
];

export const socialLinks = {
  tiktok: "https://www.tiktok.com/@faveda.ci",
  youtube: "https://www.youtube.com/@favedaci",
  instagram: "https://www.instagram.com/faveda.ci",
  facebook: "https://www.facebook.com/faveda.ci",
};

export const catalogVideos = [
  {
    slug: "preparation-tisane-ecorces",
    title: "Comment préparer la tisane aux écorces",
    description: "Rituel complet : dosage, infusion 12 minutes, filtrage. Une tasse matin et soir pour une détox douce.",
    category: "Tutoriel",
    thumbnail: "https://images.pexels.com/videos/8507938/antique-art-artisan-arts-and-crafts-8507938.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630",
    videoUrl: "https://videos.pexels.com/video-files/8507938/8507938-hd_1080_1920_25fps.mp4",
    platform: "tiktok",
    externalUrl: "https://www.tiktok.com/@faveda.ci",
    duration: 13,
    views: 12400,
    productSlug: "tisane-ecorces-medicinales",
    featured: true,
  },
  {
    slug: "application-lotion-corporelle",
    title: "Routine peau : la lotion corporelle Faveda",
    description: "Après la douche, sur peau humide. Mouvements circulaires, du bas vers le haut. Résultat : peau satinée toute la journée.",
    category: "Routine beauté",
    thumbnail: "https://images.pexels.com/videos/8406620/adult-beautiful-beauty-beauty-routine-8406620.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630",
    videoUrl: "https://videos.pexels.com/video-files/8406620/8406620-hd_1080_1920_24fps.mp4",
    platform: "youtube",
    externalUrl: "https://www.youtube.com/@favedaci",
    duration: 14,
    views: 8700,
    productSlug: "lotion-corporelle-plantes",
    featured: true,
  },
  {
    slug: "pilage-plantes-atelier",
    title: "Dans l'atelier : pilage des plantes",
    description: "Chaque lot commence ici. Écorces sélectionnées, pilées au mortier, avant extraction. Le geste artisanal Faveda.",
    category: "Coulisses",
    thumbnail: "https://images.pexels.com/videos/7525923/alternative-aromatherapy-aromatic-background-7525923.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630",
    videoUrl: "https://videos.pexels.com/video-files/7525923/7525923-hd_1080_1920_30fps.mp4",
    platform: "tiktok",
    externalUrl: "https://www.tiktok.com/@faveda.ci",
    duration: 20,
    views: 23100,
    productSlug: null,
    featured: true,
  },
  {
    slug: "huiles-essentielles-faveda",
    title: "Les huiles essentielles dans nos formules",
    description: "Pourquoi on choisit des huiles végétales plutôt que synthétiques. Focus sur la qualité des extraits.",
    category: "Savoir-faire",
    thumbnail: "https://images.pexels.com/videos/20395600/alternative-aromatherapy-aromatic-bottle-20395600.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630",
    videoUrl: "https://videos.pexels.com/video-files/20395600/20395600-uhd_2160_3840_50fps.mp4",
    platform: "youtube",
    externalUrl: "https://www.youtube.com/@favedaci",
    duration: 27,
    views: 5300,
    productSlug: "traitement-ongles-teigne",
    featured: false,
  },
  {
    slug: "routine-soin-ventre",
    title: "Ma cure confort ventre — 1 semaine",
    description: "Témoignage : comment j'ai intégré l'élixir et le traitement ventre dans mon quotidien pendant 7 jours.",
    category: "Témoignage",
    thumbnail: "https://images.pexels.com/videos/7852600/aid-alternative-applying-aromatherapy-7852600.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630",
    videoUrl: "https://videos.pexels.com/video-files/7852600/7852600-hd_1080_1920_30fps.mp4",
    platform: "instagram",
    externalUrl: "https://www.instagram.com/faveda.ci",
    duration: 10,
    views: 15800,
    productSlug: "traitement-douleurs-ventre",
    featured: true,
  },
  {
    slug: "infusion-plantes-sechees",
    title: "Infusion lente : le secret d'une bonne tisane",
    description: "Pas de bouilloire ! Eau frémissante, 12 à 15 minutes, filtrage doux. Tous les détails pour une infusion parfaite.",
    category: "Tutoriel",
    thumbnail: "https://images.pexels.com/videos/6956379/boiling-buddhism-buddhist-contemplation-6956379.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630",
    videoUrl: "https://videos.pexels.com/video-files/6956379/6956379-hd_1080_1920_25fps.mp4",
    platform: "tiktok",
    externalUrl: "https://www.tiktok.com/@faveda.ci",
    duration: 8,
    views: 9200,
    productSlug: "tisane-ecorces-medicinales",
    featured: false,
  },
  {
    slug: "soin-peau-naturel",
    title: "Gommage & lotion : le combo peau douce",
    description: "Gommage doux aux plantes, suivi de la lotion Faveda. 5 minutes pour une peau rayonnante.",
    category: "Routine beauté",
    thumbnail: "https://images.pexels.com/videos/9335887/adult-aid-body-massage-family-9335887.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630",
    videoUrl: "https://videos.pexels.com/video-files/9335887/9335887-hd_1080_1920_25fps.mp4",
    platform: "instagram",
    externalUrl: "https://www.instagram.com/faveda.ci",
    duration: 10,
    views: 6100,
    productSlug: "lotion-corporelle-plantes",
    featured: false,
  },
  {
    slug: "preparation-artisanale-elixir",
    title: "Comment naît l'élixir Faveda",
    description: "De l'écorce brute à la bouteille ambrée : découvrez la fabrication artisanale de l'élixir douleurs ventre.",
    category: "Coulisses",
    thumbnail: "https://images.pexels.com/videos/8391554/adult-art-artisan-arts-and-crafts-8391554.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630",
    videoUrl: "https://videos.pexels.com/video-files/8391554/8391554-hd_1080_1920_24fps.mp4",
    platform: "youtube",
    externalUrl: "https://www.youtube.com/@favedaci",
    duration: 17,
    views: 18400,
    productSlug: "elixir-douleurs-ventre",
    featured: true,
  },
];
