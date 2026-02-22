import { useState, useEffect } from 'react';
import './Home.css';
import { shirt, pant, watch, jewelry, shoe, hat, sock, accessory } from '../../assets/Home/CategoryAssets'
import { Shirt1, Shirt2, Shirt3, Shoes1, Shoes2, Shoes3, Watch1, Watch2, Watch3 } from '../../assets/Home/BannerAssets'

const CategoryProd = [
  { id: 1, img: shirt, type: "SHIRTS" },
  { id: 2, img: pant, type: "WATCHES" },
  { id: 3, img: watch, type: "WATCHES" },
  { id: 4, img: jewelry, type: "JEWELRIES" },
  { id: 5, img: shoe, type: "SHOES" },
  { id: 6, img: hat, type: "HATS" },
  { id: 7, img: sock, type: "SOCKS" },
  { id: 8, img: accessory, type: "ACCESSORIES" },
  { id: 9, img: Shirt1, type: "SHIRTS" },
  { id: 10, img: Shirt2, type: "WATCHES" },
  { id: 11, img: Shirt3, type: "WATCHES" },
  { id: 12, img: Shoes1, type: "JEWELRIES" },
  { id: 13, img: Shoes2, type: "SHOES" },
  { id: 14, img: Shoes3, type: "HATS" },
  { id: 15, img: Watch1, type: "SOCKS" },
  { id: 16, img: Watch2, type: "ACCESSORIES" },
  { id: 17, img: Watch3, type: "ACCESSORIES" },
  
]

type CategoryItems = {
  id: number;
  img: string;
  type: string;
}

const Category = () => {

  const [CatePage, setCatePage] = useState([0]);
  const [CurrPage, setCurrPage] = useState(0);
  const [PrevPage, setPrevPage] = useState(0);
  const [checkDir, setcheckDir] = useState<"none" | "next" | "prev">("none");

  const group: CategoryItems[][] = []
  for (let i = 0; i < CategoryProd.length; i += 4) {
    group.push(CategoryProd.slice(i, i + 4))
  }

  useEffect(() => {
    setCatePage(_ => {
      const newArray = new Array(group.length).fill(0)
      for (let i = -1; i < 1; i++) {
        newArray[CurrPage + i] = i + 1;
      }
      return newArray
    })
  }, [CurrPage])

  const NextPrev_Pages = (num: number) => {
    const checkLimit = CurrPage + num;
    if (checkLimit < 0 || checkLimit > CatePage.length - 1) return

    setPrevPage(CurrPage);
    setCurrPage(checkLimit)

    if (num > 0) setcheckDir("next");
    else setcheckDir("prev");

    setTimeout(() => {
      setcheckDir("none");
    }, 1000)

  }

  const GoTo_Pages = (num: number) => {
    if (CurrPage > num) setcheckDir("prev");
    else setcheckDir("next");

    setPrevPage(CurrPage);
    setCurrPage(num);

    setTimeout(() => {
      setcheckDir("none");
    }, 1000)
  }

  return (
    <>
      <section className=" pb-14 lg:pb-28 flex justify-center">
        <div className="container relative w-screen overflow-x-clip">
          <div className="flex justify-between items-center mt-8 mb-6 md:pl-4 md:mt-12 lg:mt-18">
            <h2 className="Category_Title text-2xl md:text-3xl lg:text-4xl pl-4">Categories</h2>
          </div>

          <div className="relative w-full h-75 md:h-64 lg:h-80">
            {group.map((arrCate, index) => (
              <div key={`Cate${index}`} className={`absolute grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 px-4
                                           ${checkDir === "next" ? (index === CurrPage ? "fade-out-element1" : (index === PrevPage ? "fade-out-element2" : "translate-x-[100%]"))
                                            : (checkDir === "prev" ? (index === PrevPage ? "fade-in-element2" : (index === CurrPage ? "fade-in-element1" : "translate-x-[100%]"))
                                            : (index === CurrPage ? "" : "translate-x-[100%]"))}`}>

                {arrCate.map(value => (
                  <div key={value.id} className="flex flex-col bg-gray-200 rounded-lg p-4 h-48 md:h-64 lg:h-80">
                    <div className="flex-grow flex items-center justify-center overflow-hidden">
                      <img src={value.img} alt={value.type.toLowerCase()} className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-xs md:text-lg">{value.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-32 md:mt-8">
            <div className="navigation-controls flex items-center md:space-x-4">
              <button id="catLeft" onClick={() => NextPrev_Pages(-1)} className="nav-arrow place-items-center" aria-label="Previous Category">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                  className="w-7 h-7 object-cover">
                  <path fill="#fff"
                    d="m4.431 12.822l13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645" />
                </svg>
              </button>
              <div className="dot-navigation flex space-x-2">
                {CatePage.map((_, index) => (
                  <span key={`dot${index}`} className={`dot ${index === CurrPage ? "active" : ""}`} onClick={() => GoTo_Pages(index)}></span>
                ))}
              </div>
              <button id="catRight" onClick={() => NextPrev_Pages(1)} className="nav-arrow place-items-center" aria-label="Next Category">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                  className="w-7 h-7 object-cover">
                  <path fill="#fff"
                    d="M5.536 21.886a1 1 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}



export default Category