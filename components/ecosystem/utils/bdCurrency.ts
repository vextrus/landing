/**
 * Bangladesh Currency Utility Functions
 * 
 * Provides proper BDT formatting with Crore/Lakh notation
 * following Bangladeshi financial conventions
 */

export const formatBDT = (amount: number): string => {
  if (amount >= 10000000000) { // 1000 Cr and above
    return `৳${(amount / 10000000000).toFixed(2)} Thousand Cr`
  } else if (amount >= 1000000000) { // 100 Cr and above
    return `৳${(amount / 1000000000).toFixed(1)} Cr`
  } else if (amount >= 100000000) { // 10 Cr and above
    return `৳${(amount / 1000000000).toFixed(2)} Cr`
  } else if (amount >= 10000000) { // 1 Cr and above
    return `৳${(amount / 10000000).toFixed(1)} Cr`
  } else if (amount >= 100000) { // 1 Lakh and above
    return `৳${(amount / 100000).toFixed(1)} Lakh`
  } else if (amount >= 1000) { // 1000 and above
    return `৳${(amount / 1000).toFixed(1)}K`
  } else {
    return `৳${amount.toLocaleString()}`
  }
}

export const formatBDTCompact = (amount: number): string => {
  if (amount >= 1000000000) {
    return `৳${(amount / 1000000000).toFixed(1)}Cr`
  } else if (amount >= 100000) {
    return `৳${(amount / 100000).toFixed(1)}L`
  } else if (amount >= 1000) {
    return `৳${(amount / 1000).toFixed(1)}K`
  } else {
    return `৳${amount}`
  }
}

export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`
}

export const getBanglaNumber = (number: number): string => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  return number.toString().split('').map(digit => banglaDigits[parseInt(digit)] || digit).join('')
}

export default {
  formatBDT,
  formatBDTCompact,
  formatPercentage,
  getBanglaNumber
}