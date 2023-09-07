import { currentProfile } from "@/lib/current-profile";

const NavigationSidebar = async () => {
  const profile = await currentProfile();
  if (!profile) {
    return null;
  }
  console.log(profile);
  return <div>NavigationSidebar</div>;
};

export default NavigationSidebar;
