export type AppDetails = {
  name: string;
  type: string;
};

export const previewAppNames: Record<string, AppDetails> = {
  gmail: { name: "Gmail", type: "email" },
  whatsapp: { name: "WhatsApp", type: "messaging" },
  sms: { name: "SMS", type: "messaging" },
  facebook_messenger: { name: "Messenger", type: "messaging" },
  messenger: { name: "Messenger", type: "messaging" },
  dating_app: { name: "Dating App", type: "messaging" },
  outlook: { name: "Outlook", type: "email" },
};

export const normalizePreviewAppName = (value: string) => {
  const key = value.trim().toLowerCase().replace(/\s+/g, "_");
  return previewAppNames[key]?.name ?? value;
};

export function getAppsByType(type: string): AppDetails[] {
  const apps = Object.values(previewAppNames).filter((app) => app.type === type);
  const uniqueApps = Array.from(new Map(apps.map((app) => [app.name, app])).values());

  return uniqueApps;
}

export const getAppsByTypeAndValue = (
  type: string,
  value: string,
) => {
  const normalizedValue = normalizePreviewAppName(value);
  return getAppsByType(type).find((appOption) => appOption.name === normalizedValue);
};
