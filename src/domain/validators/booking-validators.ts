export function compareDates(firstDate: Date, secondDate: Date): boolean {
  const start = new Date(firstDate);
  const end = new Date(secondDate);

  return start < end;
}
