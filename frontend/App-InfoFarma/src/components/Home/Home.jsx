import { Home4 } from "../Home4/Home4"
import { HeroSection } from "./HeroSection/HeroSection"
import './Home.css'
import IconsInfo from "./Icons&Info"
import { Info } from "./Info"
export const Home = () => {
  return (
    <>
      <HeroSection/>
      <IconsInfo/>
      <Info/>
      <Home4/>
    </>
  )
}
