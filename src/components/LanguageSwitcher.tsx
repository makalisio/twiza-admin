
import React from 'react';
import { Button } from '@/components/ui/button';
import { languages, useI18nStore, Language } from '@/utils/i18n';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { GlobeIcon } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useI18nStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
          <GlobeIcon className="h-4 w-4" />
          <span className="sr-only">Changer de langue</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([code, name]) => (
          <DropdownMenuItem 
            key={code}
            onClick={() => setLanguage(code as Language)}
            className={language === code ? "bg-secondary" : ""}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
