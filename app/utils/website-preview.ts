export type PreviewStyle = 'fancy' | 'informative'
export type PreviewArt = 'food' | 'botanical' | 'architecture' | 'studio' | 'abstract'

export interface WebsitePreview {
  genre: string
  style: PreviewStyle
  category: string
  brand: string
  eyebrow: string
  headline: string
  intro: string
  aboutTitle: string
  about: string
  services: { title: string; description: string }[]
  ctaTitle: string
  ctaText: string
  art: PreviewArt
  palette: string
}

interface Starter {
  category: string
  words: string[]
  art: PreviewArt
  palette: string
  fancyHeadline: string
  informativeHeadline: string
  intro: string
  aboutTitle: string
  about: string
  services: WebsitePreview['services']
}

// These are starter directions, not inferred facts about a real business.
// Keep all input as text. Rendering, editing and accessibility belong to the UI.
const starters: Starter[] = [
  {
    category: 'food',
    words: ['cafe', 'café', 'coffee', 'restaurant', 'bakery', 'baker', 'baking', 'bistro', 'patisserie', 'pastry', 'food', 'catering', 'kedai kopi'],
    art: 'food', palette: 'clay',
    fancyHeadline: 'A little pause. A lot of flavour.',
    informativeHeadline: 'Good food starts with a warm welcome.',
    intro: 'Make space for a favourite new ritual. Introduce the flavours, the feeling and the people behind your table.',
    aboutTitle: 'The story behind the table.',
    about: 'Share what brought your food business to life, what inspires the menu and what you would love a first-time visitor to try.',
    services: [
      { title: 'On the menu', description: 'Introduce your signature dishes, drinks or bakes. Add your real menu and current availability here.' },
      { title: 'The experience', description: 'Give visitors a feel for your space, your style and what to expect when they visit.' },
      { title: 'Plan a visit', description: 'Add your confirmed opening hours, location and any reservation or collection details.' }
    ]
  },
  {
    category: 'botanical',
    words: ['florist', 'floral', 'flowers', 'flower', 'garden', 'gardening', 'plants', 'plant', 'botanical', 'landscape', 'landscaping'],
    art: 'botanical', palette: 'moss',
    fancyHeadline: 'Let something beautiful grow.',
    informativeHeadline: 'A fresh perspective on flowers and greenery.',
    intro: 'A little nature can change the feeling of a space. Introduce your botanical world and the possibilities within it.',
    aboutTitle: 'Rooted in your own story.',
    about: 'Tell visitors what draws you to plants, flowers or outdoor spaces. Add the approach and details that make your work your own.',
    services: [
      { title: 'Your collection', description: 'Show the flowers, plants or arrangements you actually offer, with seasonal availability where useful.' },
      { title: 'For your space', description: 'Explain any personal, event or space-specific options you provide. Replace this starter with your real scope.' },
      { title: 'Care & next steps', description: 'Share practical care notes and tell visitors how to ask about the right option for them.' }
    ]
  },
  {
    category: 'architecture',
    words: ['interior', 'interiors', 'architecture', 'architect', 'architects', 'renovation', 'renovations', 'furniture', 'spatial', 'construction'],
    art: 'architecture', palette: 'sand',
    fancyHeadline: 'Space to live a little differently.',
    informativeHeadline: 'A considered starting point for your next space.',
    intro: 'Bring your design perspective into focus. Show how you think about spaces, materials and the people who use them.',
    aboutTitle: 'The thinking behind the space.',
    about: 'Introduce your design point of view and the kinds of spaces you work with. Replace this draft with your actual experience and process.',
    services: [
      { title: 'Discover the direction', description: 'Describe how a project begins and what you need to understand before proposing a direction.' },
      { title: 'Shape the details', description: 'Outline the design, planning or product services you offer and what each one includes.' },
      { title: 'See the possibilities', description: 'Add your own project images and explain the brief, your role and the completed work.' }
    ]
  },
  {
    category: 'creative',
    words: ['creative', 'photography', 'photographer', 'photographers', 'designer', 'designers', 'branding', 'graphic', 'art', 'artist', 'artists', 'illustration', 'illustrator', 'film', 'filmmaker', 'videography', 'studio'],
    art: 'studio', palette: 'plum',
    fancyHeadline: 'A different way of seeing.',
    informativeHeadline: 'Make your next creative project clear.',
    intro: 'Give your point of view a place to stand out. Introduce your practice, your creative interests and the work you want to make.',
    aboutTitle: 'A point of view, made visible.',
    about: 'Write about your creative approach and what you want people to feel through your work. Add your own projects rather than sample client claims.',
    services: [
      { title: 'Creative direction', description: 'Explain how you turn an idea or a brief into a visual direction. Adjust this to match your actual practice.' },
      { title: 'Selected work', description: 'Replace this space with your own images and a short, accurate description of each project.' },
      { title: 'Ways to collaborate', description: 'Describe the work you take on, what is included and how a new project gets started.' }
    ]
  },
  {
    category: 'wellness',
    words: ['fitness', 'wellness', 'yoga', 'pilates', 'gym', 'trainer', 'training', 'movement', 'meditation', 'spa'],
    art: 'botanical', palette: 'sage',
    fancyHeadline: 'Find a little more room for you.',
    informativeHeadline: 'A clearer path to your next session.',
    intro: 'Help people understand your approach to movement or wellbeing, and what a first session could look like.',
    aboutTitle: 'Start with your approach.',
    about: 'Introduce the people and principles behind your practice. Include only verified qualifications, and avoid promises about health outcomes.',
    services: [
      { title: 'Explore the options', description: 'List the sessions or services you actually offer and explain who each option is intended for.' },
      { title: 'Your first visit', description: 'Describe what to expect, what to bring and any important preparation or suitability information.' },
      { title: 'Find your next step', description: 'Add your real schedule, availability and booking details once they are confirmed.' }
    ]
  },
  {
    category: 'services',
    words: ['consulting', 'consultancy', 'consultant', 'consultants', 'services', 'service', 'business', 'agency', 'accounting', 'accountant', 'legal', 'lawyer', 'software', 'technology', 'cleaning', 'repair', 'repairs'],
    art: 'abstract', palette: 'blue',
    fancyHeadline: 'Your next chapter, clearly considered.',
    informativeHeadline: 'Understand the options. Take the next step.',
    intro: 'Make what you do easy to understand. Introduce your focus, the problems you work on and the next step for a new enquiry.',
    aboutTitle: 'Clarity begins with understanding.',
    about: 'Explain who you help, what you do and how you approach the work. Add your real experience and qualifications where they are relevant.',
    services: [
      { title: 'What you need', description: 'Describe the needs you work with and help visitors recognise whether your service is a fit.' },
      { title: 'How you can help', description: 'Outline your actual services, their scope and what a client can expect to receive.' },
      { title: 'A clear next step', description: 'Explain how an enquiry works and what information is useful to discuss at the start.' }
    ]
  }
]

