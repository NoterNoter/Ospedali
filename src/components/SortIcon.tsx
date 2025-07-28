interface SortIconProps {
  tipo: "asc" | "desc" | "neutral";
  isActive: boolean;
}

export default function SortIcon({ tipo, isActive }: SortIconProps) {
  const baseClassName = `inline-block ml-1 transition-opacity ${
    isActive ? "opacity-100" : "opacity-50"
  }`;

  if (tipo === "asc") {
    return (
      <span className={baseClassName}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="14"
          fill="none"
          viewBox="0 0 30 14"
        >
          <path
            fill="#000"
            d="m7.584 9.433 3.129-3.129.824.825L7 11.667 2.463 7.129l.825-.825 3.129 3.13v-7.1h1.167z"
          ></path>
          <path
            fill="#000"
            fillOpacity="0.2"
            d="M23.584 4.567v7.1h-1.167v-7.1l-3.13 3.129-.824-.825L23 2.333l4.537 4.538-.825.825z"
          ></path>
        </svg>
      </span>
    );
  }

  if (tipo === "desc") {
    return (
      <span className={baseClassName}>
          <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="14"
          fill="none"
          viewBox="0 0 30 14"
        >
          <path
            fill="#000"
             fillOpacity="0.2"
            d="m7.584 9.433 3.129-3.129.824.825L7 11.667 2.463 7.129l.825-.825 3.129 3.13v-7.1h1.167z"
          ></path>
          <path
            fill="#000"
            d="M23.584 4.567v7.1h-1.167v-7.1l-3.13 3.129-.824-.825L23 2.333l4.537 4.538-.825.825z"
          ></path>
        </svg>
      </span>
    );
  }

  // neutral
  return (
    <span className={baseClassName}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="14"
        fill="none"
        viewBox="0 0 30 14"
      >
        <path
          fill="#000"
          d="m7.584 9.433 3.129-3.129.824.825L7 11.667 2.463 7.129l.825-.825 3.129 3.13v-7.1h1.167zM23.584 4.567v7.1h-1.167v-7.1l-3.13 3.129-.824-.825L23 2.333l4.537 4.538-.825.825z"
        ></path>
      </svg>
    </span>
  );
}
