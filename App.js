import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ProductListing from "./screens/productListing";
import Favorites from "./screens/favorites";
import ProductDetails from "./screens/productDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductContext from "./context";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Bottomtabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="productListing"
        options={{ title: "Product List" }}
        component={ProductListing}
      />
      <Tab.Screen
        name="favorites"
        component={Favorites}
        options={{ title: "Favorites" }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ProductContext>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <NavigationContainer>
          <Stack.Navigator
          
          screenOptions={{
            headerStyle:{
              backgroundColor:'#ffff'
            },
            contentStyle:{
              backgroundColor: '#220577dd'
            }
          }}
          >
            <Stack.Screen
              options={{ headerShown: false }}
              name="bottomTabs"
              component={Bottomtabs}
            />
            <Stack.Screen
              name="productDetails"
              options={{ title: "Product Details" }}
              component={ProductDetails}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </ProductContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
