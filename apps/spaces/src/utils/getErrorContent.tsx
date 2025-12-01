import { ReactNode } from "react";
import { Trans } from "react-i18next";
import i18n from "../language/i18n";

export const getErrorContent = (fallbackKey: string, errorKey?: string): string => {
  const base = "error_messages";
  const specificKey = `${base}.${errorKey}`;
  const fallbackFullKey = `${base}.${fallbackKey}`;

  return specificKey && i18n.exists(`${base}.${errorKey}`) ? specificKey : fallbackFullKey;
};

export const getContactUsLayout = (finalKey: string): ReactNode => {
  return <Trans
    i18nKey={finalKey}
    components={{
      1: (
        <a
          href="mailto:contact@wearehorizontal.org"
          target="_blank"
          rel="noopener noreferrer" />
      )
    }} />;
}

