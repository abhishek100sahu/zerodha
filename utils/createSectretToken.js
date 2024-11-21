const { createSecretToken } = require("./SecretToken");

const token = createSecretToken("someUserId");
console.log("Generated Token:", token);
