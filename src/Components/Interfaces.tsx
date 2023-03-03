export interface post {
	fetchPosts(): void;
	uuid: string;
	author: string;
	profilePic: string;
	content: string;
	likes: number;
	timestamp: string;
	replyText: string;
}
export interface userInfo {
	displayName: string;
	profilePic: string;
	email: string;
}
export interface replies {
	uuid: string;
	author: string;
	profilePic: string;
	content: string;
	likes: number;
	timestamp: string;
	repliedTo: string;
}
