export function generateId() {
  return String(Date.now()) + Math.random().toString(36).slice(2, 8);
}
