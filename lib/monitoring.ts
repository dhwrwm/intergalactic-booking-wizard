/**
 * Monitoring and logging utilities
 * In production, integrate with Sentry, LogRocket, or similar services
 */

interface ErrorContext {
  [key: string]: unknown;
}

/**
 * Log an error to monitoring service
 */
export function logError(error: Error, context?: ErrorContext): void {
  if (process.env.NODE_ENV === "production") {
    // TODO: Send to Sentry
    // Sentry.captureException(error, { extra: context });
    console.error("Error logged:", error.message, context);
  } else {
    console.error("Error:", error, context);
  }
}

/**
 * Log a warning to monitoring service
 */
export function logWarning(message: string, context?: ErrorContext): void {
  if (process.env.NODE_ENV === "production") {
    // TODO: Send to monitoring service
    console.warn("Warning:", message, context);
  } else {
    console.warn("Warning:", message, context);
  }
}

/**
 * Log an info message
 */
export function logInfo(message: string, context?: ErrorContext): void {
  if (process.env.NODE_ENV === "development") {
    console.info("Info:", message, context);
  }
}

/**
 * Track a user event (analytics)
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>
): void {
  if (process.env.NODE_ENV === "production") {
    // TODO: Send to analytics service (Google Analytics, Mixpanel, etc.)
    // analytics.track(eventName, properties);
    console.log("Event tracked:", eventName, properties);
  } else {
    console.log("Event:", eventName, properties);
  }
}

/**
 * Track page view
 */
export function trackPageView(pageName: string): void {
  if (process.env.NODE_ENV === "production") {
    // TODO: Send to analytics service
    console.log("Page view:", pageName);
  }
}

/**
 * Set user context for error tracking
 */
export function setUserContext(userId: string, email?: string): void {
  if (process.env.NODE_ENV === "production") {
    // TODO: Set user context in Sentry
    // Sentry.setUser({ id: userId, email });
    console.log("User context set:", userId, email);
  }
}
