const API_URL =
  "https://api.exchangerate.host/latest?symbols=WST,USD,NZD,AUD";

/**
 * Format a number into a currency string
 */
function formatCurrency(value, currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(value);
}

function setAllNA() {
  const spans = document.querySelectorAll(
    ".tier-converted span[data-currency]"
  );
  spans.forEach((span) => {
    span.textContent = "N/A";
  });
}

async function loadConversionRates() {
  const statusEl = document.getElementById("conversion-status");
  const tiers = document.querySelectorAll(
    ".donation-tier[data-amount-wst]"
  );

  if (!tiers.length) return;

  if (statusEl) {
    statusEl.textContent = "Loading live currency conversion rates…";
  }

  try {
    const resp = await fetch(API_URL);

    if (!resp.ok) {
      if (statusEl) {
        statusEl.textContent =
          "Could not load live conversion rates right now. Amounts are shown in WST only.";
      }
      setAllNA();
      return;
    }

    const data = await resp.json();
    const rates = data.rates || {};

    const usd = rates.USD;
    const nzd = rates.NZD;
    const aud = rates.AUD;
    const wst = rates.WST;

    if (!usd || !nzd || !aud || !wst) {
      if (statusEl) {
        statusEl.textContent =
          "Could not load live conversion rates right now. Amounts are shown in WST only.";
      }
      setAllNA();
      return;
    }

    // 1 WST in each currency, using EUR-based rates:
    const usdPerWst = usd / wst;
    const nzdPerWst = nzd / wst;
    const audPerWst = aud / wst;

    tiers.forEach((tier) => {
      const amountWST = parseFloat(tier.dataset.amountWst);
      if (!amountWST) return;

      const usdEl = tier.querySelector('[data-currency="USD"]');
      const nzdEl = tier.querySelector('[data-currency="NZD"]');
      const audEl = tier.querySelector('[data-currency="AUD"]');

      if (usdEl) {
        usdEl.textContent = formatCurrency(amountWST * usdPerWst, "USD");
      }
      if (nzdEl) {
        nzdEl.textContent = formatCurrency(amountWST * nzdPerWst, "NZD");
      }
      if (audEl) {
        audEl.textContent = formatCurrency(amountWST * audPerWst, "AUD");
      }
    });

    if (statusEl) {
      statusEl.textContent = "Rates loaded (powered by exchangerate.host).";
    }
  } catch {
    if (statusEl) {
      statusEl.textContent =
        "Could not load live conversion rates right now. Amounts are shown in WST only.";
    }
    setAllNA();
  }
}

document.addEventListener("DOMContentLoaded", loadConversionRates);