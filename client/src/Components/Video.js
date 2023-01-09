import video from "./Video.webm";
import React,{useState,useEffect} from "react";
import "../style.css"

export default function Video() {
    const [screensize, setscreensize] = useState(0)
    useEffect(() => {
      const screenWidth = window.innerWidth;
      setscreensize(screenWidth)
    }, [screensize])
    const a=screensize>"840px";
    console.log(`sss${a}`,typeof(screensize))
    return (
        <>
           {/* <div className='video'> */}
           {/* {!(screensize>1000)?
           <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.06 464.14"><path d="M1130.5,207.82h-82V105.72h80.08V128h-51.49v17.21h45.36v21.58h-45.36V185.5h53.38Zm-57.83,120h-28.88V225.72h46.68q14,0,24.14,4.52a35.4,35.4,0,0,1,15.68,13.06q5.54,8.52,5.54,20.2a34.45,34.45,0,0,1-21.22,33q-10.14,4.61-24.14,4.6h-17.8Zm16-79.35h-16v29.9h16q9,0,13.49-3.93t4.45-10.94q0-7.15-4.45-11.09T1088.72,248.47Zm-15.9,199.35h28.88V345.72h-28.88Zm36.46,95.06a28.28,28.28,0,0,1-13.2,3.06,31.55,31.55,0,0,1-11.52-2,24.64,24.64,0,0,1-9-5.91,27.55,27.55,0,0,1-5.83-9.26,34.8,34.8,0,0,1,0-23.92,27.55,27.55,0,0,1,5.83-9.26,24.64,24.64,0,0,1,9-5.91,31.55,31.55,0,0,1,11.52-2,28.28,28.28,0,0,1,13.2,3.06,36.24,36.24,0,0,1,10.87,8.9l18.38-16.63a48.64,48.64,0,0,0-18.6-14.29,61.66,61.66,0,0,0-25.31-5,63.22,63.22,0,0,0-22.38,3.86,52.17,52.17,0,0,0-17.8,11,51.4,51.4,0,0,0-11.74,16.85,56.1,56.1,0,0,0,0,42.74A51.25,51.25,0,0,0,1054.44,555a52,52,0,0,0,17.8,11,63.22,63.22,0,0,0,22.38,3.86,61,61,0,0,0,25.31-5,50.09,50.09,0,0,0,18.6-14.22L1120.15,534A36.39,36.39,0,0,1,1109.28,542.88Z" transform="translate(-1038.47 -105.72)" fill="#fff"/></svg>:
           <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 565.34 172.35"><path d="M304.54,46.12q-16.46-7.34-39.18-7.34H189.61V204.5h46.87V161.18h28.88q22.74,0,39.18-7.46T330,132.53q9-13.73,9-32.43,0-18.93-9-32.79T304.54,46.12Zm-20.12,71.74q-7.21,6.39-21.9,6.39h-26V75.72h26q14.69,0,21.9,6.39t7.22,18Q291.64,111.47,284.42,117.86ZM76.92,168.28h86.64V204.5h-133V38.78h130V75H76.92v27.93h73.62v35H76.92ZM566,149.58l29.83,27a81.05,81.05,0,0,1-30.19,23.08q-18.1,8.17-41.07,8.17a102.51,102.51,0,0,1-36.34-6.27,84.54,84.54,0,0,1-28.89-17.88,83.11,83.11,0,0,1-19.05-27.34,85.83,85.83,0,0,1-6.87-34.69A85.81,85.81,0,0,1,440.32,87a83.11,83.11,0,0,1,19.05-27.34,84.69,84.69,0,0,1,28.89-17.88,102.51,102.51,0,0,1,36.34-6.27q22.95,0,41.07,8.05a79,79,0,0,1,30.19,23.2L566,93.71a58.85,58.85,0,0,0-17.64-14.44,45.75,45.75,0,0,0-21.42-5,51.19,51.19,0,0,0-18.71,3.31A40.16,40.16,0,0,0,493.7,87.2a45.21,45.21,0,0,0-9.47,15,52.75,52.75,0,0,0-3.43,19.41,52.77,52.77,0,0,0,3.43,19.42,45.21,45.21,0,0,0,9.47,15,40.16,40.16,0,0,0,14.56,9.59A51.19,51.19,0,0,0,527,169a45.75,45.75,0,0,0,21.42-5A58.85,58.85,0,0,0,566,149.58ZM361.72,38.78H408.6V204.5H361.72Z" transform="translate(-30.51 -35.47)" fill="#fff"/></svg>}
                */}
           <video  autoPlay={true} preload="auto" controls={false} muted loop={true}>
                    <source src={video} type="video/webm" />
                </video>
            {/* // </div> */}

        </>
    )
}
