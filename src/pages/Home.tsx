import Intro from "../components/Intro";
import Navbar from "../components/Navbar";
import LocationGamification from "../components/LocationGamification";
import UnlimitedLocation from "../components/UnlimitedLocation";

function Home() {
  return (
    <>
      <Navbar />
      <Intro />
      <LocationGamification />
      <UnlimitedLocation />
    </>
  );
}

export default Home;
