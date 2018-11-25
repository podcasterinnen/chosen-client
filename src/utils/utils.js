/**
 * Creates a key to use in React lists
 * 
 * @param {string} pre 
 * @param {number} i 
 */
export const generateKey = (pre, i) => {
  return `${ pre }_${ new Date().getTime() }_${i}`
}