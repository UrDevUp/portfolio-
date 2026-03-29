export const SEO_BASE_URL = "https://www.urdevup.com";

const defaultImage = `${SEO_BASE_URL}/assets/images/og-image.jpg`;

export const routeSeo = {
  "/": {
    title: {
      en: "UrDevUp | Web Development, Branding and SEO Agency",
      fr: "UrDevUp | Agence Web, Branding et SEO",
    },
    description: {
      en: "UrDevUp builds high-performance websites, branding systems, and SEO-focused digital experiences for modern businesses.",
      fr: "UrDevUp cree des sites web performants, des identites de marque et des experiences digitales orientees SEO pour les entreprises modernes.",
    },
    keywords:
      "web development, branding, digital agency, seo optimization, ux ui design, custom website development, Morocco",
    image: defaultImage,
    type: "website",
  },
  "/PrivacyPolicy": {
    title: {
      en: "Privacy Policy | UrDevUp",
      fr: "Politique de confidentialite | UrDevUp",
    },
    description: {
      en: "Read UrDevUp's Privacy Policy to understand how we collect, use, and protect your personal information.",
      fr: "Consultez la politique de confidentialite d'UrDevUp pour comprendre comment nous collectons, utilisons et protegeons vos donnees personnelles.",
    },
    keywords: "privacy policy, personal data, cookies, urdevup",
    image: defaultImage,
    type: "article",
  },
  "/terms": {
    title: {
      en: "Terms of Service | UrDevUp",
      fr: "Conditions d'utilisation | UrDevUp",
    },
    description: {
      en: "Read the Terms of Service for using UrDevUp's website and digital services.",
      fr: "Consultez les conditions d'utilisation du site web et des services digitaux UrDevUp.",
    },
    keywords: "terms of service, legal terms, urdevup",
    image: defaultImage,
    type: "article",
  },
};

export const defaultSeo = routeSeo["/"];
