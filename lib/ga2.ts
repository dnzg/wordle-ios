import { Analytics, PageHit } from "expo-analytics";

export const analytics = new Analytics("UA-217433450-1");

export function AnalyticsPage(name: string) {
  analytics
    .hit(new PageHit(name))
    .then(() => console.log("success"))
    .catch((e: Error) => console.log(e.message));
}
