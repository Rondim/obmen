import { getMetalObj } from '../../utils';

export function calcOrdersSum(orders, errors) {
  let totalWeight = 0;
  let totalCost = 0;

  const hasErrors = !errors || errors.orders !== undefined;
  // Если есть ошибки то вернуть 0 0 
  if (hasErrors || !orders) {
    return { totalWeight, totalCost, hasErrors };
  }

  // Суммируем стоимость и металлы в пересчете в 585 до 2 значащих цифр
  orders.forEach(order => {
    const metalShare = getMetalObj(order.metal)['content'];
    const auContentIn585 = Math.round(order.weight * (metalShare / 0.585) * 100) / 100;
    
    totalWeight += auContentIn585;
    totalCost += +order.cost;
  });

  return { totalWeight, totalCost, hasErrors };
}

export function calcMetalsSum(metals, errors) {
  let totalWeight = 0;
  const hasErrors = !errors || errors.metals !== undefined;
  if (hasErrors || !metals) {
    return { totalWeight, hasErrors };
  }

  // Суммируем металлы в пересчете в 585 до 2 значащих цифр
  metals.forEach(metal => {
    const metalShare = getMetalObj(metal.metal)['content'];
    const auContentIn585 = Math.round(metal.weight * (metalShare / 0.585) * 100) / 100;

    totalWeight += auContentIn585;
  });

  return { totalWeight, hasErrors };
}
// export function hasOrdersErrors(orders) {
//   let hasErrors = false;
//   // Проверяем, что orders массив такой структуры
//   // [{ weight: 1.37, metal: 'AU_585", cost: 3380 }]
//   try {
//     orders.forEach(order => {
//       if (!(order.weight && order.metal && order.cost)) {
//         hasErrors = true;
//       }
//     });
//   } catch (error) {
//     return true;
//   }

//   // Проверяем, что weight, metal
//   // являются разрешенными значениями
//   orders.forEach(order => {
//     if (!isNum(order.weight) || !isMetal(order.metal) || !isNum(order.cost)) {
//       hasErrors = true;
//     }
//   });

//   return hasErrors;

  
// }

// export function hasMetalsErrors(metals) {
//   let hasErrors = false;
//   // Проверяем, что metals массив такой структуры
//   // [{ weight: 1.37, metal: 'AU_585" }]
//   try {
//     metals.forEach(order => {
//       if (!(order.weight && order.metal)) {
//         hasErrors = true;
//       }
//     });
//   } catch (error) {
//     return true;
//   }

//   // Проверяем, что weight, metal
//   // являются разрешенными значениями
//   metals.forEach(order => {
//     if (!isNum(order.weight) || !isMetal(order.metal)) {
//       hasErrors = true;
//     }
//   });

//   return hasErrors;
// }

// //Вспомогательные функции

// // Проверяет на число
// function isNum(n) {
//   return !isNaN(parseFloat(n)) && isFinite(n);
// }

// // Проверяет значение соответствует какому-нибудь металлу
// function isMetal(value) {
//   return METALS.some(metal => value === metal.value);
// }



