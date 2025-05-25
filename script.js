let isEncrypt = true;

const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const keyInput = document.getElementById('key');

document.getElementById('encryptBtn').onclick = () => {
  isEncrypt = true;
  toggleMode();
};

document.getElementById('decryptBtn').onclick = () => {
  isEncrypt = false;
  toggleMode();
};

document.getElementById('themeToggle').onclick = () => {
  document.body.classList.toggle('dark');
  document.getElementById('themeToggle').textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
};

function toggleMode() {
  document.getElementById('encryptBtn').classList.toggle('active', isEncrypt);
  document.getElementById('decryptBtn').classList.toggle('active', !isEncrypt);
  inputText.value = '';
  outputText.value = '';
  keyInput.value = '';
}

function vernamEncrypt(text, key) {
  if (text.length !== key.length) {
    alert("Key cant be empty.");
    return '';
  }
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i));
  }
  return btoa(result);
}

function vernamDecrypt(text, key) {
  try {
    const decoded = atob(text);
    if (decoded.length !== key.length) {
      alert("Key cant be empty.");
      return '';
    }
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      result += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i));
    }
    return result;
  } catch {
    alert("Decryption failed. Check your input and key.");
    return '';
  }
}

function processText() {
  const text = inputText.value;
  const key = keyInput.value;
  const result = isEncrypt ? vernamEncrypt(text, key) : vernamDecrypt(text, key);
  outputText.value = result;
}

function resetAll() {
  inputText.value = '';
  outputText.value = '';
  keyInput.value = '';
}

function copyOutput() {
  outputText.select();
  document.execCommand('copy');
  alert("Copied to clipboard!");
}
