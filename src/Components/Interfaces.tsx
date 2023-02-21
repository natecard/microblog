export interface post {
  id: string;
  author: string;
  title: string;
  profilePic: string;
  content: string;
  likePost: Function;
  boostPost: Function;
}
export interface userInfo {
  displayName: string;
  uid: string;
  profilePic: string;
  email: string;
}
