import { ProfileDetailsProps } from "@/types";
import { getAllProfiles } from "@/lib/actions/profile.actions";
import SelectMenu from "./SelectMenu";

const ProfileDetails = async ({
  showCompany,
  showIndustry,
}: ProfileDetailsProps) => {
  const { currentProfileId, profiles } = await getAllProfiles();

  if (!currentProfileId) return;

  const currentProfile = profiles.find(
    (profile) => profile._id === currentProfileId
  );

  return (
    <div className="grid grid-cols-3 max-w-[600px] gap-4 place-content-start content-stretch">
      <SelectMenu data={profiles} currentProfile={currentProfile} />
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
