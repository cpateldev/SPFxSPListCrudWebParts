import { SPFI } from "@pnp/sp";

export interface IPnpJsReactCrudProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  sp: SPFI;
}
