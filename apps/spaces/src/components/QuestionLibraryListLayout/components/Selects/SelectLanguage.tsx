import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { SmallSelect } from "@shira/ui";
import { LanguageIcon } from "@shira/ui";
import { LanguageOption } from "../Columns";

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
  placeholder = "Language",
}) => {
  const languageIcon = <LanguageIcon />;
  const [showPlaceholder, setShowPlaceholder] = useState(initiallyShowPlaceholder);

  useEffect(() => {
    if (!initiallyShowPlaceholder) return;
  }, [valueId, initiallyShowPlaceholder]);

  const selectOptions = useMemo(
    () =>
      options.map((o) => ({
        label: o.name,
        labelEnglish: o.name,
        value: String(o.id),
        leftIcon: null,
      })),
    [options]
  );

  return (
    <SmallSelect
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