import React, { useEffect, useMemo, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/AppNavigation/HomeScreen";
import ChatScreen from "../Screens/AppNavigation/ChatScreen";
import MessageScreen from "../Screens/AppNavigation/MessageScreen";
import GlobalState from "../../context";

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <GlobalState>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />

          <Stack.Screen name="ChatScreen" component={ChatScreen} />

          <Stack.Screen name="MessageScreen" component={MessageScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalState>
  );
};

export default Router;

//   <View
// style={{
//   justifyContent: 'flex-end',
//   paddingVertical: RFValue(10),
//   backgroundColor: 'red',
// }}>
// <CommonButton
//   style={{
//     marginHorizontal: RFValue(25),
//     marginBottom: Platform.OS == 'android' ? RFValue(5) : null,
//     backgroundColor: whenDisable
//       ? COLORS.disabledColor
//       : COLORS.primaryColor,
//   }}
//   title={STRING.Save}
//   disabled={whenDisable}
//   onpress={() => handleSave()}
// />
// </View>
