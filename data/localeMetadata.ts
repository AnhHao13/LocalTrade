import type { Locale } from "@/i18n.config";

type Metadata = {
  [key in Locale]: string;
};

export const maintitle: Metadata = {
  en: "E-Commerce Store",
  vi: "Cửa Hàng Thương Mại Điện Tử",
  fr: "Boutique E-Commerce",
};

export const maindescription: Metadata = {
  en: "Your one-stop shop for amazing products",
  vi: "Nơi mua sắm trực tuyến tuyệt vời nhất",
  fr: "Votre destination unique pour des produits exceptionnels",
};
