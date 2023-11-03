import { Footer } from "../Footer/Footer"
import { Map } from "../Map/Map"
import { HeroSection } from "./HeroSection/HeroSection"
import './Home.css'
import IconsInfo from "./IconsInfo/IconsInfo"
import { Info } from "./Info/Info"


function Home() {
  return (
    <>
      <HeroSection />
      <Map />
      <IconsInfo />
      <Info />
      <Footer />
    </>
  )
}

export default Home
