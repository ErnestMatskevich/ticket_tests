import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token) {
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Convert current time to seconds

  if (decodedToken.exp < currentTime) {
    // Token has expired
    return true;
  } else {
    // Token is still valid
    return false;
  }
}
