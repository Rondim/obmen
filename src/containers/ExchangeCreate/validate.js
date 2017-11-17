export const number = value => value ? undefined : 'Должно быть значение';

const isNumber = value => !isNaN(parseFloat(value)) && isFinite(value);
export default (values) => {
  const errors = {
    orders: [],
    scrapMetals: []
  };

  if (values.orders) {
    values.orders.forEach((order, i) => {
      // TODO Переделать эту логику
      if (!errors.orders[i]) errors.orders[i] = {};
      if (!isNumber(order.weight)) {
        errors.orders[i].weight = 'Вес должен быть числом';
      }
      if (!isNumber(order.cost)) {
        errors.orders[i].cost = 'Цена должна быть числом';
      }
    });
  }
  if (values.scrapMetals) {
    values.scrapMetals.forEach((metal, i) => {
      // TODO Переделать эту логику
      if (!errors.scrapMetals[i]) errors.scrapMetals[i] = {};
      if (!isNumber(metal.weight)) {
        errors.scrapMetals[i].weight = 'Вес должен быть числом';
      }
    });
  }
  return errors;
};
