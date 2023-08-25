import PromptCardList from "./PromptCardList"
import PromptSkeletonList from "./PromptSkeletonList"
import ProfileCard from "./ProfileCard"
const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,

}) => {
  return (
    <section className="w-full ">
      <h1 className="head_text text-left">
          <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">
        {desc}
      </p>
      <ProfileCard 
        userData={data && data[0]?.creator}
        totalPrompts = {data && data.length}
      />
      {
        !data?<PromptSkeletonList/>:
        <PromptCardList 
        data={data}
        handleEdit={handleEdit}
        handleDelete = {handleDelete}
      />
      }
     
    </section>
  )
}

export default Profile