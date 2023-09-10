export const db = "expenses_traker_v2";
export function getFromLocalStorage(name) {
  if (!localStorage.getItem(name)) return false;
  let data = localStorage.getItem(name);
  data = JSON.parse(data);
  return data;
}
