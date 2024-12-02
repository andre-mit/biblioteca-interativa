import { Role, User } from "../@types";
import { readData, writeData } from "./repositoryHelper";

export function getUsers() {
  const data = readData();
  return data.users;
}

export function addUser(user: User) {
  const data = readData();
  const id = data.users.length + 1;
  user.id = id;
  data.users.push(user);
  writeData(data);
  return id;
}

export function getUserById(id: number) {
  const data = readData();
  return data.users.find((user) => user.id === id);
}

export function getUserByEmail(email: string) {
  const data = readData();
  return data.users.find((user) => user.email === email);
}
