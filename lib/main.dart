import 'package:flutter/material.dart';
import "dart:math";

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      // Remove the debug banner
      debugShowCheckedModeBanner: false,
      title: 'MyStore',
      home: HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  // This holds a list of fiction users
  // You can use data fetched from a database or a server as well
  final List<Map<String, dynamic>> _allItems = [
    {
      "id": 1,
      "name": "Bread",
    },
    {
      "id": 2,
      "name": "Meat",
    },
  ];
  List selectedItems = ['Bread', 'Meat', 'Sauces', 'cheese', 'Rice', 'Oils'];
  // This list holds the data for the list view
  List<Map<String, dynamic>> _foundItems = [];
  @override
  initState() {
    // at the beginning, all users are shown
    _foundItems = _allItems;
    super.initState();
  }

  // This function is called whenever the text field changes
  void _runFilter(String enteredKeyword) {
    List<Map<String, dynamic>> results = [];
    List myresults = [];
    if (enteredKeyword.isEmpty) {
      // if the search field is empty or only contains white-space, we'll display all users
      selectedItems = results = _allItems;
    } else {
      results = _allItems
          .where((user) =>
              user["name"].toLowerCase().contains(enteredKeyword.toLowerCase()))
          .toList();
      // we use the toLowerCase() method to make it case-insensitive
    }

    // Refresh the UI
    setState(() {
      _foundItems = results;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title: const Text('MyStore', style: TextStyle(color: Colors.black)),
          backgroundColor: Colors.amberAccent),
      body: Padding(
        padding: const EdgeInsets.all(10),
        child: Column(
          children: [
            const SizedBox(
              height: 20,
            ),
            Row(
              children: [
                Flexible(
                    child: TextField(
                  onChanged: (value) => _runFilter(value),
                  decoration: const InputDecoration(
                      labelText: 'Search', suffixIcon: Icon(Icons.search)),
                )),
                Container(
                    decoration: BoxDecoration(
                        border: Border.all(
                          color: Colors.amberAccent,
                        ),
                        borderRadius: BorderRadius.all(Radius.circular(20))),
                    child: Container(
                      child: IconButton(
                          onPressed: () {
                            setState(() {
                              _allItems.add({
                                'id': _allItems.length.toString(),
                                'name': selectedItems[
                                    Random().nextInt(selectedItems.length)]
                              });
                              _foundItems = _allItems;
                            });
                          },
                          icon: Icon(Icons.add),
                          splashColor: Colors.yellow[200]),
                    ))
              ],
            ),
            const SizedBox(
              height: 20,
            ),
            Expanded(
              child: _foundItems.isNotEmpty
                  ? ListView.builder(
                      itemCount: _foundItems.length,
                      itemBuilder: (context, index) => Card(
                        key: ValueKey(_foundItems[index]["id"]),
                        color: Colors.amberAccent,
                        elevation: 4,
                        margin: const EdgeInsets.symmetric(vertical: 5),
                        child: ListTile(
                          leading: Text(
                            _foundItems[index]["id"].toString(),
                            style: const TextStyle(fontSize: 24),
                          ),
                          title: Text(
                            _foundItems[index]['name'],
                            style: TextStyle(fontSize: 20),
                          ),
                        ),
                      ),
                    )
                  : const Text(
                      'No results found',
                      style: TextStyle(fontSize: 24),
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
