import { useEffect, useRef } from "react";
import gsap from "gsap";

const Cursors = () => {
    const cursorRef = useRef(null);
    const pageRef = useRef(null);
    const box1Ref = useRef(null);
    const box3Ref = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const page = pageRef.current;
        const box1 = box1Ref.current;
        const box3 = box3Ref.current;

        if (!cursor || !page) return;

        const handleMouseMove = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.6,
                ease: "back.out",
            });
        };

        const handleMouseEnter = () => {
            cursor.innerHTML = "View More";
            gsap.to(cursor, { scale: 4 });
        };

        const handleMouseLeave = () => {
            cursor.innerHTML = "";
            gsap.to(cursor, { scale: 1 });
        };

        page.addEventListener("mousemove", handleMouseMove);

        if (box1) {
            box1.addEventListener("mouseenter", handleMouseEnter);
            box1.addEventListener("mouseleave", handleMouseLeave);
        }

        if (box3) {
            box3.addEventListener("mouseenter", handleMouseEnter);
            box3.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            page.removeEventListener("mousemove", handleMouseMove);
            if (box1) {
                box1.removeEventListener("mouseenter", handleMouseEnter);
                box1.removeEventListener("mouseleave", handleMouseLeave);
            }
            if (box3) {
                box3.removeEventListener("mouseenter", handleMouseEnter);
                box3.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} id="cursor" className="h-5 w-5 rounded-[50%] bg-[#f3c77c] fixed flex justify-center items-center text-[4px] text-black text-center"></div>
            <div ref={pageRef} id="pageID" className="relative">
                <div ref={box1Ref} id="box1" className="box">Box 1</div>
                <div ref={box3Ref} id="box3" className="box">Box 3</div>
            </div>
        </>
    );
};

export default Cursors;
