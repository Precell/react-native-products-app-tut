import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Button,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import ProductDetailsItem from "../../components/productDetailsItem";
import { Context } from "../../context";

export default function ProductDetails() {
  const route = useRoute();
  const { productId } = route.params;
  const navigation = useNavigation();

  const [Loading, setLoading] = useState();
  const [productDetailsData, setProductDetailsData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [reason, setReason] = useState("");
    const {addToFavorites} = useContext(Context)



  useEffect(() => {
    setLoading(true);
    async function getDataFromApi() {
      const apiRes = await fetch(`https://dummyjson.com/products/${productId}`);
      const finalRes = await apiRes.json();
      if (finalRes) {
        setLoading(false);
        setProductDetailsData(finalRes);
      }
    }

    getDataFromApi();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Button
            onPress={() => setModalVisible(true)}
            title="Add to favorites"
          />
        );
      },
    });
  }, []);

  const handleOnChange = (enteredText) => {
    setReason(enteredText);
  };


  if (Loading) {
    return <ActivityIndicator size="large" color={"red"} />;
  }

  return (
    <View>
      <ProductDetailsItem productDetailsData={productDetailsData} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="Why you liked this product?"
              onChangeText={handleOnChange}
              value={reason}
              style={styles.reasonInputText}
            />

            <View style={styles.buttonWrapper}>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => {
                    addToFavorites(productId, reason)
                    setModalVisible(!modalVisible)}}
              >
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 1,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonWrapper:{
    flexDirection:'row'
  },
  button: {
    borderRadius: 1,
    padding: 10,
    elevation: 2,
    marginRight:5,
    marginTop:10
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginLeft:5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  reasonInputText:{
    // borderRadius:1,
    borderWidth:1,
    padding:10
  }
});
