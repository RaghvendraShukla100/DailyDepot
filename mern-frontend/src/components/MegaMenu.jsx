// src/components/MegaMenu.jsx
export default function MegaMenu({ columns = [], style = {}, className = "" }) {
  // style: { left: number(px), top: number(px), width: number(px) }
  return (
    <div
      // it's absolutely positioned by the parent <div ref={wrapperRef}>
      className={`absolute bg-white shadow-lg w-fit p-6 pt-10 flex justify-between text-xs text-gray-700 border-t
         border-gray-100 z-40 ${className}`}
      style={{
        marginTop: "0px",
        paddingTop: "20px",
        position: "absolute",
        left: "50%",
        top: style.top ?? "100%",
        width: style.width ?? 1100,
        transform: "translateX(-50%)", // shifts it back by half its own width
      }}
    >
      {columns.map((col, idx) => (
        <div key={idx} className="w-1/4 space-y-2">
          <h4 className="text-sm font-bold text-pink-600">{col.title}</h4>
          <ul className="space-y-0.5">
            {col.items?.map((item, i) => (
              <li
                key={i}
                className="hover:underline cursor-pointer text-[13px] leading-6 text-gray-700"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
