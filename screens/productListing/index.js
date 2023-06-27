import { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Context } from "../../context";
import { ActivityIndicator } from "react-native";

export default function ProductListing() {
  const { Loading, products } = useContext(Context);

  if (Loading) {
    return (
      <ActivityIndicator style={styles.loader} color={"red"} size={"large"} />
    );
  }

  return (
    <View>
      <FlatList
        data={products}
        renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
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
