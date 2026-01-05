import React, { useEffect, useState } from "react";

import { getUserData } from "@/storage/user";
import { User } from "@/types/User";
import { StyleSheet, Text, View } from "react-native";
import QRCodeStyled from "react-native-qrcode-styled";

const Qr = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const u = await getUserData();
      setUser(u);
    })();
  }, []);

  if (!user) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const payload = JSON.stringify({
    name: user.name,
    email: user.email,
    phone: user.phone,
    type: "CLIENT_ID",
    clientId: user.clientId,
  });

  return (
    <View style={styles.container}>
      <QRCodeStyled data={payload} size={250} />
      <Text>Escanea este código QR para registrar tu visita</Text>
    </View>
  );
};

export default Qr;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
