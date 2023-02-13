// make unique inovice status value
export const getUniqueValues = values => {
  const uniqeValues = values.map(value => value.status).reduce((sum, item) => {
    if (!sum.includes(item)) sum.push(item);
    return sum;
  }, []);
  
  return uniqeValues;
}

// format invoice price
export const formatPrice = value => {
  return new Intl.NumberFormat('us-EN', {
    style: 'currency',
    currency: 'USD'
  }).format(value.toFixed(2));
}

