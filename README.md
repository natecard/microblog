Subforuma Microblog
Inspired by Twitter, this app was built using Vite, React, TypeScript, Supabase and CSS done using TailwindCSS

Features
Toggle dark / light theme based on system theme
Create, reply, like public posts
PostgreSQL database and realtime functions
Responsive design
Google Sign In
Sign Out
Magic Link Sign In
For Google Sign In, I used Supabase Auth. This allowed for a good base to pull user data and display profile pictures, display names, etc to build out the basic "tweets"

The PostgreSQL database from Supabase gave me the ability to build my own SQL functions to render the replies in the timeline. By doing this I was able to sort and sequence the replies by the number of likes that each had received, simulating a sort of social media algorithm promoting more liked content to the top of the replies.
