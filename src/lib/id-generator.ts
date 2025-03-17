/**
 * Generates a unique 10-character ID consisting of only capital letters and numbers
 * @returns A string containing a random 10-character ID
 */
export function generateUniqueId(): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const length = 10
  let result = ""

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }

  return result
}

