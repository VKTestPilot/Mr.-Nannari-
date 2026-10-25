import { site } from "../config/site";

/**
 * POSTs JSON to the configured endpoint. If no endpoint is configured yet
 * (placeholder phase) it simulates success so the UI flow can be reviewed.
 */
async function post(endpoint: string, payload: unknown): Promise<{ id: string }> {
  if (!endpoint) {
    await new Promise((r) => setTimeout(r, 600));
    return { id: `DEMO-${Date.now().toString(36).toUpperCase()}` };
  }
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

export const submitOrder = (payload: unknown) => post(site.orderEndpoint, payload);
export const submitContact = (payload: unknown) => post(site.contactEndpoint, payload);
