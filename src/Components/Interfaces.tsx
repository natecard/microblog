export interface post {
	fetchReplies(): void;
	fetchPosts(): void;
	post: any;
	uuid: string;
	author: string;
	profilePic: string;
	content: string;
	likes: number;
	timestamp: string;
	replyText: string;
	length: number;
}
export interface userInfo {
	displayName: string;
	profilePic: string;
	email: string;
}
export interface replies {
	fetchPosts(): void;
	post: post;
	replies: Array<replies>;
	reply: any;
	uuid: string;
	author: string;
	profilePic: string;
	content: string;
	likes: number;
	timestamp: string;
	repliedTo: string;
	replyText: string;
	fetchReplies(): void;
}
