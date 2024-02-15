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
    <div className="flex items-center gap-8 xl:gap-12 max-w-[600px]">
      <div>
        <SelectMenu data={profiles} currentProfile={currentProfile} />
      </div>
      <div className="flex xl:gap-12">
        {showCompany && (
          <p className="hidden md:block md:max-w-36 xl:max-w-48 truncate">
            {currentProfile?.company}
          </p>
        )}
        {showIndustry && (
          <p className="hidden xl:block xl:max-w-48 truncate">
            {currentProfile?.industry}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
