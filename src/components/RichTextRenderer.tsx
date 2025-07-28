import { ContenutoItem } from '@/types/hospital';

interface RichTextRendererProps {
  contenuto: ContenutoItem[];
  className?: string;
}

export default function RichTextRenderer({ contenuto, className = '' }: RichTextRendererProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      {contenuto.map((item, index) => (
        <RenderContenutoItem key={index} item={item} />
      ))}
    </div>
  );
}

interface RenderContenutoItemProps {
  item: ContenutoItem;
}

function RenderContenutoItem({ item }: RenderContenutoItemProps) {
  switch (item.tipo) {
    case 'paragrafo':
      return (
        <p className="text-gray-700 text-lg leading-relaxed mb-6 last:mb-0">
          {item.testo}
        </p>
      );

    case 'titolo':
      return (
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">
          {item.testo}
        </h2>
      );

    case 'lista':
      return (
        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
          {item.elementi.map((elemento, index) => (
            <li key={index} className="text-lg leading-relaxed">
              {elemento}
            </li>
          ))}
        </ul>
      );

    case 'citazione':
      return (
        <blockquote className="border-l-4 border-blue-500 pl-6 py-4 my-8 bg-blue-50 rounded-r-lg">
          <p className="text-xl italic text-gray-800 mb-3 leading-relaxed">
            &ldquo;{item.testo}&rdquo;
          </p>
          <cite className="text-base font-semibold text-blue-700 not-italic">
            — {item.autore}
          </cite>
        </blockquote>
      );

    default:
      return null;
  }
}