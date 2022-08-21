import React from "react";
import poster from "../../images/home.png";
const HomePage = () => {
  return (
    <>
      <section  className="h-screen contrast-more: pb-10 pt-32 bg-slate-100">
        <div className="relative container px-4   mx-auto">
          <div className="flex flex-wrap items-center -mx-4 mb-10 2xl:mb-14">
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
              <span className="text-lg font-bold text-blue-500 ml-2">
                Create posts to educate
              </span>
              <h2 className="max-w-2xl mt-8 mb-12 text-6xl 2xl:text-8xl text-black font-bold font-heading">
                Pen down your ideas{" "}
                <span className="text-green-400">By creating a post</span>
              </h2>
              <p className="mb-12 lg:mb-16 2xl:mb-24 text-xl text-gray-500">
                Your post must be free from racism and unhealthy words
              </p>
             <div className="flex justify-center lg:justify-start">
             <a
                className=" inline-block  px-12 py-4 text-lg text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-full transition duration-200"
                href="/"
              >
                Read More
              </a>
             </div>
            </div>
            <div className="hidden w-full lg:block lg:w-1/2   px-4">
              <img className="" src={poster} alt={poster} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;