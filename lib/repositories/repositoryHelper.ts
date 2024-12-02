import fs from "fs";
import path from "path";
import { Data } from "../@types";

const dataFilePath = path.join(process.cwd(), "data", "data.json");

export function readData(): Data {
  const jsonData = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(jsonData);
}

export function writeData(data: Data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}
