import { getUserData, isNewUser } from "@/storage/user";
import { User } from "@/types/User";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const isNew = await isNewUser();

      if (isNew) {
        router.replace("/register");
        return;
      }

      const u = await getUserData();
      setUser(u);
    })();
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false, title: "Inicio" }} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{user?.name}</Text>
        <Text>Visitas: {user?.visits || 0}</Text>

        <Button title="Ver QR" onPress={() => router.push("/qr")} />
      </View>
    </>
  );
}
