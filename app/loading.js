export default function Loading() {
  return (
    /* Loading Animation */
    <div className={" fixed flex justify-center h-screen w-screen "}>
      <div className={"flex justify-center   "}>
        <div className={"place-content-center"}>
          {/* left side*/}

          <div className={"relative flex left-1/2 bottom-0 mt-10"}>
            {/* top left */}

            <div
              className={
                " relative w-24 h-24 rounded-sm ring-2 ring-black animate-sqaure "
              }
            >
              {/* center  */}

              <div className={" flex justify-center items-center"}>
                <div
                  className={
                    "absolute  bg-orange-700 w-12 h-12 bottom-6 animate-sqaure "
                  }
                ></div>
              </div>
            </div>

            <div
              className={
                "ring-2 ring-black w-24 h-24 ml-5 rounded-sm animate-sqaure delay-2000"
              }
            ></div>
          </div>
          {/* Right side */}

          <div className={" flex relative left-1/2 mt-2"}>
            {/* top right */}

            <div
              className={
                " w-24 h-24 rounded-sm ring-2 ring-black animate-sqaure delay-2000"
              }
            ></div>
            {/* bottom right */}
            <div
              className={
                "ring-2 ring-black w-24 h-24 ml-5 rounded-sm animate-sqaure"
              }
            >
              <div className={" flex justify-center items-center"}>
                <div
                  className={
                    " absolute bg-orange-700 w-12 h-12 bottom-6 animate-sqaure"
                  }
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
