import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ProductListing from "./screens/productListing";
import Favorites from "./screens/favorites";
import ProductDetails from "./screens/productDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()

function Bottomtabs() {
  return(
    <Tab.Navigator>
      <Tab.Screen name="productListing" component={ProductListing}/>
      <Tab.Screen name="favorites" component={Favorites}/>
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="bottomTabs" component={Bottomtabs} />
          <Stack.Screen name="productDetails" component={ProductDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
