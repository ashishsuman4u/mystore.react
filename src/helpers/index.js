export { formatPrice } from './formatter';
export { fetchData, saveData, removeData, fetchAllUserData, getRealtimeUpdate } from './firestore';
export { generateCheckoutSession } from './order';

export function upsert(array, element) {
  const i = array.findIndex((_element) => _element.id === element.id);
  if (i > -1) array[i] = element;
  else array.push(element);
}
