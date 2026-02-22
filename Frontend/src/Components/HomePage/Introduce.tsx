import "./Home.css";

const Introduce = () => {
    return (
        <>
            {/* Who we are */}
            <section className="whoWeAre">
                <div className="container relative min-w-full mt-20 mb-2 xl:mb-14 flex flex-col items-center gap-4">
                    <h1 className="bg-gradient-to-r from-gray-700 to-gray-400
                        bg-clip-text text-transparent text-3xl md:text-6xl text-left text-shadow-lg pb-2">
                        Who We Are
                    </h1>
                    <p
                        className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-400
                        bg-clip-text text-transparent text-xl md:text-3xl text-center text-shadow-lg w-[75%] lg:w-[50%] pb-2">
                        We are the creators behind this styling outfit lab.
                        This space was built for you — to craft your style and define who you are.
                        We have many stylish components waiting for you to bring it up a new style.
                    </p>
                    <h1
                        className="bg-gradient-to-r from-gray-700 to-gray-400
                        bg-clip-text text-transparent text-2xl md:text-5xl text-center text-shadow-lg pt-4 md:pt-12 pb-2">
                        --Tee--Kla--Mos--
                    </h1>
                    <p className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-400
                        bg-clip-text text-transparent text-xl md:text-3xl text-center text-shadow-lg pb-2">
                        “An outfit means nothing — Until you step inside”
                    </p>
                </div>
            </section>
        </>
    )
}

export default Introduce