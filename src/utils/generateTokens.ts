import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET! ;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET! ;

console.log([ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET],"GGGG")
export function generateTokens(brokerId: string) {
  const accessToken = jwt.sign(
    { brokerId },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" } // short-lived
  );

  const refreshToken = jwt.sign(
    { brokerId },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" } // long-lived
  );

  return { accessToken, refreshToken };
}
