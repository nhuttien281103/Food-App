/* eslint-disable prettier/prettier */
// Create our number formatter.
export const formatPrice = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
