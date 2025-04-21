import { Button } from "@/lib/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/components/ui/dropdown-menu";
// import { LanguagesIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const LANGUAGES: Record<string, { nativeName: string }> = {
    en: { nativeName: "English" },
    fr: { nativeName: "Français" },
  };

  const languageKeys = Object.keys(LANGUAGES) as Array<keyof typeof LANGUAGES>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {/* <LanguagesIcon className="h-[1.2rem] w-[1.2rem] transition-all" /> */}
          <p>
            <abbr
              className="no-underline"
              title={LANGUAGES[i18n.resolvedLanguage ?? ""].nativeName}
            >
              {i18n.resolvedLanguage?.toUpperCase()}
            </abbr>
          </p>
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languageKeys.map((language) => (
          <DropdownMenuItem
            key={language}
            onClick={() => i18n.changeLanguage(language)}
          >
            {LANGUAGES[language].nativeName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
