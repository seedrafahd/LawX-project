import { ActiveSessionsSection } from "./ActiveSessionsSection";
import { AuthenticationPreferencesSection } from "./AuthPrefSection";
import { GlobalSessionActionSection } from "./GlobalSessionActionSection";
import { SecuritySettingsOverviewSection } from "./SecuritySettingsSection";

export const SettingsPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col gap-4 p-4 sm:p-6 md:p-8 bg-variable-collection-SCREEN-BG-color">
      <ActiveSessionsSection />

      <AuthenticationPreferencesSection />

      <SecuritySettingsOverviewSection />

      <GlobalSessionActionSection />
    </div>
  );
};
