import { Banner } from "@horizontal-org/shira-ui";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

interface Props {}

export const MobileResponsivenessBanner: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  return (
    <Banner  
      label={t('banner.label')}
      message={t('banner.message')}
      brand="primary"
    />
  )
}