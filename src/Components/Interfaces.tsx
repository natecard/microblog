export interface post {
	fetchPosts(): void;
	likePost(): void;
	textAreaToggle(): void;
	replyToPost(): void;
	uuid: string;
	author: string;
	profilePic: string;
	content: string;
	likes: number;
	timestamp: string;
	replyText: string;
	// boostPost: Function;
}
export interface userInfo {
	displayName: string;
	profilePic: string;
	email: string;
}
