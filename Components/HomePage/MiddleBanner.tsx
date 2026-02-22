import { useState, useEffect } from 'react'
import './Home.css';
import { Shirt1, Shirt2, Shirt3, ShirtModel1, ShirtModel2, ShirtModel3
        ,Shoes1, Shoes2, Shoes3, ShoesModel1, ShoesModel2, ShoesModel3
        ,Watch1, Watch2, Watch3, WatchModel1, WatchModel2, WatchModel3
        ,ShirtIcon, ShoesIcon, WatchIcon,
} from '../../assets/Home/BannerAssets'

const IconPicture = [ShirtIcon, ShoesIcon, WatchIcon];

type VariableSlide = {
    bgImage: string;
    modelImage: string;
    name: string;
    detail: string;
    detailURL: string;
    buyURL: string;
};

type VariableProduct = {
    iconURL: string;
    slides: VariableSlide[];
}

type VariablebannerData = {
    shirt: VariableProduct;
    shoes: VariableProduct;
    watch: VariableProduct;
}

const bannerData: VariablebannerData = {
    // Access the banners with bannerData's property name
    // Access the slides by slide's number.

    shirt: {
        iconURL: "",
        slides: [
            {
                bgImage: `${Shirt1}`,
                modelImage: `${ShirtModel1}`,
                name: "The Maverick Bomber Jacket",
                detail: `เป็นแจ็คเก็ตหนังแท้ดีไซน์คลาสสิกที่ถูกปรับให้มีความเท่และโดดเด่นไม่เหมือนใคร
                            ตัวเสื้อทำจากหนังวัวคุณภาพสูงที่มีการทำฟอกสีแบบพิเศษ
                            ทำให้เกิดลวดลายและร่องรอยคล้ายผ่านการใช้งานจริง
                            ซึ่งช่วยเสริมบุคลิกที่ดูเข้มแข็งและมีเรื่องราว`,
                detailURL: "",
                buyURL: "",
            },
            {
                bgImage: `${Shirt2}`,
                modelImage: `${ShirtModel2}`,
                name: "Coastal Breeze",
                detail:
                    "เสื้อเชิ้ตสีฟ้าอ่อนที่มอบความรู้สึกสดชื่นและผ่อนคลายเหมือนลมทะเล ยกระดับลุคของคุณให้ดูดีมีสไตล์แต่ยังคงความสบาย ไม่ว่าจะสวมใส่ในวันทำงานหรือวันพักผ่อน ก็ดูดีได้อย่างไม่ซับซ้อน",
                detailURL: "https://rickrollwebsite.univer.se/secret",
                buyURL: "",
            },
            {
                bgImage: `${Shirt3}`,
                modelImage: `${ShirtModel3}`,
                name: "UnderNight Jacket",
                detail: `เสื้อแจ็คเก็ตหนังสีดำที่ออกแบบมาเพื่อความเท่เหนือกาลเวลา ด้วยดีไซน์ที่เรียบง่ายแต่แฝงไว้ด้วยความประณีต ตัวเสื้อทำจากหนังแท้คุณภาพสูง มอบสัมผัสที่นุ่มสบายและทนทาน
        โดดเด่นภายใต้แสงไฟ ณ ยามราตรี`,
                detailURL: "",
                buyURL: "",
            },
        ],
    },

    shoes: {
        iconURL: "",
        slides: [
            {
                bgImage: `${Shoes1}`,
                modelImage: `${ShoesModel1}`,
                name: "CONVERSE ADDICT 2024",
                detail:
                    "ตำนานสตรีทสไตล์ที่กลับมาในเวอร์ชันพรีเมียม พร้อมดีไซน์ที่ผสานความคลาสสิกกับความทันสมัยอย่างลงตัว! พร้อมพาคุณทะยานสู่ทุกการเดินทาง ด้วยสไตล์ที่ไม่เคยหยุดนิ่งและความสบายที่คุณวางใจได้ — รองเท้าคู่ใหม่ที่ทุกคนต้องมี!",
                detailURL: "",
                buyURL: "",
            },

            {
                bgImage: `${Shoes2}`,
                modelImage: `${ShoesModel2}`,
                name: "New Balance 327",
                detail:
                    "หยิบเอากลิ่นอายยุค 70 มาผสมกับดีไซน์โมเดิร์นได้อย่างลงตัว อัปเปอร์ผสมหนังกลับและไนลอนเบา สวมใส่สบายทุกย่างก้าว พร้อมพื้นลายดอกยางแบบ trail ที่ให้การยึดเกาะมั่นใจ — ไม่ว่าจะเดินเล่นในเมือง หรือลุยทริปเบา ๆ",
                detailURL: "",
                buyURL: "",
            },

            {
                bgImage: `${Shoes3}`,
                modelImage: `${ShoesModel3}`,
                name: "Adizero Evo SL",
                detail:
                    "รองเท้าวิ่งน้ำหนักเบาที่ออกแบบเพื่อความเร็วอย่างแท้จริง ผสานโฟม Lightstrike Pro เต็มความยาว ให้สัมผัสนุ่ม เด้ง และตอบสนองทุกจังหวะก้าวอย่างมีพลังพร้อม upper ที่โปร่งสบาย ระบายอากาศดีเยี่ยม ทะยานสู่เป้าหมายใหม่ ด้วยความเร็วที่ควบคุมได้ในทุกย่างก้าว",
                detailURL: "",
                buyURL: "",
            },
        ],
    },

    watch: {
        iconURL: "",
        slides: [
            {
                bgImage: `${Watch1}`,
                modelImage: `${WatchModel1}`,
                name: "The Maverick Bomber Jacket",
                detail: ` – ต้นกำเนิดแห่งความแกร่ง กลับมาอีกครั้งด้วยจิตวิญญาณของรุ่นแรกในแบบที่เข้มขึ้นกว่าเดิม
                            สืบทอดดีไซน์จาก DW-5000C รุ่นออริจินัลปี 1983 แต่อัปเกรดด้วยวัสดุสมัยใหม่และโครงสร้าง 
                            G-SHOCK แบบ Core Guard ที่ต้านทานแรงกระแทกได้เหนือระดับ หน้าจอดิจิทัลลายตารางในกรอบสี่เหลี่ยมอันเป็นเอกลักษณ์ 
                            ผสานสีดำด้านกับแถบสีแดงทองแบบเรโทร สะท้อนจิตวิญญาณของความ “ปฏิเสธความเปราะบาง” ที่ G-SHOCK ยึดมั่นมาตลอด`,
                detailURL: "",
                buyURL: "",
            },

            {
                bgImage: `${Watch2}`,
                modelImage: `${WatchModel2}`,
                name: "Seiko Astron SSH175",
                detail: `– ความแกร่งแนวใหม่ในร่างคอมแพกต์ เข้มทุกองศาในสไตล์ G-STEEL GST-B600 คือวิวัฒนาการล่าสุดจาก G-STEEL 
                           ที่ผสมผสานความแข็งแกร่งของโลหะเข้ากับความล้ำของเทคโนโลยีในขนาดที่กะทัดรัดกว่าเดิม 
                           โครงสร้าง Carbon Core Guard ช่วยให้ตัวเรือนบาง เบา แต่ยังทนทานในแบบที่ G-SHOCK ต้องเป็น
                           หน้าปัดแบบเลเยอร์ซ้อนด้วยลวดลายโลหะเฉียบคม พร้อม Bluetooth® Smart Link, Tough Solar และไฟ LED สว่างจัด ใช้งานง่ายในทุกสภาพแสง`,
                detailURL: "",
                buyURL: "",
            },

            {
                bgImage: `${Watch3}`,
                modelImage: `${WatchModel3}`,
                name: "EDIFICE WINDFLOW ECB-2200CB-2A",
                detail:
                    "– ความเร็วในทุกจังหวะ ดีไซน์แรงบันดาลใจจากมอเตอร์สปอร์ต \nโครงสร้างบางเบา วัสดุคุณภาพสูง พร้อม Smartphone Link, Tough Solar, จับเวลาแบบ Lap Timer และระบบบอกเวลาทั่วโลก — ไม่ว่าจะเป็นการเดินทาง ธุรกิจ หรือการใช้ชีวิตที่ไม่เคยหยุดนิ่ง WINDFLOW ก็พร้อมเคลื่อนที่ไปกับคุณทุกวินาที",
                detailURL: "",
                buyURL: "",
            },
        ],
    },
};

