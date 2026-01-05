import { getOrCreateClientId } from "@/storage/secure";
import { saveUser } from "@/storage/user";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  async function handleSubmit() {
    if (!name || !email || !phone) {
      alert("Please fill in all fields");
      return;
    }

    const clientId = await getOrCreateClientId();

    await saveUser({
      name,
      email,
      phone,
      visits: 0,
      createdAt: new Date().toISOString(),
      clientId,
    });

    router.replace("/");
  }

  return (
    <View>
      <TextInput placeholder="Tu nombre" onChangeText={setName} />
      <TextInput
        placeholder="Tu email"
        onChangeText={(input) => setEmail(input.toLowerCase())}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Tu teléfono"
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Text onPress={handleSubmit}>Registrar</Text>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
