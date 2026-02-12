const FEATURE_FLAG_ENV_MAP: Record<string, string> = {
  "learner_bulk_invite": "REACT_APP_FLAG_LEARNER_BULK_INVITE"
};

export const isFeatureEnabled = (flagName: string) => {
  if (!Object.prototype.hasOwnProperty.call(FEATURE_FLAG_ENV_MAP, flagName)) {
    return false;
  }

  const envKey = FEATURE_FLAG_ENV_MAP[flagName];
  const envValue = (process.env as Record<string, string | undefined>)[envKey];
  return envValue?.toLowerCase() === "true";
};
