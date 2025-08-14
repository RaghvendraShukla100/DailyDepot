export default function MegaMenu({ columns = [], style = {}, className = "" }) {
  return (
    <div
      className={`absolute bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800 w-fit p-6 pt-10 flex justify-between text-xs text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700 z-40 transition-colors duration-300 ${className}`}
      style={{
        marginTop: "0px",
        paddingTop: "20px",
        position: "absolute",
        left: "50%",
        top: style.top ?? "100%",
        width: style.width ?? 1100,
        transform: "translateX(-50%)",
      }}
    >
      {columns.map((col, idx) => (
        <div key={idx} className="w-1/4 space-y-2">
          <h4 className="text-sm font-bold text-pink-600 dark:text-pink-500">
            {col.title}
          </h4>
          <ul className="space-y-0.5">
            {col.items?.map((item, i) => (
              <li
                key={i}
                className="hover:underline cursor-pointer text-[13px] leading-6 text-gray-700 dark:text-gray-300 transition-colors duration-200"
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
