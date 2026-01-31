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
  subTitle?: string;
  parentId: string;
  type: DocumentType;
  subBlog: string;
  createdAt: string;
  lastEditedAt?: string;
  tags: Tag[];
  thumbnail?: string;
  emoji?: string;
  content: string;
}

export interface Directory extends Document {
  posts: Document[];
}

export interface Category {
  children: Category[];
  id: string;
  parentId: string | null;
  subBlog: string;
  title: string;
  emoji?: string;
  type: DocumentType;
  isOpen: boolean;
}
