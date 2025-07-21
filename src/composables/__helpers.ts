export function helpers() {
  /**
   * Formats a date string from an ISO format to a Slovenian date
   * string, with the format DD.MM.YYYY HH:mm.
   *
   * @param {string} value - Date string in ISO format
   * @returns {string} Formatted Slovenian date string
   */
  const formatDate = (value: string) => {
    if (!value) return ''
    const date = new Date(value)
    return date.toLocaleString('sl-SI', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  /**
   * Capitalizes the first letter of a string.
   *
   * @param {string} value - The string to capitalize.
   * @returns {string} The capitalized string.
   */
  const capitalize = (value: string) => {
    if (!value) return ''
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  return { formatDate, capitalize }
}
