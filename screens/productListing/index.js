import { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Context } from "../../context";
import { ActivityIndicator } from "react-native";
import ProductListItem from "../../components/productListItem";
import { useNavigation } from "@react-navigation/native"; 


function createRandomColor(){
    let letters = '123456789ABCDEF';
    let color = '#'

    for(let i=0; i <6; i++){
        color += letters[Math.floor(Math.random()*16)]
    }

    return color
}



export default function ProductListing() {
  const { Loading, products } = useContext(Context);

  const navigation = useNavigation()


  if (Loading) {
    return (
      <ActivityIndicator style={styles.loader} color={"red"} size={"large"} />
    );
  }

  const handleOnPress = (getId) =>{
    navigation.navigate('productDetails', {
      productId : getId
    })
  }
  return (
    <View>
      <FlatList
        data={products}
        renderItem={(itemData) => <ProductListItem onPress={() =>handleOnPress(itemData.item.id)} title={itemData.item.title} bgColor={createRandomColor()} />}
        keyExtractor={(itemData) => itemData.id}
        numColumns={2}
        
      />
      <Text>ProductListing</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
