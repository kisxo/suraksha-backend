import crypto from "crypto";
import redisClient from "../config/redis.js";

export function generateAccessToken() {
  return crypto.randomBytes(64).toString('base64').slice(0, 64);
}

export function generateOTP() {
  return crypto.randomInt(100000, 999999);
}

export async function verifyToken(phone, token) {
  const valid_token = await redisClient.get(`token-${phone}`)
  if(valid_token === token)
  {
    return true;
  }
  return false;
}

export async function verifyOtp(phone, otp) {
  console.log(phone, otp)
  const valid_otp = await redisClient.get(`otp-${phone}`)
  if(valid_otp === otp)
  {
    return true;
  }
  return false
}


export function checkPhone(phoneStr) {
  // Regular expression to check if the string contains exactly 10 digits
  const regex = /^\d{10}$/;

  if(regex.test(phoneStr) && parseInt(phoneStr) >= 1000000000)
  {
    return parseInt(phoneStr)
  }

  return false
}

export function checkOtp(otpStr) {
  // Regular expression to check if the string contains exactly 6 digits
  const regex = /^\d{6}$/;

  if(regex.test(otpStr) )
  {
    return otpStr
  }

  return false
}