import { Home4 } from "../Home4/Home4"
import { Footer } from "../Footer/Footer"
import { HeroSection } from "./HeroSection/HeroSection"
import './Home.css'
import IconsInfo from "./IconsInfo/Icons&Info"
import { Info } from "./Info/Info"
export const Home = () => {
  return (
    <>
      <HeroSection />
      <IconsInfo />
      <Info />
      {/*<Home />*/}
      <Footer />
    </>
  )
}
