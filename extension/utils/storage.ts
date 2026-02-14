export const blazemarksUrl = storage.defineItem<string>(
  "local:blazemarksUrl",
  { fallback: "http://localhost:3000" },
);
