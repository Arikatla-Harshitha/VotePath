import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

export const loadGoogleMaps = async (apiKey: string) => {
  setOptions({
    key: apiKey,
    v: "weekly",
  });

  await importLibrary("maps");
  return window.google;
};
