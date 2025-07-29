'use client'

interface SocialShareProps {
  url?: string
  title?: string
  className?: string
}

export default function SocialShare({ url, title, className = "" }: SocialShareProps) {
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const shareTitle = title || (typeof document !== 'undefined' ? document.title : '')
  
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(shareTitle)
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  }
  
  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400')
  }
  
  return (
    <div className={`flex gap-4 ${className}`}>
      <button
        onClick={() => handleShare('facebook')}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        aria-label="Share on Facebook"
      >
        FB
      </button>
      <button
        onClick={() => handleShare('x')}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900 transition-colors"
        aria-label="Share on X"
      >
        X
      </button>
      <button
        onClick={() => handleShare('linkedin')}
        className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors"
        aria-label="Share on LinkedIn"
      >
        IN
      </button>
    </div>
  )
}