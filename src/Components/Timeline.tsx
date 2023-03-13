import {useContext, useEffect} from 'react';
import {post, replies, userInfo} from './Interfaces';
import MicroBlog from './MicroBlog';
import {Context} from '../../App';
import {supabase} from '../../supabaseClient';
import {nanoid} from 'nanoid';
import Reply from './Reply';
import Footer from './Footer';

export default function Timeline() {
	const {
		user,
		post,
		setPostsArray,
		postsArray,
		postText,
		setPostText,
		replies,
		setReplies,
		repliesArray,
		setRepliesArray,
		replyText,
		setReplyText,
		fetchPosts,
		fetchReplies,
		renderReplies,
	} = useContext(Context) as {
		user: userInfo;
		post: post[];
		boostPost: Function;
		postsArray: any[];
		setPostsArray: any;
		postText: string;
		setPostText: any;
		handlePostChange: Function;
		replyText: string;
		setReplyText: any;
		replies: replies[];
		setReplies: any;
		repliesArray: any[];
		setRepliesArray: any;
		alreadyClicked: boolean;
		setAlreadyClicked: any;
		renderReplies: Function;
		fetchReplies: Function;
		fetchPosts: Function;
	};
	
	useEffect(() => {
		fetchPosts();
		renderReplies();
	}, []);

	useEffect(() => {
		setReplies(
			postsArray.map(post => ({
				post,
				replies: repliesArray.filter(reply => reply.repliedTo == post.uuid),
			}))
		);
		renderReplies();
	}, [postsArray]);

	async function savePost(event: any) {
		event.preventDefault();
		const {data, error} = await supabase.from('posts').insert([
			{
				content: postText,
				uuid: nanoid(),
				author: user.displayName,
				likes: 0,
				profilePic: user.profilePic,
			},
		]);
		fetchPosts();
		fetchReplies();
		renderReplies();
		console.error(error);
		setPostText('');
	}
	
	return (
		<div className="flex px-2 md:px-32 flex-col justify-center min-h-screen dark:bg-black bg-white w-screen dark:text-white text-black">
			{user.displayName !== undefined || null ? (
				<div className="xl:text-3xl md:text-2xl text-center">
					<h1>{`Hi, ${user.displayName} check out what is happening...`}</h1>
					<form>
						<div className="flex mt-3 items-center flex-col">
							<label className="" htmlFor="post">
								Make post
							</label>
							<textarea
								onChange={event => setPostText(event.target.value)}
								className="md:w-1/2 w-5/6 dark:bg-black dark:border-white border dark:text-white text-black"
								id="post"
								value={postText}
								autoComplete="on"
							/>
							<button onClick={e => savePost(e)} className="">
								Send
							</button>
						</div>
					</form>
				</div>
			) : (
				<></>
			)}
			<div id="post-card" className="flex-col flex items-center text-2xl">
				<div className="flex flex-col lg:w-[50rem] ">
					{replies.map(
						({post, replies}): JSX.Element => (
							<div key={post.uuid}>
								<MicroBlog
									post={post}
									key={post.uuid}
									fetchPosts={() => fetchPosts()}
									fetchReplies={() => fetchReplies()}
									uuid={post.uuid}
									author={post.author}
									profilePic={post.profilePic}
									content={post.content}
									likes={post.likes}
									timestamp={post.timestamp}
									replyText={replyText}
									length={replies.length} 
									renderReplies={renderReplies()}					/>
								{replies.map((reply: replies) => (
									<Reply
										reply={reply}
										key={reply.uuid}
										fetchPosts={() => fetchPosts()}
										fetchReplies={() => fetchReplies()}
										renderReplies={()=>renderReplies()}
										uuid={reply.uuid}
										author={reply.author}
										profilePic={reply.profilePic}
										content={reply.content}
										likes={reply.likes}
										timestamp={reply.timestamp}
										replyText={replyText}
										repliedTo={''}
										post={post}
										replies={[]} 
										replied_to={''}
									/>
								))}
							</div>
						)
					)}{' '}
				</div>
			</div>
			<Footer/>
		</div>
	);
}
