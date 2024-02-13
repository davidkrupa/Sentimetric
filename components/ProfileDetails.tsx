import { ProfileDetailsProps } from "@/types";
import ProfileSelectMenu from "./ProfileSelectMenu";
import {
  getAllProfiles,
  getCurrentProfileId,
} from "@/lib/actions/profile.actions";

const ProfileDetails = async ({
  showCompany,
  showIndustry,
}: ProfileDetailsProps) => {
  // add action to get current profile data in one step
  const profiles = await getAllProfiles();
  const currentId = await getCurrentProfileId();

  const currentProfile = profiles.find((profile) => profile._id === currentId);

  return (
    <div className="grid grid-cols-3 max-w-[600px] gap-4 place-content-start content-stretch">
      <ProfileSelectMenu />
      {showCompany && (
        <div className="grid place-content-center">
          <p className="line-clamp-1">{currentProfile?.company}</p>
        </div>
      )}
      {showIndustry && (
        <div className="grid place-content-center">
          <p className="line-clamp-1">{currentProfile?.industry}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
