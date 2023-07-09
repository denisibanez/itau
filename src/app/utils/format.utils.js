import { format } from 'date-fns';

const formatCurrency = (value) => {
  const val = (value / 1).toFixed(2).replace('.', ',');
  return `R$ ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

const formatZipCode = (value) => {
  const x = value.replace(/\D/g, '').match(/(\d{0,5})(\d{0,8})/);
  const val = `${x[1]}-${x[2]}`;
  return val;
};

const formatCellPhone = (value) => {
  const x = value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
  const val = `(${x[1]}) ${x[2]} - ${x[3]}`;
  return val;
};

const formatDate = (date) => format(date).format('DD/MM/YYYY');

const parserDateOrder = (init, end, format) => {
  let a;
  let b;
  const partDateInit = init.split('-');
  const partDateEnd = end.split('-');

  const dateInitF = new Date(
    partDateInit[2],
    partDateInit[1] - 1,
    partDateInit[0]
  );
  const dateEndF = new Date(partDateEnd[2], partDateEnd[1] - 1, partDateEnd[0]);

  if (dateInitF > dateEndF) {
    a = end;
    b = init;
  } else {
    a = init;
    b = end;
  }

  let dateInit = format(a, 'dd/MM/yyyy');
  let dateEnd = format(b, 'dd/MM/yyyy');
  dateInit = dateInit.replace('Z', '');
  dateEnd = dateEnd.replace('Z', '');
  dateEnd = dateEnd.replace('00:00:00', '23:59:59');
  if (format) {
    return [format(a, 'dd/MM/yyyy'), format(b, 'dd/MM/yyyy')];
  }
  return [dateInit, dateEnd];
};

const parserDates = (date) => {
  const dateSplit = date.split('/');

  const dateSepare = new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);

  const format = format(dateSepare, 'dd/MM/yyyy');

  return format;
};

export {
  formatCurrency,
  formatCellPhone,
  formatZipCode,
  formatDate,
  parserDateOrder,
  parserDates,
};
