import { BUSINESS } from '../data/business';

// Sends a form to the shop's inbox through Web3Forms.
// The inbox is whichever email this access key was created for.
// Web3Forms keys are public by design (they always end up in the page), so it lives here.
const WEB3FORMS_ACCESS_KEY = 'd5683ef0-75e8-4719-9574-0dddca02c49d';

// Give up after this long so a dead connection never leaves "Sending…" on screen forever.
const TIMEOUT_MS = 20_000;
const CALL_US = `or call Robert at ${BUSINESS.phoneDisplay}`;

export async function submitToWeb3Forms(fields: Record<string, string>): Promise<void> {
  const accessKey = WEB3FORMS_ACCESS_KEY;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      // replyto lets the shop hit Reply and answer the customer directly.
      // botcheck is Web3Forms' spam trap; real visitors never fill it.
      body: JSON.stringify({ access_key: accessKey, ...(fields.email ? { replyto: fields.email } : {}), botcheck: '', ...fields }),
      signal: controller.signal,
    });
  } catch {
    clearTimeout(timer);
    throw new Error(
      controller.signal.aborted
        ? `Sending is taking too long. Check your connection and try again, ${CALL_US}.`
        : `We couldn’t reach the server. Check your connection and try again, ${CALL_US}.`,
    );
  }

  // A server error page isn't JSON, so don't let that turn into a confusing "connection" message.
  const result: { success?: boolean; message?: string } = await response.json().catch(() => ({}));
  clearTimeout(timer);
  if (!response.ok || !result.success) {
    throw new Error(`Your request didn’t go through${result.message ? ` (${result.message})` : ''}. Please try again, ${CALL_US}.`);
  }
}
