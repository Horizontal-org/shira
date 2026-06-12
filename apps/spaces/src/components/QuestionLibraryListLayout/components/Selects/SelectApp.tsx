import { FunctionComponent, useEffect, useState } from "react";
import { SmallSelect } from "@horizontal-org/shira-ui";
import { appIcons, appTypesIcons } from "../../../../utils/appIcons";
import { AppOption } from "../Columns";
import { useTranslation } from "react-i18next";

type Props = {
  valueId?: number;
  options: AppOption[];
  currentType?: string;
  onChange: (appId: number) => void;
  initiallyShowPlaceholder?: boolean;
};

export const SelectApp: FunctionComponent<Props> = ({
  valueId,
  options,
  currentType,
  onChange,
  initiallyShowPlaceholder
}) => {
  const { t } = useTranslation();
  const [showPlaceholder, setShowPlaceholder] = useState(initiallyShowPlaceholder);

  useEffect(() => {
    if (!initiallyShowPlaceholder) return;
  }, [valueId, initiallyShowPlaceholder]);

  const filteredOptions = currentType
    ? options.filter((a) => a.type === currentType)
    : options;

  const selectOptions = filteredOptions.map((a) => ({
    label: a.name,
    labelEnglish: a.name,
    value: String(a.id),
    leftIcon: appIcons[a.name.toLowerCase()],
  }));

  const placeholder = t(`question_library.columns.app.${currentType}_type`);
  const placeholderIcon = currentType && appTypesIcons[currentType];

  return (
    <SmallSelect
      aria-label="app"
      value={showPlaceholder ? "" : (valueId ? String(valueId) : "")}
      options={selectOptions}
      initialPlaceholder={placeholder}
      placeholderLeftIcon={placeholderIcon}
      onChange={(picked) => {
        setShowPlaceholder(false);
        onChange(Number(picked));
      }}
    />
  );
};
