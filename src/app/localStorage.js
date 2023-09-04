export const db = "expenses_traker";
export function getFromLocalStorage(name) {
  if (!localStorage.getItem(name)) return false;
  let data = localStorage.getItem(name);
  data = JSON.parse(data);
  return data;
}
