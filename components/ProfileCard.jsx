import Image from "next/image"
export default function ProfileCard({
    userData,
    totalPrompts
}) {
    if(!userData)
    return <></>
  return (
    <div className='glassmorphism items-center justify-between w-full flex mt-5'>
        <div className="font-iter font-bold text-base orange_gradient">
            <span >
                @{userData.username}
            </span>
            <br/>
            <span>
                {userData.email}
            </span>
            <br/>
            <span>
                Total Prompts: {totalPrompts}
            </span>
        </div>
        <Image
            width={40}
            height={40}
            alt="Profile Image"
            src={userData.image}
            className="rounded-full"
        />
    </div>
  )
}

