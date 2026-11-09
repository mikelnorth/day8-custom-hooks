// Plain helper functions (not hooks: they use no React features at all).
// Workouts are always SAVED in kg. The kg/lb switch only changes what we show.

const KG_PER_LB = 0.45359237

export function lbToKg(pounds) {
  return pounds * KG_PER_LB
}

export function kgToLb(kilograms) {
  return kilograms / KG_PER_LB
}

// Turns a saved kg number into the text we show, e.g. "102.5 kg" or "226 lb".
export function formatWeight(kilograms, isPounds) {
  const amount = isPounds ? kgToLb(kilograms) : kilograms
  const rounded = Math.round(amount * 10) / 10
  return `${rounded.toLocaleString()} ${isPounds ? "lb" : "kg"}`
}

// Picks a bumper-plate color for a lift based on its weight (kg).
export function plateColor(kilograms) {
  if (kilograms >= 100) return "red"
  if (kilograms >= 60) return "blue"
  if (kilograms >= 30) return "yellow"
  return "green"
}
