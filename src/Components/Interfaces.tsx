export interface microblog {
  id: string;
  author: string;
  title: string;
  image: string;
  post: string;
  like: Function;
  boost: Function;
}
export interface user {
  displayName: string;
  uid: string;
  photoUrl: string;
}
