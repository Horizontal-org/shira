import { useEffect, useState } from 'react';

export interface OptionInterface {
  label: string;
  labelEnglish: string;
  value: string;
}

interface UseLanguageSelectionProps {
  options: OptionInterface[];
  autoselect?: boolean;
  onChange: (value: string) => void;
}

export const useLanguageSelection = ({ 
  options, 
  autoselect, 
  onChange 
}: UseLanguageSelectionProps) => {
  const [selected, setSelected] = useState<OptionInterface | null>(null);

  const getStoredLanguage = (): string | null => {
    try {
      return localStorage.getItem('lang');
    } catch (error) {
      return null;
    }
  };

  const getBrowserLanguage = (): string => {
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';
    
    return browserLang.split('-')[0].toLowerCase();
  };

  const findOptionByLanguage = (langCode: string): OptionInterface | null => {
    const exactMatch = options.find(option => 
      option.value.toLowerCase() === langCode.toLowerCase()
    );
    if (exactMatch) return exactMatch;

    const partialMatch = options.find(option => 
      option.value.toLowerCase().startsWith(langCode.toLowerCase())
    );
    if (partialMatch) return partialMatch;

    const englishMatch = options.find(option => 
      option.labelEnglish.toLowerCase().includes(langCode.toLowerCase())
    );
    if (englishMatch) return englishMatch;

    return null;
  };

  useEffect(() => {
    if (options.length > 0 && autoselect && !selected) {
      let defaultOption: OptionInterface | null = null;

      // Check localStorage first
      const storedLang = getStoredLanguage();
      if (storedLang) {
        defaultOption = findOptionByLanguage(storedLang);
      }

      if (!defaultOption) {
        const browserLang = getBrowserLanguage();
        defaultOption = findOptionByLanguage(browserLang);
      }
      
      if (!defaultOption) {
        defaultOption = options[0];
      }

      if (defaultOption) {
        setSelected(defaultOption);
        onChange(defaultOption.value);
      }
    }
  }, [options, autoselect, selected, onChange]);

  const handleSelected = (option: OptionInterface) => {
    setSelected(option);
  };

  return {
    selected,
    handleSelected
  };
};