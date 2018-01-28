export const number = value => value ? undefined : 'Должно быть значение';

const isNumber = value => !isNaN(parseFloat(value)) && isFinite(value);
export default (values) => {
  const errors = {
    orders: [],
    metals: []
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
  if (values.metals) {
    values.metals.forEach((metal, i) => {
      // TODO Переделать эту логику
      if (!errors.metals[i]) errors.metals[i] = {};
      if (!isNumber(metal.weight)) {
        errors.metals[i].weight = 'Вес должен быть числом';
      }
    });
  }
  return errors;
};
