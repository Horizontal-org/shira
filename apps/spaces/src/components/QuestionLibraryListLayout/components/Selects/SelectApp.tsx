import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { SmallSelect } from "@shira/ui";
import { appIcons, appTypesIcons } from "../AppIcons/appIcons";
import { AppOption } from "../Columns";

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
  const [showPlaceholder, setShowPlaceholder] = useState(initiallyShowPlaceholder);

  useEffect(() => {
    if (!initiallyShowPlaceholder) return;
  }, [valueId, initiallyShowPlaceholder]);

  const selectOptions = useMemo(
    () =>
      options.map((a) => ({
        label: a.name,
        labelEnglish: a.name,
        value: String(a.id),
        leftIcon: appIcons[a.name.toLowerCase()],
      })),
    [options]
  );

  const placeholder = currentType && `${currentType.charAt(0).toUpperCase()}${currentType.slice(1)} app`;
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
