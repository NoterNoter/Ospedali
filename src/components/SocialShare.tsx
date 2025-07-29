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
    <div className={`flex gap-2 font-medium ${className}`}>
      <button
        onClick={() => handleShare('facebook')}
        className="text-black transition-colors underline"
        aria-label="Share on Facebook"
      >
        FB
      </button>
      <button
        onClick={() => handleShare('x')}
        className="text-black transition-colors underline"
        aria-label="Share on X"
      >
        X
      </button>
      <button
        onClick={() => handleShare('linkedin')}
        className="text-black transition-colors underline"
        aria-label="Share on LinkedIn"
      >
        IN
      </button>
    </div>
  )
}