import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import UserCard from "./src/components/UserCard";
import { store } from "./src/redux/store";
import { fetchUsers } from "./src/redux/usersSlice";

function UserListScreen() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  const [searchText, setSearchText] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [users, searchText]);

  const visibleUsers = filteredUsers.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((previousCount) => previousCount + 5);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.smallLabel}>User Directory</Text>
          <Text style={styles.title}>User List</Text>
          <Text style={styles.subtitle}>
            Search and browse users loaded from the API.
          </Text>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Search by name..."
          value={searchText}
          onChangeText={setSearchText}
        />

        {loading && <ActivityIndicator size="large" color="#2563eb" />}

        {error && <Text style={styles.error}>{error}</Text>}

        {!loading && (
          <FlatList
            data={visibleUsers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <UserCard user={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No users found.</Text>
            }
          />
        )}

        {!loading && visibleUsers.length < filteredUsers.length && (
          <TouchableOpacity style={styles.loadButton} onPress={handleLoadMore}>
            <Text style={styles.loadButtonText}>Load More</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <UserListScreen />
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f7fb",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  smallLabel: {
    color: "#2563eb",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#111827",
  },
  subtitle: {
    color: "#6b7280",
    fontSize: 15,
    marginTop: 8,
    lineHeight: 22,
  },
  searchInput: {
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#d1d5db",
    marginBottom: 18,
    fontSize: 15,
  },
  listContent: {
    paddingBottom: 16,
  },
  loadButton: {
    backgroundColor: "#111827",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
  },
  loadButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  error: {
    color: "#b91c1c",
    marginBottom: 12,
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 30,
  },
});
