import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { SmallSelect } from "@shira/ui";
import { LanguageIcon } from "@shira/ui";
import { LanguageOption } from "../Columns";
import { useTranslation } from "react-i18next";

type Props = {
  valueId?: number;
  options: LanguageOption[];
  onChange: (languageId: number) => void;
  placeholder?: string;
  initiallyShowPlaceholder?: boolean;
  fixedLeftIcon?: React.ReactNode;
};

export const SelectLanguage: FunctionComponent<Props> = ({
  valueId,
  options,
  onChange,
  initiallyShowPlaceholder,
}) => {
  const { t } = useTranslation();
  const languageIcon = <LanguageIcon />;
  const [showPlaceholder, setShowPlaceholder] = useState(initiallyShowPlaceholder);

  useEffect(() => {
    if (!initiallyShowPlaceholder) return;
    setShowPlaceholder(true);
  }, [initiallyShowPlaceholder]);

  const selectOptions = useMemo(
    () =>
      options.map((o) => {
        const key = o.name.toLowerCase();
        const translated = t(`select_languages.${key}`, { defaultValue: o.name });
        return {
          label: translated,
          labelEnglish: o.name,
          value: String(o.id),
          leftIcon: null
        };
      }),
    [options, t]
  );

  const placeholder = t("question_library.columns.language.title");

  return (
    <SmallSelect
      aria-label="language"
      value={showPlaceholder ? "" : (valueId ? String(valueId) : "")}
      options={selectOptions}
      initialPlaceholder={placeholder}
      placeholderLeftIcon={languageIcon}
      fixedLeftIcon={languageIcon}
      onChange={(picked) => {
        setShowPlaceholder(false);
        onChange(Number(picked));
      }}
    />
  );
};