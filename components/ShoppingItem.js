import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
// import { doc, updateDoc } from "firebase/firestore";
import { app, db, getFirestore, deleteDoc, addDoc, getDocs, doc, updateDoc } from '../firebase'
import { async } from '@firebase/util';

const ShoppingItem = (props) => {
    const [isChecked, setIsChecked] = useState(props.isCheck)


    const updateIsChecked = async () => {
        const shoppingRef = doc(db, "shopping", props.id);

        // Set the "capital" field of the city 'DC'
        await updateDoc(shoppingRef, {
            isChecked: isChecked,
        });

    }
    useEffect(() => {
        updateIsChecked();
    }, [isChecked])

    const deleteShoppingItem = async () => {
        await deleteDoc(doc(db, "shopping", props.id));
        props.getShoppingList
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={() => setIsChecked(!isChecked)}>
                {
                    isChecked ?
                        <AntDesign name="checkcircle" size={24} color="black" /> :
                        <AntDesign name="checkcircleo" size={24} color="black" />
                }

            </Pressable>

            <Text style={styles.text}>{props.title}</Text>
            <Pressable onPress={deleteShoppingItem}>
                <MaterialIcons name="delete" size={24} color="black" />
            </Pressable>

        </View>
    )
}

export default ShoppingItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgrey',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        alignItems: 'center',
        padding: 10,
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 40,
    },
    text: {
        flex: 1,
        marginLeft: 10,
        fontSize: 17,
        fontWeight: "500",
    }

})