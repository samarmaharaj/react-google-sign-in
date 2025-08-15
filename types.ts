// This interface represents the structure of the user data
// decoded from the Google Sign-In JWT.
export interface UserProfile {
  name: string;
  email: string;
  picture: string;
  given_name: string;
  family_name: string;
}
