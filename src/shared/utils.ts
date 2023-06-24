export const errorFormatter = (code: string) => {
  switch (code) {
    case "auth/invalid-email":
      return "Invalid email";

    case "auth/user-not-found":
      return "No account with that email was found";

    case "auth/wrong-password":
      return "Incorrect password";

    default:
      return "Unexpected";
  }
};
