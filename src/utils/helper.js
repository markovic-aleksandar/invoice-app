import moment from "moment/moment";

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

// format date
export const formatDate = date => {
  const currentDate = new Date(date);

  return moment(currentDate).format('DD MMM YYYY');
}

// format month
export const formatSingleDate = value => {
  if (value < 10) return `0${value}`;
  return value;
}

// format number
export const formatNumber = value => {
  const tempValue = value.toString();
  if (!tempValue) return 0;
  if (tempValue.length > 1 && tempValue[0] === '0') {
    return tempValue.slice(1);
  }

  return tempValue;
}

// calculate payment period
export const calculatePaymentPeriod = (initDate, paymentPeriod) => {
  const currentDate = new Date(initDate);
  const period = {date: currentDate.getDate(), month: currentDate.getMonth(), year: currentDate.getFullYear()};
  
  for (let i = 0; i < paymentPeriod; i++) {
    const monthDays = new Date(period.year, period.month + 1, 0).getDate();
    period.date += 1;

    if (period.date > monthDays) {
      period.date = 1;
      period.month ++;

      if (period.month > 11) {
        period.month = 0;
        period.year ++;
      }
    }
  }

  return new Date(`${period.year}-${formatSingleDate(period.month + 1)}-${formatSingleDate(period.date)}`);
}

// format unique ID
const formatUniqueID = () => {
  const alphabet = [...Array(26).keys()].map(i => String.fromCharCode(65 + i));
  const nums = [...Array(9).keys()];

  let uniqueID = '';
  
  for (let i = 0; i < 6; i++) {
    if (i === 0 || i === 1) {
      uniqueID += alphabet[Math.floor(Math.random() * alphabet.length)];
    } else {
      uniqueID += nums[Math.floor(Math.random() * nums.length)];
    }
  }

  return uniqueID;
}


// create invoice obj
export const createInvoiceObj = (formData, itemsData, id) => {
  const {
    senderAddress,
    senderCity,
    senderPostCode,
    senderCountry,
    clientName,
    clientEmail,
    clientAddress,
    clientCity,
    clientPostCode,
    clientCountry,
    invoiceDate,
    paymentTerms,
    projectDescription
  } = formData;
  
  return {
    id: id || formatUniqueID(),
    createdAt: invoiceDate.value,
    paymentDue: calculatePaymentPeriod(invoiceDate.value, paymentTerms.value).toISOString().split('T')[0],
    description: projectDescription.value,
    paymentTerms: paymentTerms.value,
    clientName: clientName.value,
    clientEmail: clientEmail.value,
    status: "pending",
    senderAddress: {
      street: senderAddress.value,
      city: senderCity.value,
      postCode: senderPostCode.value,
      country: senderCountry.value
    },
    clientAddress: {
      street: clientAddress.value,
      city: clientCity.value,
      postCode: clientPostCode.value,
      country: clientCountry.value
    },
    items: itemsData,
    total: itemsData.reduce((sum, item) => {
      return sum += item.total
    }, 0)
  }
}

// create add edit form object
export const createAddEditFormObj = currentInvoice => {
  return {
    formData: {
      senderAddress: {value: currentInvoice?.senderAddress.street || '', error: false},
      senderCity: {value: currentInvoice?.senderAddress.city || '', error: false},
      senderPostCode: {value: currentInvoice?.senderAddress.postCode || '', error: false},
      senderCountry: {value: currentInvoice?.senderAddress.country || '', error: false},
      clientName: {value: currentInvoice?.clientName || '', error: false},
      clientEmail: {value: currentInvoice?.clientEmail || '', error: false},
      clientAddress: {value: currentInvoice?.clientAddress.street || '', error: false},
      clientCity: {value: currentInvoice?.clientAddress.city || '', error: false},
      clientPostCode: {value: currentInvoice?.clientAddress.postCode || '', error: false},
      clientCountry: {value: currentInvoice?.clientAddress.country || '', error: false},
      invoiceDate: {value: currentInvoice?.createdAt || new Date().toISOString().split('T')[0]},
      paymentTerms: {value: currentInvoice?.paymentTerms || 1},
      projectDescription: {value: currentInvoice?.description || '', error: false}
    },
    itemList: currentInvoice?.items.map(item => ({...item, error:false}))
    || [{name: 'New Item', quantity: 1, price: 0, total: 0, error: false}]
  }
}

