import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Uso: npm run auth:hash -- 'sua-senha'");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log("\nBcrypt hash (cole em ADMIN_PASSWORD_HASH no .env):\n");
console.log(hash);
console.log();
