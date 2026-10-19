(function () {
  const storageKey = 'preferred-site-language';
  const dismissedKey = 'language-suggestion-dismissed';
  const currentLanguage = document.documentElement.lang.toLowerCase().startsWith('fa') ? 'fa' : 'en';
  const browserLanguages = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language || ''];
  const browserLanguage = browserLanguages
    .map((language) => language.toLowerCase().split('-')[0])
    .find((language) => language === 'fa' || language === 'en');
  const preferredLanguage = browserLanguage || (currentLanguage === 'fa' ? 'en' : null);

  document.querySelectorAll('a[hreflang="fa"], a[hreflang="en"]').forEach((link) => {
    link.addEventListener('click', () => {
      try {
        localStorage.setItem(storageKey, link.hreflang.toLowerCase().startsWith('fa') ? 'fa' : 'en');
        localStorage.removeItem(dismissedKey);
      } catch (_) {
        // Language switching still works when browser storage is unavailable.
      }
    });
  });

  let savedLanguage = null;
  let dismissed = false;
  try {
    savedLanguage = localStorage.getItem(storageKey);
    dismissed = localStorage.getItem(dismissedKey) === '1';
  } catch (_) {
    // The prompt can still work when browser storage is unavailable.
  }
  if (savedLanguage || dismissed || !preferredLanguage || preferredLanguage === currentLanguage) return;

  const languageLink = document.querySelector('a[hreflang="' + preferredLanguage + '"]');
  if (!languageLink) return;

  const prompt = document.createElement('aside');
  prompt.className = 'language-suggestion';
  prompt.lang = preferredLanguage;
  prompt.dir = preferredLanguage === 'fa' ? 'rtl' : 'ltr';
  prompt.setAttribute('aria-label', preferredLanguage === 'fa' ? 'پیشنهاد زبان' : 'Language suggestion');

  const message = document.createElement('p');
  message.textContent = preferredLanguage === 'fa'
    ? 'به نظر می‌رسد زبان مرورگرتان فارسی است. نسخهٔ فارسی را ببینید؟'
    : 'Your browser appears to use English. Would you like to view the English version?';

  const action = document.createElement('a');
  action.href = languageLink.href;
  action.hreflang = preferredLanguage;
  action.className = 'language-suggestion__action';
  action.textContent = preferredLanguage === 'fa' ? 'نمایش نسخهٔ فارسی' : 'View English version';
  action.addEventListener('click', () => {
    try { localStorage.setItem(storageKey, preferredLanguage); } catch (_) { /* Ignore unavailable storage. */ }
  });

  const dismiss = document.createElement('button');
  dismiss.type = 'button';
  dismiss.className = 'language-suggestion__dismiss';
  dismiss.setAttribute('aria-label', preferredLanguage === 'fa' ? 'بستن پیشنهاد زبان' : 'Dismiss language suggestion');
  dismiss.textContent = '×';
  dismiss.addEventListener('click', () => {
    try { localStorage.setItem(dismissedKey, '1'); } catch (_) { /* Ignore unavailable storage. */ }
    prompt.remove();
  });

  prompt.append(message, action, dismiss);
  document.body.append(prompt);
})();
