"use server";

import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    console.log({ newUser });
    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documants = await users.list([Query.equal("email", [user.email])]);
      return documants?.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};