const MiddleBanner = () => {
    
    const [bannerIndex, setbannerIndex] = useState([0, 0, 0]);

    const [bgImage, setbgImage] = useState([""]);
    const [modelImage, setmodelImage] = useState([""]);
    const [prodName, setprodName] = useState([""]);
    const [prodDetail, setprodDetail] = useState([""]);

    const [IconUrl, setIconUrl] = useState([""]);
    const [ModelUrl, setModelUrl] = useState([""]);
    const [DetailBtnUrl, setDetailBtnUrl] = useState([""]);
    const [BuyBtnUrl, setBuyBtnUrl] = useState([""]);

    const [IsSlided, setSlided] = useState([true, true, true]);
    const [Isfaded, setFaded] = useState([true, true, true]);

    useEffect(() => {
        const bannerObj = Object.keys(bannerData) as (keyof typeof bannerData)[];
        bannerObj.forEach((value, idx) => {

            showBanner(bannerIndex[idx], value);
        });
    }, []);

    function showBanner(nSlide: number, banner: keyof typeof bannerData) {
        const bannerSlides = bannerData[banner].slides;
        const objKeys = Object.keys(bannerData) as (keyof typeof bannerData)[];
        const index = objKeys.indexOf(banner);

        // ตรวจสอบขอบเขตของ nSlide ให้วนกลับ
        if (nSlide > bannerSlides.length - 1) {
            nSlide = 0; // กลับไปสไลด์แรก
        }
        if (nSlide < 0) {
            nSlide = bannerSlides.length - 1; // สไลด์สุดท้าย
        }

        const slideData = bannerSlides[nSlide]; // เข้าถึงสไลด์ถูกต้อง

        // บันทึกตำแหน่ง Slide ปัจจุบัน

        setbannerIndex(oldArrSlide => {
            const newArrSlide = [...oldArrSlide];
            newArrSlide[index] = nSlide;
            return newArrSlide
        });

        const changeArrayString = (oldArray: string[], input: string) => {
            const newArrSlideData = [...oldArray];
            newArrSlideData[index] = input;
            return newArrSlideData
        }

        const changeArrayBoolean = (oldArray: boolean[], input: boolean) => {
            const newArrSlideData = [...oldArray];
            newArrSlideData[index] = input;
            return newArrSlideData
        }

        setbgImage((oldArrSlideData) => {
            return changeArrayString(oldArrSlideData, slideData.bgImage)
        });
        setmodelImage((oldArrSlideData) => {
            return changeArrayString(oldArrSlideData, slideData.modelImage)
        });
        setprodName((oldArrSlideData) => {
            return changeArrayString(oldArrSlideData, slideData.name)
        });
        setprodDetail((oldArrSlideData) => {
            return changeArrayString(oldArrSlideData, slideData.detail)
        });

        setSlided((oldArrSlideData) => {
            setTimeout(() => {
                setSlided(innerArr => {
                    return changeArrayBoolean(innerArr, true)
                });
            }, 50);
            return changeArrayBoolean(oldArrSlideData, false)
        })
        setFaded((oldArrSlideData) => {
            setTimeout(() => {
                setFaded(innerArr => {
                    return changeArrayBoolean(innerArr, true)
                });
            }, 50);
            return changeArrayBoolean(oldArrSlideData, false)
        })

        setIconUrl((oldArrSlideData) => {
            return changeArrayString(oldArrSlideData, bannerData[banner].iconURL)
        });

        setModelUrl((oldArrSlideData) => {
            return changeArrayString(oldArrSlideData, slideData.detailURL)
        });

        setDetailBtnUrl((oldArrSlideData) => {
            return changeArrayString(oldArrSlideData, slideData.detailURL)
        });

        setBuyBtnUrl((oldArrSlideData) => {
            return changeArrayString(oldArrSlideData, slideData.buyURL)
        });
    }

    function plusBanner(n: number, banner: keyof typeof bannerData) {
        const objKeys = Object.keys(bannerData);
        const index = objKeys.indexOf(banner);
        showBanner(bannerIndex[index] + n, banner);
    }

    function getToBanner(slide: number, banner: keyof typeof bannerData) {
        showBanner(slide, banner);
    }

    function checkUrl(url: string) {
        if (url.trim() === "") {
            alert("There is no link now.");
            return false
        }
        return true
    }

    function UrlBanner(url: string) {
        if (!checkUrl(url)) return;

        window.location.href = url;
    }

    return (
        <>
            {/* <!-- middle Banners --> */}
            <section className="w-screen pt-20 pb-6">
                <div className="banner-container flex flex-col items-center gap-10 lg:mx-10">
                    {Object.keys(bannerData).map((data, index) => (
                        <div key={`${data}${index}`} className={`banner ${data} flex flex-col relative rounded-lg overflow-hidden gap-20 w-full max-w-[1400px] bg-black/90 
                                        lg:flex-row lg:h-[400px] lg:gap-0 lg:bg-transparent`}>
                            <div
                                className="banner-icon hidden absolute top-70 left-0 lg:inline w-[100px] h-[100px] p-2 rounded-md bg-gray-200 cursor-pointer select-none hover:scale-110 transition-all ease"
                                onClick={() => UrlBanner(IconUrl[index])}>
                                <img src={IconPicture[index]} alt={`${data}Icon`}
                                    className="w-full h-full object-cover" />
                            </div>

                            <div className="banner-content flex flex-col items-center gap-5 w-full h-full lg:flex-row  ">
                                {/* Background-Image w-1400px h-400  */}
                                <div className="banner-slide w-full h-full overflow-hidden lg:absolute lg:-z-1 ">
                                    <img src={bgImage[index] || "/placeholder.jpg"} alt="bannerBG" className={`w-full h-full object-cover ${IsSlided[index] ? "slideTo-Left" : "opacity-0"}`} />
                                </div>


                                <div className="banner-model flex flex-row items-center gap-5 justify-center w-full  lg:justify-end ">

                                    <span
                                        className="banner-arrow prev font-bold text-white p-2 rounded-lg text-[4rem] backdrop-blur-xs bg-gray-500/20 cursor-pointer select-none hover:bg-black/60 hover:scale-105 transition-all ease lg:text-[5rem]"
                                        onClick={() => plusBanner(-1, data as keyof VariablebannerData)}>&#10094;
                                    </span>

                                    <div
                                        className="model flex flex-col items-center gap-5 bg-white/20 rounded-lg hover:scale-105 transition-all ease lg:backdrop-blur-xs">

                                        <div className="image h-[300px] w-[250px] p-5 overflow-hidden hover:cursor-pointer"
                                            onClick={() => UrlBanner(ModelUrl[index])}>
                                            <img src={modelImage[index] || "/placeholder.jpg"} alt={`${data}Model`} className={`w-full h-full rounded-md object-contain ${IsSlided[index] ? "slideTo-Left" : "opacity-0"}`} />
                                        </div>

                                        <div className="banner-dots flex w-full items-center p-3 rounded-xl bg-gray-400/20 justify-between gap-5 ">
                                            {Object.keys(bannerData).map((_, i) => (
                                                <div key={`dots${i}`}
                                                    className={`banner-dot grow h-[20px] bg-black/80 rounded-xl cursor-pointer hover:bg-white/50 hover:scale-110 transition-all ease
                                                              ${i === bannerIndex[index] ? "dot-active" : ""}`}
                                                    onClick={() => getToBanner(i, data as keyof VariablebannerData)}>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                    <span
                                        className="banner-arrow next font-bold text-white p-2 rounded-lg bg-gray-500/20 cursor-pointer  select-none  hover:bg-black/60 hover:scale-105 transition-all ease text-[4rem] backdrop-blur-xs  lg:text-[5rem]"
                                        onClick={() => plusBanner(1, data as keyof VariablebannerData)}>&#10095;
                                    </span>
                                </div>
                                <div className="banner-details flex flex-col items-center justify-between gap-5 h-full">
                                    <div
                                        className="info p-5 grow bg-black/70 border-l-5 lg:backdrop-blur-xs w-[400px] min-h-[250px] max-h-[300px] overflow-y-auto ">
                                        <p className={`prodName text-white break-words text-2xl mb-5 font-bold
                                                      ${Isfaded[index] ? "fadeIn-item" : "opacity-0"}`}>{prodName[index]}</p>
                                        <hr className="detail-line text-white border-2" />
                                        <p className={`prodDetail text-white break-words text-md mt-5 
                                                      ${Isfaded[index] ? "fadeIn-item" : "opacity-0"}`}>{prodDetail[index]}</p>
                                    </div>
                                    <div className="banner-buttons flex justify-center w-full mb-5 gap-5 ">

                                        <button
                                            className="prodBtn grow text-[0.75rem] max-w-[150px]  lg:text-[1rem] p-3 rounded-md text-white bg-black/40 border-2 border-white cursor-pointer hover:scale-110 transition-all ease"
                                            onClick={() => UrlBanner(DetailBtnUrl[index])}>ดูรายละเอียดสินค้า</button>


                                        <button className=" buyBtn grow text-[0.75rem] max-w-[150px] lg:text-[1rem] p-3 rounded-md text-white
                                                          bg-blue-500 border-white cursor-pointer hover:scale-110 transition-all ease"
                                            onClick={() => UrlBanner(BuyBtnUrl[index])}>ซื้อสินค้า</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default MiddleBanner