export function normalizeGenre(input: unknown): string {
  if (typeof input !== 'string') return ''
  return input.normalize('NFC')
    .replace(/\s+/gu, ' ')
    .replace(/[\u0000-\u001f\u007f-\u009f\u200b\u200e\u200f\u202a-\u202e\u2066-\u2069\ufeff]/gu, '')
    .replace(/\s+/gu, ' ')
    .trim()
}

export function validateGenre(input: unknown): string | null {
  const genre = normalizeGenre(input)
  if (!genre) return 'Enter your business or industry to get started.'
  const length = Array.from(genre).length
  if (length < 2) return 'Use at least 2 characters for your business or industry.'
  if (length > 80) return 'Keep your business or industry to 80 characters or fewer.'
  return null
}

function matchStarter(genre: string): Starter | undefined {
  // Unicode word boundaries prevent partial matches such as “cartography” → “art”.
  // Punctuation separates words; long phrases are matched as complete phrases.
  const words = ` ${genre.toLocaleLowerCase('en').replace(/[^\p{L}\p{N}]+/gu, ' ').trim()} `
  return starters.find(starter => starter.words.some(word => words.includes(` ${word} `)))
}

export function generateWebsitePreview(input: unknown, style: PreviewStyle): WebsitePreview {
  const error = validateGenre(input)
  if (error) throw new Error(error)
  if (style !== 'fancy' && style !== 'informative') throw new Error('Choose Fancy or Informative for your website focus.')
  const genre = normalizeGenre(input)
  const starter = matchStarter(genre)
  return {
    genre,
    style,
    category: starter?.category || 'custom',
    brand: 'Your business name',
    eyebrow: genre,
    headline: starter
      ? style === 'fancy' ? starter.fancyHeadline : starter.informativeHeadline
      : style === 'fancy' ? `${genre}. A fresh perspective.` : `Discover your next step in ${genre}.`,
    intro: starter?.intro || `A clear starting point for your ${genre} website. Introduce what you do, who it is for and what makes your approach your own.`,
    aboutTitle: starter?.aboutTitle || 'A story worth getting to know.',
    about: starter?.about || `Use this space to tell the story behind your ${genre} business. Add your real background, your approach and the details visitors should know.`,
    services: starter ? starter.services.map(service => ({ ...service })) : [
      { title: 'What you do', description: `Introduce your main ${genre} offering. Replace this starter text with the details of your actual work.` },
      { title: 'How it works', description: 'Explain your process, what is included and what visitors can expect at each step.' },
      { title: 'Find the right fit', description: 'Help people understand their options and what information to share when they enquire.' }
    ],
    ctaTitle: style === 'fancy' ? 'Every good beginning starts somewhere.' : 'Ready for a conversation?',
    ctaText: 'Add your confirmed contact details and preferred next step here. This preview does not send enquiries.',
    art: starter?.art || 'abstract',
    palette: starter?.palette || 'ink'
  }
}
