export interface BlogPost {
    slug: string;
    id: string;
    meta_title: string | null;
    meta_description: string | null;
    title: string;
    html: string | null;
    comment_id: string;
    feature_image: string | null;
    feature_image_alt: string | null;
    feature_image_caption: string | null;
    featured: boolean;
    custom_excerpt: string | null;
    codeinjection_head: string | null;
    codeinjection_foot: string | null;
    og_image: string | null;
    og_title: string | null;
    og_description: string | null;
    twitter_image: string | null;
    twitter_title: string | null;
    twitter_description: string | null;
    visibility: 'public'; // Assuming this is a constant value
    custom_template: string | null;
    canonical_url: string | null;
    authors: Author[];
    primary_author: Author;
    url: string;
    excerpt: string | null;
    reading_time: number;
    created_at: string; // Assuming this is an ISO 8601 formatted string
    updated_at: string;
    published_at: string;
    access: boolean;
    comments: boolean;
    email_subject: string | null;
  }
  
  export interface Author {
    slug: string;
    id: string;
    meta_title: string | null;
    meta_description: string | null;
    name: string;
    profile_image: string | null;
    cover_image: string | null;
    bio: string | null;
    website: string | null;
    location: string | null;
    facebook: string | null;
    twitter: string | null;
    url: string;
  }