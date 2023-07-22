const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0 : blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((favorite, blog) => {
      if (blog.likes > favorite.likes) {
        return blog;
      } else {
        return favorite;
      };
    });
};

export default { dummy, totalLikes, favoriteBlog };
