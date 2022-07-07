import  React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Keyboard, Button ,Text,FlatList,
  SafeAreaView,TouchableOpacity} from "react-native";
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feather, Entypo } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();


const Item = ({ name, id }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
  </View>
);

// the filter
const List = ({ searchPhrase, setCLicked, data }) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return <Item name={item.name}  />;
    }
    // filter of the name
    if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item name={item.name}  />;
    }
    // filter of the description
    
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};








const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked}) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
              setSearchPhrase("")
          }}/>
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          ></Button>
        </View>
      )}
    </View>
  );
};


const Home = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [allItems, setAllItems] = useState(
    [{id: 1,
      name: "Bread",},{
      id: 2,
      name: "Meat",
    }
    ]
  );


  var selectedItems = ['biscuits', 'Butter', 'Sauces', 'cheese', 'Rice', 'Oils',
  'hamburger meat','other vegetables','whole milk','frozen vegetables','domestic eggs','soda','dishes',
  'grapes','yogurt','UHT-milk','soft cheese','rolls/buns','fruit/vegetable juice','candy','dental care','newspapers','shopping bags',
  ];


const adder = () =>{
  var x=[...allItems,{id:allItems.length + 1,name:selectedItems[Math. floor((Math. random() * (selectedItems.length -1))+1)]}];
  setAllItems(x)
  console.log(allItems);
}


  return (
    <SafeAreaView style={styles.root}>
      {!clicked && <Text style={styles.titles}>Groceries</Text>}
<View
style={{
  flexDirection:'row',
  justifyContent:'center',alignItems: "center",
}}
>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <View style={{
        justifyContent:'center',
        backgroundColor: "#d9dbda",
    borderRadius: 500,
    alignItems: "center",
    width:'9%',
    height:'29%',
    marginLeft:'-8%',
    marginRight:'4%',

      }}>
     <TouchableOpacity onPress={ adder} style={styles.fab}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
        </View>
</View>

{(          <List
            searchPhrase={searchPhrase}
            data={allItems}
            setClicked={setClicked}
          />
)}

    </SafeAreaView>
  );
};










function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
   
        <Stack.Screen
          name="MyStore"
          component={Home}
          options={{ title: 'MyStore' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",

  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "70%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
 fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
   list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 3,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },root: {
    flexDirection:'column',
    justifyContent: "top",
    alignItems: "top",
  },
  titles: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "6.5%",
    
  },
});


export default App;
