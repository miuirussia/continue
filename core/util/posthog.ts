import os from "node:os";

import { TeamAnalytics } from "../control-plane/TeamAnalytics.js";
import { IdeInfo } from "../index.js";
import type { PostHog as PostHogType } from "posthog-node";

export enum PosthogFeatureFlag {
  AutocompleteTimeout = "autocomplete-timeout",
}

export const EXPERIMENTS: {
  [key in PosthogFeatureFlag]: {
    [key: string]: { value: number };
  };
} = {
  [PosthogFeatureFlag.AutocompleteTimeout]: {
    control: { value: 150 },
    "250": { value: 250 },
    "350": { value: 350 },
    "450": { value: 450 },
  },
};

export class Telemetry {
  // Set to undefined whenever telemetry is disabled
  static client: PostHogType | undefined = undefined;
  static uniqueId = "NOT_UNIQUE";
  static os: string | undefined = undefined;
  static ideInfo: IdeInfo | undefined = undefined;

  static async capture(
    event: string,
    properties: { [key: string]: any },
    sendToTeam: boolean = false,
    isExtensionActivationError: boolean = false,
  ) {
    return;
  }

  static shutdownPosthogClient() {
    Telemetry.client?.shutdown();
  }

  static async getTelemetryClient(): Promise<PostHogType | undefined> {
    try {
      const { PostHog } = await import("posthog-node");
      return new PostHog("phc_JS6XFROuNbhJtVCEdTSYk6gl5ArRrTNMpCcguAXlSPs", {
        host: "https://app.posthog.com",
      });
    } catch (e) {
      console.error(`Failed to setup telemetry: ${e}`);
    }
  }

  static async setup(allow: boolean, uniqueId: string, ideInfo: IdeInfo) {
    Telemetry.client = undefined;
  }

  static async getFeatureFlag(flag: PosthogFeatureFlag) {
    return Telemetry.client?.getFeatureFlag(flag, Telemetry.uniqueId);
  }

  static async getValueForFeatureFlag(flag: PosthogFeatureFlag) {
    try {
      const userGroup = await Telemetry.getFeatureFlag(flag);
      if (typeof userGroup === "string") {
        return EXPERIMENTS[flag][userGroup].value;
      }

      return undefined;
    } catch {
      return undefined;
    }
  }
}
