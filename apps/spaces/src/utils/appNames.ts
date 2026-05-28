export const previewAppNames: Record<string, string> = {
  dating_app: "Dating App",
  facebook_messenger: "Messenger",
  gmail: "Gmail",
  messenger: "Messenger",
  outlook: "Outlook",
  sms: "SMS",
  whatsapp: "Whatsapp",
};

export const normalizePreviewAppName = (value: string) => {
  const key = value.trim().toLowerCase().replace(/\s+/g, "_");
  return previewAppNames[key] ?? value;
};
