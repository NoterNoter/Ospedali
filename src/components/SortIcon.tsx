interface SortIconProps {
  tipo: 'asc' | 'desc' | 'neutral';
  isActive: boolean;
}

export default function SortIcon({ tipo, isActive }: SortIconProps) {
  const baseClassName = `inline-block ml-1 transition-opacity ${isActive ? 'opacity-100' : 'opacity-50'}`;

  if (tipo === 'asc') {
    return (
      <span className={baseClassName}>
        <svg className="w-3 h-3 inline" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      </span>
    );
  }

  if (tipo === 'desc') {
    return (
      <span className={baseClassName}>
        <svg className="w-3 h-3 inline" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </span>
    );
  }

  // neutral
  return (
    <span className={baseClassName}>
      <svg className="w-3 h-3 inline" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h4a1 1 0 110 2H4a1 1 0 01-1-1z" />
      </svg>
    </span>
  );
}