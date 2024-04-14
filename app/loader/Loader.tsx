export function Loader() {
  return (
    <div className=" flex flex-col gap-2 items-center justify-center absolute start-2/3">
      <span className="loader"></span>

      <h1 style={{ color: "gray" }}>Loading...</h1>
    </div>
  );
}
// .loader {
//     width: 48px;
//     height: 48px;
//     border: 5px solid #FFF;
//     border-bottom-color: transparent;
//     border-radius: 50%;
//     display: inline-block;
//     box-sizing: border-box;
//     animation: rotation 1s linear infinite;
//     }

//     @keyframes rotation {
//     0% {
//         transform: rotate(0deg);
//     }
//     100% {
//         transform: rotate(360deg);
//     }
//     }
