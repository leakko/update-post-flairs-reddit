import { Devvit } from '@devvit/public-api';

const categories = ['huge', 'round', 'skinny', 'face', 'ass', 'trans'];

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

      for (const category of categories) {
        const postFlair = post.flair?.text?.toLocaleLowerCase().includes(category) && post.flair;
        const subredditFlair = flairs.find(f => f.text.toLocaleLowerCase().includes(category));
        if (postFlair && subredditFlair && postFlair.text !== subredditFlair.text) {
          await reddit.setPostFlair({
            subredditName: subreddit.name,
            postId: post.id,
            flairTemplateId: subredditFlair.id,
            text: subredditFlair.text,
            cssClass: postFlair.cssClass,
            backgroundColor: subredditFlair.backgroundColor,
            textColor: subredditFlair.textColor,
          });
          counter++;
          break;
        }
      }

      if(!post.flair) {
        counter--;
      }
    }

    context.ui.showToast(`${counter} post flairs updated!`);
  },
});


export default Devvit;
