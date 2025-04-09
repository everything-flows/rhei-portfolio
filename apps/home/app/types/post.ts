export const enum DocumentType {
  Post = "post",
  Directory = "database",
}

export interface Tag {
  id: string;
  title: string;
  isSpoiler: boolean;
  content: string[];
}

export interface Document {
  id: string;
  title: string;
  sub_title?: string; // [todo] fix this
  subTitle?: string;
  parent_id: string;
  type: DocumentType;
  sub_blog: string;
  created_at?: string;
  last_edited_at?: string;
  tags: Tag[];
  thumbnail?: string;
  emoji?: string;
  content: string;
}

export interface DocumentSummary {
  emoji: string;
  id: string;
  sub_blog: string;
  sub_title: string;
  thumbnail: string | null;
  title: string;
  tags: Tag[];
}

export interface Directory extends Document {
  posts: Document[];
}

export interface Category {
  children: Category[];
  id: string;
  parent_id: string | null;
  sub_blog: string;
  title: string;
  emoji?: string;
  type: DocumentType;
  isOpen: boolean;
}
