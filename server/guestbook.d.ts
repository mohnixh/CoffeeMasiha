type GuestbookConfig = { token?: string; repository?: string; author?: string; origin?: string };
export function createGuestbookHandler(config: GuestbookConfig, dependencies?: { fetch?: typeof fetch; now?: () => number }): (request: Request) => Promise<Response>;
