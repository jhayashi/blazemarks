/**
 * Ambient type declarations for non-standard Web APIs.
 *
 * - Periodic Background Sync: Chromium-only (Chrome, Edge)
 * - navigator.standalone: Safari-only (iOS)
 */

interface PeriodicSyncManager {
  register(tag: string, options?: { minInterval: number }): Promise<void>;
  unregister(tag: string): Promise<void>;
  getTags(): Promise<string[]>;
}

interface ServiceWorkerRegistration {
  readonly periodicSync?: PeriodicSyncManager;
}

interface Navigator {
  /** Safari-specific: true when running as an installed PWA */
  readonly standalone?: boolean;
}
