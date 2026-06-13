export interface LoveStoryItem {
  year: string;
  title: string;
  image: string;
  description: string;
}

export const loveStory: LoveStoryItem[] = [
  {
    year: "2021",
    title: "First Meet",
    image: "/story/story1.png",
    description:
      "Our beautiful journey began with a simple smile and a conversation that neither of us wanted to end.",
  },
  {
    year: "2023",
    title: "Falling in Love",
    image: "/story/story2.png",
    description:
      "What started as friendship slowly blossomed into something deeper, and we knew we had found our person.",
  },
  {
    year: "2026",
    title: "Engagement",
    image: "/story/story3.png",
    description:
      "Surrounded by the people we love most, we promised each other forever.",
  },
];
