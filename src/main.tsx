import { Devvit } from '@devvit/public-api';

Devvit.configure({
  redditAPI: true,
});

Devvit.addMenuItem({
  label: 'Update post flairs',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    const subreddit = await reddit.getCurrentSubreddit();
    const posts = await reddit.getNewPosts({
      subredditName: subreddit.name,
      limit: 1000,
      pageSize: 1000,
    }).all();

    let counter = 0;

    const flairs = await subreddit.getPostFlairTemplates();

    for (const post of posts) {
      counter++;
      if (post.flair?.text?.toLocaleLowerCase().includes('huge')) {
        await reddit.setPostFlair({
          subredditName: subreddit.name,
          postId: post.id,
          ...flairs.find(f => f.text.toLocaleLowerCase().includes('huge'))
        }) 
      } else if (post.flair?.text?.toLocaleLowerCase().includes('round')) {
        await reddit.setPostFlair({
          subredditName: subreddit.name,
          postId: post.id,
          ...flairs.find(f => f.text.toLocaleLowerCase().includes('round'))
        })
      } else if(post.flair?.text?.toLocaleLowerCase().includes('skinny')) {
        await reddit.setPostFlair({
          subredditName: subreddit.name,
          postId: post.id,
          ...flairs.find(f => f.text.toLocaleLowerCase().includes('skinny'))
        })
      } else if(post.flair?.text?.toLocaleLowerCase().includes('face')) {
        await reddit.setPostFlair({
          subredditName: subreddit.name,
          postId: post.id,
          ...flairs.find(f => f.text.toLocaleLowerCase().includes('face'))
        })
      } else if(post.flair?.text?.toLocaleLowerCase().includes('ass')) {
        await reddit.setPostFlair({
          subredditName: subreddit.name,
          postId: post.id,
          ...flairs.find(f => f.text.toLocaleLowerCase().includes('ass'))
        })
      } else if(post.flair?.text?.toLocaleLowerCase().includes('trans')) {
        await reddit.setPostFlair({
          subredditName: subreddit.name,
          postId: post.id,
          ...flairs.find(f => f.text.toLocaleLowerCase().includes('trans'))
        })
      } else {
        counter--;
      }
    }

    context.ui.showToast(`${counter} post flairs updated!`);
  },
});


export default Devvit;
