import listHelper from '../utils/list_helper';
const { dummy, totalLikes, favoriteBlog } = listHelper;

const emptyBlogs = [];

const multiBlog = [
  {
    title: 'test',
    author: 'testy mctesterson',
    url: 'test.com',
    likes: 16
  },
  {
    title: 'test',
    author: 'testy mctesterson',
    url: 'test.com',
    likes: 14
  },
  {
    title: 'test',
    author: 'testy mctesterson',
    url: 'test.com',
    likes: 15
  }
];

test('dummy returns 1', () => {
  expect(dummy(emptyBlogs)).toBe(1);
});

test('empty list of blogs is zero likes', () => {
  expect(totalLikes(emptyBlogs)).toBe(0);
});

test('list of one blogs likes count is that of the blog', () => {
  const oneBlog = [
    {
      title: 'test',
      author: 'testy mctesterson',
      url: 'test.com',
      likes: 14,
      id: 123
    }
  ];

  expect(totalLikes(oneBlog)).toBe(oneBlog[0].likes);
});

test('list of blogs with multiple blogs is calculated right', () => {
  expect(totalLikes(multiBlog)).toBe(45);
});

test('favorite blog is found in list of blogs', () => {
  expect(favoriteBlog(multiBlog)).toEqual(multiBlog[0]);
});
