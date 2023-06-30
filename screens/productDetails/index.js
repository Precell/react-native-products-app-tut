import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";



export default function ProductDetails(){
    const route = useRoute()
    const {productId} = route.params
    console.log(route.params);

    const [Loading, setLoading] = useState()
    const [productDetailsData, setProductDetailsData] = useState({})

    useEffect(() =>{

        setLoading(true)
        async function getDataFromApi (){
            const apiRes = await fetch(`https://dummyjson.com/products/${productId}`)
            const finalRes = await apiRes.json()
            if (finalRes) {
                setLoading(false)
                setProductDetailsData(finalRes) 
            }
        }

        getDataFromApi()


    },[])

    console.log(productDetailsData);

    return(
        <View>
            <Text>Product Details </Text>
        </View>
    )
}