import { Text, View } from "react-native";
import {
  AdMobBanner,
  requestPermissionsAsync,
  setTestDeviceIDAsync,
} from "expo-ads-admob";
import { useEffect } from "react";
// import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";

export default function Ad() {
  useEffect(() => {
    (async () => {
      const { status } = await requestPermissionsAsync();
      if (status === "granted") {
        console.log("Yay! I have user permission to track data");
      }
    })();
  }, []);

  return (
    <View
      style={{
        marginTop: "auto",
        marginBottom: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <AdMobBanner
        bannerSize="banner"
        adUnitID="ca-app-pub-7565791511836797/4330076379" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds // true or false
        onDidFailToReceiveAdWithError={(e: any) => console.log(e)}
      /> */}
    </View>
  );
}
