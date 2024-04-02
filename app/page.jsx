import Feed from "@/components/Feed"
import { Typography } from "@mui/material"


const Home = () => {
  return (
    <>
      <div className="flex flex-col text-center w-full">
        <Typography component='h1' className="head_text">Discover & Share</Typography>
        <br className="max-md:hidden" />
        <Typography className="orange_gradient head_text">AI Powered Prompts</Typography>
        <Typography className="desc m-auto">Open Source Tool for the mordern world to discover, create and share creative AI powered prompts</Typography>
      </div>

      <Feed />
    </>
  )
}

export default Home
