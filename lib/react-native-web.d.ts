declare module "react-native" {
  export { default as AppRegistry } from "react-native-web/dist/exports/AppRegistry";
  export { default as View } from "react-native-web/dist/exports/View";
  export { default as Text } from "react-native-web/dist/exports/Text";
  export { default as TextInput } from "react-native-web/dist/exports/TextInput";
  export { default as Pressable } from "react-native-web/dist/exports/Pressable";
  export { default as ScrollView } from "react-native-web/dist/exports/ScrollView";
  export { default as StyleSheet } from "react-native-web/dist/exports/StyleSheet";

  interface PressableStateCallbackType {
    readonly pressed: boolean;
    readonly hovered: boolean;
  }

  interface ViewStyle {
    /** @platform web */
    $$css?: true;
  }
}
