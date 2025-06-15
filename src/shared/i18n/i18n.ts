import * as i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LngDetector from "i18next-browser-languagedetector";
import { resources } from "@/shared/i18n/locales/index";
import { SupportedLocales, Namespace } from "@/shared/types/Translations";

const nameSpaces = Object.keys(resources.en) as Namespace[];
const supportedLngs = Object.keys(resources) as SupportedLocales[];

i18next
  .use(LngDetector) // https://github.com/i18next/i18next-browser-languageDetector
  .use(initReactI18next) // https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    resources,
    fallbackLng: "en",
    supportedLngs: supportedLngs,
    load: "languageOnly",
    ns: nameSpaces,
    defaultNS: "common",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18next;
