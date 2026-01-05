import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "USER_DATA";

export async function isNewUser() {
  return (await AsyncStorage.getItem(USER_KEY)) === null;
}

export async function getUserData() {
  const raw = await AsyncStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function saveUser(user: any) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function incrementVisits() {
  const userData = await getUserData();

  if (!userData) {
    return;
  }

  userData.visits = (userData.visits || 0) + 1;
  await saveUser(userData);
}
