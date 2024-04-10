import Feed from "@/components/Feed"
import { Typography } from "@mui/material"


const Home = () => {
  return (
    // Home Page
    <>
      <div className="flex flex-col text-center w-full">
        <Typography component='h1' className="mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl">Discover & Share</Typography>
        <br className="max-md:hidden" />
        <Typography className="orange_gradient mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl">AI Powered Prompts</Typography>
        <p className="mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, cupiditate, ducimus error cumque commodi rerum, odio voluptatibus exercitationem ipsam maiores officia voluptates quidem. Doloribus recusandae itaque molestias, tempora accusantium aliquid?</p>
        <Typography className="desc m-auto">Open Source Tool for the mordern world to discover, create and share creative AI powered prompts</Typography>
      </div>

      <Feed />
    </>
  )
}

export default Home
