import { useEffect, useState } from 'react'
import { LanguageSelectOption } from './LanguageSelect'

interface UseLanguageSelectionProps {
  options: LanguageSelectOption[]
  autoselect?: boolean
  onChange: (value: string) => void
}

export const useLanguageSelection = ({ options, autoselect, onChange }: UseLanguageSelectionProps) => {
  const [selected, setSelected] = useState<LanguageSelectOption | null>(null)

  const getStoredLanguage = (): string | null => {
    try {
      return localStorage.getItem('lang')
    } catch {
      return null
    }
  }

  const getBrowserLanguage = (): string => {
    const browserLang = navigator.language || navigator.languages?.[0] || 'en'
    return browserLang.split('-')[0].toLowerCase()
  }

  const findOptionByLanguage = (langCode: string): LanguageSelectOption | null => {
    return options.find(o => o.value.toLowerCase() === langCode.toLowerCase()) ?? null
  }

  useEffect(() => {
    if (options.length > 0 && autoselect && !selected) {
      let defaultOption: LanguageSelectOption | null = null

      const storedLang = getStoredLanguage()
      if (storedLang) {
        defaultOption = findOptionByLanguage(storedLang)
      }

      if (!defaultOption) {
        defaultOption = findOptionByLanguage(getBrowserLanguage())
      }

      if (!defaultOption) {
        defaultOption = options[0]
      }

      if (defaultOption) {
        setSelected(defaultOption)
        onChange(defaultOption.value)
      }
    }
  }, [options, autoselect, selected, onChange])

  useEffect(() => {
    if (selected) {
      const updatedSelected = findOptionByLanguage(selected.value)
      if (
        updatedSelected &&
        (updatedSelected.label !== selected.label || updatedSelected.nativeLabel !== selected.nativeLabel)
      ) {
        setSelected(updatedSelected)
      }
    }
  }, [options, selected])

  const handleSelected = (option: LanguageSelectOption) => {
    setSelected(option)
  }

  return { selected, handleSelected }
}
