import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView, StyleSheet,
  Text, View, Pressable, TextInput, FlatList, ActivityIndicator, RefreshControl
} from 'react-native';
import ShoppingItem from './components/ShoppingItem';
import { MaterialIcons } from '@expo/vector-icons';
import { app, db, getFirestore, collection, addDoc, getDocs, doc } from './firebase/index'
import { useEffect, useState } from 'react';

export default function App() {
  const [title, setTitle] = useState('')
  const [refreshing, setRefreshing] = useState(false);
  const [checkValue, setCheckValue] = useState(0)

  const [shoppingList, setShoppingList] = useState([
    // { id: 1, isCheck: false, title: 'milk' },
    // { id: 2, isCheck: true, title: 'tea' },
    // { id: 3, isCheck: true, title: 'bread' },
    // { id: 4, isCheck: true, title: 'bread' },
    // { id: 5, isCheck: false, title: 'milk' },
    // { id: 6, isCheck: true, title: 'tea' },
    // { id: 7, isCheck: true, title: 'bread' },
    // { id: 8, isCheck: true, title: 'bread' },
    // { id: 9, isCheck: false, title: 'milk' },
    // { id: 10, isCheck: true, title: 'tea' },
    // { id: 11, isCheck: true, title: 'bread' },
    // { id: 12, isCheck: true, title: 'bread' },

  ]
  )



  const addShoppingItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "shopping"), {
        title: title,
        isCheck: false,
      });

      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      setTitle('')
      console.error("Error adding document: ", e)
    }
  }
  const onRefresh = () => {

    setRefreshing(true)
    setRefreshing(false)
  }



  const getShoppingList = async () => {
    const querySnapshot = await getDocs(collection(db, 'shopping'));
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, doc.data());
      // console.log(doc.data())
      // console.log(shoppingList);
      // setShoppingList({
      //   ...doc.data(),
      //   id: doc.id,
      // })

      setShoppingList(oldArray => [...oldArray, { id: doc.id, ...doc.data(), },]);

    });


  }
  console.log(shoppingList)

  useEffect(() => {
    getShoppingList();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Shopping List</Text>
        <Text style={styles.noOfItem}>{shoppingList.length}</Text>
        {/* <Pressable>
          <MaterialIcons name="delete" size={30} color="black" />
        </Pressable> */}
      </View>
      {/* {shoppingList.length > 0 ? */}
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
          // onRefresh={onRefresh}
          />
        }

        data={shoppingList}
        renderItem={({ item }) => <ShoppingItem title={item.title}
          isCheck={item.isCheck}
          shoppingList={shoppingList}
          id={item.id}
          getShoppingList={getShoppingList}

        />}
        keyExtractor={item => item.id}
      />
      {/* ) : (<ActivityIndicator /> */}
      {/* // } */}


      <TextInput placeholder='Enter Shopping Item'
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={addShoppingItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  header: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },

  heading: {
    fontSize: 30,
    fontWeight: '500',
    flex: 1,
  },

  noOfItem: {
    fontSize: 30,
    fontWeight: '500',
    marginRight: 20,
  },

  input: {
    fontSize: 17,
    width: '90%',
    backgroundColor: 'lightgray',
    alignSelf: 'center',
    marginTop: 'auto',
    padding: 10,
    borderRadius: 10,

  }

});
