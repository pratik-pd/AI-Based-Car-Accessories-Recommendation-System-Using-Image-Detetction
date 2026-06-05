  import Navbar from "../components/Navbar";
  import Hero from "../components/Hero";
  import Features from "../components/Features";
  import Stats from "../components/Stats";
  // import UploadBox from "../components/UploadBox";
  import Testimonials from "../components/Testimonials";
  import Footer from "../components/Footer";

  function Home() {
    return (
      <div className="bg-black min-h-screen text-white pt-24">

        {/* NAVBAR */}
        <Navbar />

        {/* HERO */}
        <Hero />

        <Features/>

        <Stats/>

        {/* AI ANALYZER */}
        {/* <UploadBox /> */}

        <Testimonials/>

        <Footer/>



      </div>
    );
  }

  export default Home;