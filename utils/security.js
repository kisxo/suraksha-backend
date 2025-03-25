import crypto from "crypto";

export function generateAccessToken(phone) {
  const token = crypto.randomBytes(48).toString('hex');

  return token;
}

export function generateOTP() {
  return crypto.randomInt(100000, 999999);
}

export function checkPhone(phoneStr) {
  // Regular expression to check if the string contains exactly 10 digits
  const regex = /^\d{10}$/;

  if(regex.test(phoneStr))
  {
    return parseInt(phoneStr)
  }

  return false
}