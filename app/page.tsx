import HomeExperience from "@/components/HomeExperience";
import { getAllWishes } from "@/lib/services/wishes";

export default async function Home() {
  const wishes = await getAllWishes();

  return <HomeExperience wishes={wishes} />;
}
