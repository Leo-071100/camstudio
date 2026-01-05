import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";

const KEY = "CLIENT_ID";

export async function getOrCreateClientId() {
  let clientId = await SecureStore.getItemAsync(KEY);

  if (!clientId) {
    clientId = Crypto.randomUUID();
    await SecureStore.setItemAsync(KEY, clientId, {
      keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
    });
  }

  return clientId;
}
