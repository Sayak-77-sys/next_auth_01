export default function UserProfile({params}: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">Profile page <span className="p-2  rounded bg-orange-500 text-black ml-2"> 
        {
params.id
        }</span></p>
    </div>
  );
}
