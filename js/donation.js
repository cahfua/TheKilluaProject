const API_URL =
  "https://api.exchangerate.host/latest?base=WST&symbols=USD,NZD,AUD";

/**
 * Format a number into a currency string
 */
function formatCurrency(value, currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(value);
}

async function loadConversionRates() {
  const statusEl = document.getElementById("conversion-status");
  const tiers = document.querySelectorAll(".donation-tier[data-amount-wst]");

  if (!tiers.length) return;

  if (statusEl) {
    statusEl.textContent = "Loading live currency conversion rates…";
  }

  try {
    const resp = await fetch(API_URL);
    if (!resp.ok) throw new Error("Failed to fetch rates");

    const data = await resp.json();
    const rates = data.rates || {};

    const usdRate = rates.USD;
    const nzdRate = rates.NZD;
    const audRate = rates.AUD;

    if (!usdRate || !nzdRate || !audRate) {
      throw new Error("Missing one or more rates");
    }

    // For each tier: WST → USD/NZD/AUD
    tiers.forEach((tier) => {
      const amountWST = parseFloat(tier.dataset.amountWst);
      if (!amountWST) return;

      const usdEl = tier.querySelector('[data-currency="USD"]');
      const nzdEl = tier.querySelector('[data-currency="NZD"]');
      const audEl = tier.querySelector('[data-currency="AUD"]');

      if (usdEl) {
        usdEl.textContent = formatCurrency(amountWST * usdRate, "USD");
      }
      if (nzdEl) {
        nzdEl.textContent = formatCurrency(amountWST * nzdRate, "NZD");
      }
      if (audEl) {
        audEl.textContent = formatCurrency(amountWST * audRate, "AUD");
      }
    });

    if (statusEl) {
      statusEl.textContent = "Rates loaded (powered by exchangerate.host).";
    }
  } catch (err) {
    console.error("Error loading conversion rates:", err);
    if (statusEl) {
      statusEl.textContent =
        "Could not load live conversion rates right now. Amounts are shown in WST only.";
    }

    const spans = document.querySelectorAll(".tier-converted span[data-currency]");
    spans.forEach((span) => {
      span.textContent = "N/A";
    });
  }
}

document.addEventListener("DOMContentLoaded", loadConversionRates);
