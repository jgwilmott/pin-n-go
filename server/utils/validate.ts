export function isAirportCode(value: unknown): value is AirportCode {
  const regex = /^[A-Z]{3}$/;
  return typeof value === "string" && regex.test(value);
}
