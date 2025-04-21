import { resources } from "@/shared/i18n/locales";

type SupportedLocales = keyof typeof resources;
type Namespace = keyof (typeof resources)["en"];

export type { SupportedLocales, Namespace };
