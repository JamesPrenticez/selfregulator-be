import { User } from "@prisma/client";

export const users: User[] = [
  {
    id: "66fb25f9c566c8de6e78bd86",
    email: "prenticez@hotmail.co.nz",
    passwordHash: "",
    firstName: "james",
    lastName: "prentice",
    phone: "027 123 456",
    profilePicture:
      "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    locale: "en-gb",
    country: "New Zealand",
    permissions: "[ADMIN]",
    subscription: "FREE",
    dateCreated: new Date(),
    lastModified: new Date(),
  },
];
