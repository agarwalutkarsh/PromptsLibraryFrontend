import Feed from "@/components/Feed"
import { Typography } from "@mui/material"


const Home = () => {
  return (
    // Home Page
    <>
      <div className="flex flex-col text-center w-full">
        <h1  className="head_text">Discover & Share</h1>
        <br className="max-md:hidden" />
        <p className="orange_gradient head_text">AI Powered Prompts</p>
        <p className="desc m-auto">Open Source Tool for the mordern world to discover, create and share creative AI powered prompts</p>
      </div>

      <Feed />
    </>
  )
}

export default Home
