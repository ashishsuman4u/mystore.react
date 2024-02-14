export { formatPrice } from './formatter';
export {
  fetchData,
  saveData,
  updateCollectionData,
  removeData,
  fetchAllUserData,
  getRealtimeUpdate,
} from './firestore';
export { generateCheckoutSession } from './order';

export function upsert(array, element) {
  if (array) {
    if (array.length > 0) {
      const i = array.findIndex((_element) => _element.id === element.id);
      if (i > -1) array[i] = element;
      else array.push(element);
    } else array.push(element);
  } else {
    array = [element];
  }
}
