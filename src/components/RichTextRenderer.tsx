import { ContenutoItem } from '@/types/hospital';

interface RichTextRendererProps {
  contenuto: ContenutoItem[] | string;
  className?: string;
}

export default function RichTextRenderer({ contenuto, className = '' }: RichTextRendererProps) {
  // If contenuto is a string, parse it into ContenutoItem array
  const parsedContenuto = typeof contenuto === 'string' ? parseHtmlToContenuto(contenuto) : contenuto;

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      {parsedContenuto.map((item, index) => (
        <RenderContenutoItem key={index} item={item} />
      ))}
    </div>
  );
}

// Function to parse HTML string into ContenutoItem array
function parseHtmlToContenuto(htmlString: string): ContenutoItem[] {
  // Check if we're in a browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    // Fallback for server-side rendering - return as simple paragraph
    return [{
      tipo: 'paragrafo',
      testo: htmlString.replace(/<[^>]*>/g, '') // Remove HTML tags
    }];
  }
  
  // Create a temporary DOM element to parse the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  
  const contenutoItems: ContenutoItem[] = [];
  
  // Process each child node
  Array.from(tempDiv.childNodes).forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      
      switch (element.tagName.toLowerCase()) {
        case 'strong':
        case 'b':
          // Treat strong/b tags as titles
          contenutoItems.push({
            tipo: 'titolo',
            testo: element.textContent || ''
          });
          break;
          
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
          // Treat heading tags as titles
          contenutoItems.push({
            tipo: 'titolo',
            testo: element.textContent || ''
          });
          break;
          
        case 'p':
          // Treat p tags as paragraphs
          contenutoItems.push({
            tipo: 'paragrafo',
            testo: element.textContent || ''
          });
          break;
          
        case 'ul':
        case 'ol':
          // Treat list tags as list items
          const elementi = Array.from(element.querySelectorAll('li')).map(li => li.textContent || '');
          if (elementi.length > 0) {
            contenutoItems.push({
              tipo: 'lista',
              elementi
            });
          }
          break;
          
        case 'blockquote':
          // Treat blockquote as citation
          const testo = element.textContent || '';
          contenutoItems.push({
            tipo: 'citazione',
            testo,
            autore: 'Autore non specificato'
          });
          break;
          
        default:
          // For any other element, treat as paragraph
          if (element.textContent?.trim()) {
            contenutoItems.push({
              tipo: 'paragrafo',
              testo: element.textContent
            });
          }
          break;
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      // Handle text nodes
      const text = node.textContent?.trim();
      if (text) {
        contenutoItems.push({
          tipo: 'paragrafo',
          testo: text
        });
      }
    }
  });
  
  return contenutoItems;
}

interface RenderContenutoItemProps {
  item: ContenutoItem;
}

function RenderContenutoItem({ item }: RenderContenutoItemProps) {
  switch (item.tipo) {
    case 'paragrafo':
      return (
        <p className="text-black text-base  leading-relaxed mb-6 last:mb-0">
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