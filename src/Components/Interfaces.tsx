export interface post {
  likePost(): void;
  id: string;
  author: string;
  title: string;
  profilePic: string;
  content: string;
  likes: number;
  timestamp: string;
  // boostPost: Function;
}
export interface userInfo {
  displayName: string;
  uid: string;
  profilePic: string;
  email: string;
}
