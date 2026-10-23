// Sends a form to the shop's inbox through Web3Forms.
// The inbox is whichever email this access key was created for.
// Web3Forms keys are public by design (they always end up in the page), so it lives here.
const WEB3FORMS_ACCESS_KEY = 'd5683ef0-75e8-4719-9574-0dddca02c49d';

export async function submitToWeb3Forms(fields: Record<string, string>): Promise<void> {
  const accessKey = WEB3FORMS_ACCESS_KEY;

  let result: { success?: boolean; message?: string };
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      // replyto lets the shop hit Reply and answer the customer directly.
      // botcheck is Web3Forms' spam trap; real visitors never fill it.
      body: JSON.stringify({ access_key: accessKey, ...(fields.email ? { replyto: fields.email } : {}), botcheck: '', ...fields }),
    });
    result = await response.json();
  } catch {
    throw new Error('We couldn’t reach the server. Check your connection and try again.');
  }

  if (!result.success) {
    throw new Error(result.message || 'Submission failed. Please try again.');
  }
}
