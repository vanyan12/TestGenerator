import {jwtDecode} from "jwt-decode";


export default function getUserInfo(token) {


  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    const {sub, fname, lname } = decoded;

    return {sub, fname, lname };
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}