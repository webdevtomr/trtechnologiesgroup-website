for (const form of document.querySelectorAll('.enquiry-form')) {
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity() || form.dataset.sending) return;
    const button = form.querySelector('button');
    const status = form.querySelector('.form-status');
    form.dataset.sending = 'true'; button.disabled = true;
    status.textContent = 'Sending your enquiry…'; status.dataset.error = 'false';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(form.action, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form))),signal:controller.signal});
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Your enquiry could not be sent. Please try again. Your details are still here.');
      status.textContent = result.message;
      form.reset();
    } catch (error) {
      status.dataset.error = 'true';
      status.textContent = error.name === 'AbortError' ? 'The request timed out. Your details are still here; please try again.' : error.message;
    } finally {clearTimeout(timeout); delete form.dataset.sending; button.disabled = false;}
  });
}
