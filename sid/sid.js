(function () {
  'use strict';

  const sidInput = document.getElementById('sidInput');
  const hexOutput = document.getElementById('hexOutput');
  const statusEl = document.getElementById('status');
  const sidLengthEl = document.getElementById('sidLength');
  const derLengthEl = document.getElementById('derLength');

  function setStatus(message, type = '') {
    statusEl.textContent = message;
    statusEl.className = `tool-status ${type}`.trim();
  }

  function looksLikeSid(value) {
    return /^S-\d+(?:-\d+)+$/i.test(value.trim());
  }

  function derLengthBytes(length) {
    if (!Number.isInteger(length) || length < 0) {
      throw new Error('Invalid DER length.');
    }
    if (length < 128) {
      return [length];
    }
    const bytes = [];
    let value = length;
    while (value > 0) {
      bytes.unshift(value & 0xff);
      value = Math.floor(value / 256);
    }
    return [0x80 | bytes.length, ...bytes];
  }

  function tlv(tag, valueBytes) {
    return [tag, ...derLengthBytes(valueBytes.length), ...valueBytes];
  }

  function bytesToHex(bytes) {
    return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function encodeSidExtensionHex(sid) {
    const sidBytes = Array.from(new TextEncoder().encode(sid));
    const oidValueBytes = [0x2b, 0x06, 0x01, 0x04, 0x01, 0x82, 0x37, 0x19, 0x02, 0x01];
    const oidTlv = tlv(0x06, oidValueBytes);
    const octet = tlv(0x04, sidBytes);
    const innerA0 = tlv(0xA0, octet);
    const outerA0 = tlv(0xA0, [...oidTlv, ...innerA0]);
    const sequence = tlv(0x30, outerA0);
    return {
      hex: bytesToHex(sequence),
      sidByteLength: sidBytes.length,
      derByteLength: sequence.length
    };
  }

  function generate() {
    const sid = sidInput.value.trim();

    if (!sid) {
      hexOutput.value = '';
      sidLengthEl.textContent = '0';
      derLengthEl.textContent = '0';
      setStatus('Enter a SID.', 'warn');
      return;
    }

    if (!looksLikeSid(sid)) {
      hexOutput.value = '';
      sidLengthEl.textContent = '0';
      derLengthEl.textContent = '0';
      setStatus('That does not look like a SID in S-1-... format.', 'err');
      return;
    }

    const result = encodeSidExtensionHex(sid);
    hexOutput.value = result.hex;
    sidLengthEl.textContent = `${result.sidByteLength} bytes`;
    derLengthEl.textContent = `${result.derByteLength} bytes`;
    setStatus('DER hex generated successfully.', 'ok');
  }

  async function copyHex() {
    const value = hexOutput.value.trim();

    if (!value) {
      setStatus('Nothing to copy yet.', 'warn');
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setStatus('Hex copied to clipboard.', 'ok');
    } catch {
      hexOutput.focus();
      hexOutput.select();
      setStatus('Clipboard access failed. Output selected for manual copy.', 'warn');
    }
  }

  function clearAll() {
    sidInput.value = '';
    hexOutput.value = '';
    sidLengthEl.textContent = '0';
    derLengthEl.textContent = '0';
    setStatus('');
    sidInput.focus();
  }

  const SAMPLE_SID = 'S-1-5-21-1111111111-2222222222-3333333333-1234';

  function loadSample() {
    sidInput.value = SAMPLE_SID;
    generate();
  }

  document.getElementById('generateBtn').addEventListener('click', generate);
  document.getElementById('sampleBtn').addEventListener('click', loadSample);
  document.getElementById('copyBtn').addEventListener('click', copyHex);
  document.getElementById('clearBtn').addEventListener('click', clearAll);

  sidInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      generate();
    }
  });
})();
