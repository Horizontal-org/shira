import { FunctionComponent, useEffect, useState } from "react";
import { SmallSelect, styled } from "@horizontal-org/shira-ui";
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
  initiallyShowPlaceholder,
}) => {
  const { t } = useTranslation();
  const [showPlaceholder, setShowPlaceholder] = useState(
    Boolean(initiallyShowPlaceholder && !valueId),
  );

  useEffect(() => {
    setShowPlaceholder(Boolean(initiallyShowPlaceholder && !valueId));
  }, [initiallyShowPlaceholder, valueId]);

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
    <SelectAppWrapper>
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
    </SelectAppWrapper>
  );
};

const SelectAppWrapper = styled("div")`
  max-width: 178px;

  & > div {
    width: 100%;
  }

  & [role="combobox"] {
    min-width: 0;
  }

  & [role="combobox"] > div {
    min-width: 0;
    overflow: hidden;
  }

  & [role="combobox"] span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
