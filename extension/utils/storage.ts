export const blazemarksUrl = storage.defineItem<string>(
  "local:blazemarksUrl",
  { fallback: "https://blazemarks.com/" },
);

export const newTabRedirect = storage.defineItem<boolean>(
  "local:newTabRedirect",
  { fallback: false },
);

export const focusSearch = storage.defineItem<boolean>(
  "local:focusSearch",
  { fallback: false },
);

export const customReadingDomains = storage.defineItem<string[]>(
  "local:customReadingDomains",
  { fallback: [] },
);
