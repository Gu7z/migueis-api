import User from "src/models/user";

export default {
  render(user: User) {
    return {
      userId: user.id,
      email: user.email,
      encryptedPrivateKey: user.encryptedPrivateKey,
      publicKey: user.publicKey,
    };
  },
};
