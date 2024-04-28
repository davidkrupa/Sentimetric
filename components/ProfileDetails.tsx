import { ProfileDetailsProps } from "@/types";
import { getAllProfiles } from "@/lib/actions/profile.actions";
import SelectMenu from "./SelectMenu";

const ProfileDetails = async ({
  showCompany,
  showIndustry,
}: ProfileDetailsProps) => {
  const { data, error } = await getAllProfiles();

  if (!data) return;

  const currentProfile = data?.profiles?.find(
    (profile) => profile._id === data.currentProfileId
  );

  return (
    <div className="flex items-center gap-8 xl:gap-12 max-w-[600px]">
      <div>
        <SelectMenu data={data.profiles} currentProfile={currentProfile} />
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
