import { METALS } from './consts';

export function getMetalObj(metalValue) {
  return METALS.filter(metal => {
    return metal.value === metalValue;
  })[0];
}