import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PEOPLE } from "./../../data/mock_data";
import ListItem from "./ListItem";

const Dating = function () {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <FlatList
        data={PEOPLE}
        keyExtractor={(item) => item.id}
        horizontal
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
        renderItem={({ index, item }) => <ListItem index={index} item={item} />}
      />
    </SafeAreaView>
  );
};

export default Dating;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  contentContainer: {
    padding: 10,
  },
});
