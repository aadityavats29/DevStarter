import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
import { useEffect } from "react";

const Cursors=()=>{

useEffect(()=>{

    const main = document.querySelector("#pageID");
    const cursor = document.querySelector("#cursor");
    const box1 = document.querySelector("#box1");
    const box3 = document.querySelector("#box3");

    main.addEventListener("mousemove",function(mouseInfo){
        // console.log(mouseInfo)
        gsap.to(cursor,{
            x:mouseInfo.x,
            y:mouseInfo.y,
            duration:0.6,
            ease:"back.out"
        })
    })

    box1.addEventListener("mouseenter",function(){
            cursor.innerHTML = "View More"
            gsap.to(cursor,{
                scale:4
            })
        })

    box1.addEventListener("mouseleave",function(){
            cursor.innerHTML=""
            gsap.to(cursor,{
                scale:1
            })
        })


    box3.addEventListener("mouseenter",function(){
            cursor.innerHTML = "View More"
            gsap.to(cursor,{
                scale:4,
            })
        })

    box3.addEventListener("mouseleave",function(){
            cursor.innerHTML=""
            gsap.to(cursor,{
                scale:1,
            })
        })

},[])


    return(
        <>
            <div
            id="cursor"
            className="h-5 w-5 rounded-[50%] bg-[#f3c77c] fixed flex justify-center items-center text-[4px] text-black text-center"
            >
            </div>
        </>
    )
}

export default Cursors;