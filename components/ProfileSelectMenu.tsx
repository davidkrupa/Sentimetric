import {
  getAllProfiles,
  getCurrentProfileId,
} from "@/lib/actions/profile.actions";
import SelectMenu from "./SelectMenu";

const ProfileSelectMenu = async () => {
  const profiles = await getAllProfiles();
  const currentId = await getCurrentProfileId();

  return <SelectMenu data={profiles} current={currentId} />;
};

export default ProfileSelectMenu;
