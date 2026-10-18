// Sends a form to the shop's inbox through Web3Forms.
// The inbox is whichever email the VITE_WEB3FORMS_ACCESS_KEY was created for.
export async function submitToWeb3Forms(fields: Record<string, string>): Promise<void> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    throw new Error('Online submissions are not set up yet. Please call or email us directly.');
  }

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
