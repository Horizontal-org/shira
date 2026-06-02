export type AppDetails = {
  id: number;
  name: string;
  type: string;
};

export const previewAppNames: Record<string, AppDetails> = {
  dating_app: { id: 5, name: "Dating App", type: "messaging" },
  facebook_messenger: { id: 4, name: "Messenger", type: "messaging" },
  gmail: { id: 1, name: "Gmail", type: "email" },
  messenger: { id: 4, name: "Messenger", type: "messaging" },
  outlook: { id: 6, name: "Outlook", type: "email" },
  sms: { id: 3, name: "SMS", type: "messaging" },
  whatsapp: { id: 2, name: "Whatsapp", type: "messaging" },
};

export const normalizePreviewAppName = (value: string) => {
  const key = value.trim().toLowerCase().replace(/\s+/g, "_");
  return previewAppNames[key]?.name ?? value;
};

export class AppOption {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly type: string,
  ) { }
}

export function getAppsByType(type: string): AppOption[] {
  const apps = Object.values(previewAppNames).filter((app) => app.type === type);
  const uniqueApps = Array.from(new Map(apps.map((app) => [app.id, app])).values());

  return uniqueApps.map((app) => new AppOption(app.id, app.name, app.type));
}
