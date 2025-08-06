function checkURL() {
  const url = document.getElementById("url").value.trim().toLowerCase();
  const resultBox = document.getElementById("result");

  let score = 0;

  const suspiciousKeywords = [
    'login', 'verify', 'update', 'secure', 'account', 'webscr',
    'signin', 'wp', 'dropbox', 'bank', 'confirm', 'validate'
  ];

  const badTLDs = ['.tk', '.ga', '.ml', '.cf', '.gq', '.ru'];
  const shorteners = ['bit.ly', 'is.gd', 'tinyurl.com', 't.co', 'ow.ly'];
  const misspellings = ['paypa1', 'faceb00k', 'g00gle', 'micros0ft', 'app1e', 'amaz0n', 'netf1ix'];

  // 1. IP address detection
  if (/https?:\/\/\d{1,3}(\.\d{1,3}){3}/.test(url)) score += 2;

  // 2. Suspicious keywords
  if (suspiciousKeywords.some(word => url.includes(word))) score += 2;

  // 3. Bad TLDs
  if (badTLDs.some(tld => url.endsWith(tld))) score += 2;

  // 4. Misspelled brand names
  if (misspellings.some(miss => url.includes(miss))) score += 2;

  // 5. "@" symbol in URL
  if (url.includes("@")) score += 2;

  // 6. URL shortener services
  if (shorteners.some(service => url.includes(service))) score += 2;

  // Display result
  if (!url) {
    resultBox.textContent = "Please enter a URL.";
    resultBox.style.color = "#cccccc";
    return;
  }

  if (score >= 9) {
    resultBox.textContent = `🚨 High Risk [Score: ${score}/10]`;
    resultBox.style.color = "#ff4d4d";
  } else if (score >= 5) {
    resultBox.textContent = `⚠️ Suspicious [Score: ${score}/10]`;
    resultBox.style.color = "#ffc107";
  } else {
    resultBox.textContent = `✅ Safe [Score: ${score}/10]`;
    resultBox.style.color = "#00ff99";
  }

  // Optional: Save scan to local log (future idea)
  // localStorage.setItem(Date.now(), url + ' --> ' + resultBox.textContent);
}
