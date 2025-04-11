export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          id_n: number;
          title: string;
          created_at: Date;
          last_edited_at: Date;
          sub_blog: string;
          content: string | null;
          parent_id: string | null;
          emoji: string | null;
          tags: any[] | null;
        };
      };
      tags: {
        Row: {
          id: string;
          title: string;
          content: string[];
        };
      };
      posts_tags: {
        Row: {
          post_id: string;
          tag_id: string;
          created_at: Date;
          is_spoiler: boolean;
        };
      };
    };
  };
}
