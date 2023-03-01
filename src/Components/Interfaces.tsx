export interface post {
	likePost(): void;
	textAreaToggle(): void;
	replyToPost(): void;
	uuid: string;
	author: string;
	profilePic: string;
	content: string;
	likes: number;
	timestamp: string;
	showTextArea: boolean;
	replyText: string;
	// boostPost: Function;
}
export interface userInfo {
	displayName: string;
	profilePic: string;
	email: string;
}
