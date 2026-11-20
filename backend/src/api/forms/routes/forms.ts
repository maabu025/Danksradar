// Public form endpoints called by the website.
// auth: false means visitors don't need to log in; spam is stopped by the
// rate limit and Turnstile check inside the controller.
export default {
  routes: [
    { method: 'POST', path: '/forms/demo-request', handler: 'forms.demoRequest', config: { auth: false } },
    { method: 'POST', path: '/forms/quote-request', handler: 'forms.quoteRequest', config: { auth: false } },
    { method: 'POST', path: '/forms/contact', handler: 'forms.contact', config: { auth: false } },
  ],
};
