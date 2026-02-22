import { useState, useEffect, useRef } from "react";
import { HeadPic1, HeadPic2, HeadPic3 } from '../../assets/Home/HeadBannerAssets' 
import "./Home.css";

const Head_banners = [
    { id: 1, img: HeadPic1 },
    { id: 2, img: HeadPic2 },
    { id: 3, img: HeadPic3 },
]

const HeadBanner = () => {
    const [showSliding, setSliding] = useState<"none" | "left" | "right">("none");
    const [currHeadbanner, setHeadbanner] = useState(Head_banners);
    const [DotIndex, setDotIndex] = useState(0);

    const SwipeTimer =  useRef<number | null>(null);

    const Headbanner = useRef<HTMLDivElement | null>(null);
    let startX: number, startY: number;
    let Isdragging = false;
    let Issliding = false;

    const SwipeBanner = (Dir: "left" | "right") => {

        ResetAutoSwipe();

        setDotIndex(prevIndex => {
            if (Dir === "left") {
                return prevIndex - 1 < 0 ? currHeadbanner.length - 1 : prevIndex - 1;
            } else {
                return prevIndex + 1 >= currHeadbanner.length ? 0 : prevIndex + 1;
            }
        });

        setSliding(Dir);

        setTimeout(() => {
            setHeadbanner(prev => {
                let updated = [...prev];
                if (Dir === "left") {
                    const lastBanner = updated.pop();
                    if (lastBanner) updated.unshift(lastBanner);
                } else {
                    const firstBanner = updated.shift();
                    if (firstBanner) updated.push(firstBanner);
                }
                return updated;
            });
            setSliding("none");
        }, 1000);
    };

    const autoSwipe = () => {
        SwipeTimer.current = window.setInterval(() => {
            SwipeBanner("right");
        }, 5000);
    }

    const ResetAutoSwipe = () => {
        if(SwipeTimer.current) clearInterval(SwipeTimer.current);
        autoSwipe();
    }
    
    useEffect(() => {
        autoSwipe();
        return () => {if(SwipeTimer.current) clearInterval(SwipeTimer.current)};
    }, [])

    const dragStart = (e: TouchEvent) => {
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
        if (!Issliding) {
            Isdragging = true;
        }
    }

    const drag = (e: TouchEvent) => {
        if (!Isdragging) return;

        const currentPageX = e.touches ? e.touches[0].pageX : startX;
        const diffX = currentPageX - startX;

        const currentPageY = e.touches ? e.touches[0].pageY : startY;
        const diffY = currentPageY - startY;

        if (Math.abs(diffY) > Math.abs(diffX)) {
            Isdragging = false;
            return;
        }

        if (Math.abs(diffX) > 5) {
            e.preventDefault();
            if (diffX > 0) {
                SwipeBanner("left");
            }
            else {
                SwipeBanner("right");
            }
            Isdragging = false;
            Issliding = true;
        }

        setTimeout(() => {
            Issliding = false;
        }, 1000)
    }

    const dragEnd = () => {
        if(!Isdragging) return;
        Isdragging = false;
    }

    useEffect(() => {
        const Clone_HeadBanner = Headbanner.current;
        if(!Clone_HeadBanner) return;

        Clone_HeadBanner.addEventListener("touchstart", dragStart, {passive : true});
        Clone_HeadBanner.addEventListener("touchmove", drag, {passive : false});
        Clone_HeadBanner.addEventListener("touchend", dragEnd, {passive : true});

        return () => {
            Clone_HeadBanner.removeEventListener("touchstart", dragStart);
            Clone_HeadBanner.removeEventListener("touchmove", drag);
            Clone_HeadBanner.removeEventListener("touchend", dragEnd);
        }
    }, [])

    return (
        <>
            {/* <!-- Head_Banners --> */}
            <section>
                <div ref = {Headbanner} className="relative bg-black/70 mt-14 w-full min-h-[50vh] sm:min-h-[32rem] lg:min-h-[75vh] xl:min-h-[65vh]">
                    <div
                        className={`Head_Banner absolute top-0 w-full h-full border-b-2 border-b-black z-10 overflow-hidden 
                                    ${showSliding === "left" ? "Prev" : (showSliding === "right" ? "Next" : "")}`}>

                        <div className="Head_Banner_List absolute flex justify-center w-full h-full -z-40">
                            {currHeadbanner.map(banner => (
                                <div key={banner.id} className="Head_side_Banner absolute h-full">
                                    <img src={banner.img} alt={`picture${banner.id}`} className="w-full h-full object-cover" />
                                    <div className="absolute w-full h-6 top-[90%] lg:top-[95%] flex justify-center items-start gap-4">
                                        {currHeadbanner.map((_, i) => (
                                            <button key={i} className={`w-4 h-4 rounded-full ${i === DotIndex ? "bg-green-500" : "bg-gray-200"}`}></button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute top-0 min-w-full h-full hidden xl:flex justify-between">
                        <button onClick={() => SwipeBanner("left")} className="arrow_left w-18 min-h-full flex items-center justify-center hover:bg-gray-950/50 z-40">
                            <span
                                className="font-bold text-white p-2 rounded-lg text-[4rem] cursor-pointer select-none hover:scale-105 transition-all ease lg:text-[5rem]">&#10094;</span>
                        </button>
                        <button onClick={() => SwipeBanner("right")} className="arrow_right w-18 min-h-full flex items-center justify-center hover:bg-gray-950/50 z-40">
                            <span
                                className="font-bold text-white p-2 rounded-lg text-[4rem] cursor-pointer select-none hover:scale-105 transition-all ease lg:text-[5rem]">&#10095;</span>
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HeadBanner