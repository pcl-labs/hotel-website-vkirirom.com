export interface GalleryImage {
  url: string
  order: number
}

export interface GalleryItem {
  url: string
  title: string
  link: string
}

export interface Story {
  order: number
  content: string
  ctaLink: string
  ctaText: string
  image: string
  type: string
  posterUrl: string
}

export interface ResortCategory {
  id: number
  name: string
}

export interface ResortImage {
  order: number
  url: string
}

export interface Resort {
  backgroundImage: string
  brand: string
  categories: ResortCategory[]
  ctaLink: string
  ctaText: string
  custom: any
  description: string
  featuredImage: string
  h2: string
  id: number
  images: ResortImage[]
  modules: {
    hotel?: {
      amenities?: string[]
      gettingAround: string
      id: number
      location?: string
      roomTypes: RoomType[]
      rules: string[]
      spaces?: string[]
    }
  }
  name: string
  slug: string
  stories: Story[]
  title: string
}

export interface Category {
  id: number
  brand: string
  name: string
  title: string
  description: string
  h2: string
  backgroundImage: string
  images: GalleryImage[]
  ctaText: string
  ctaLink: string
  stories: Story[]
  featuredImage: string
  slug: string
  // modules
  // custom
  // categories
}

export interface bookingStep {
  id: number
  width?: number
  title?: string
}

export interface RoomType {
  beds: {
    count: number
    id: number
    type: string
  }
  capacity: number
  id: number
  name: string
}
