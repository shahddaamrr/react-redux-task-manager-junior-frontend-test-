import { StyleSheet, Text, View } from "react-native";

function UserCard({ user }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.address}>{user.address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  email: {
    fontSize: 14,
    color: "#2563eb",
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
});

export default UserCard;
