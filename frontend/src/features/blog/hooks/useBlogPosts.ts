import { useState, useEffect } from 'react';
import { blogService } from '../services/blogService';
import type { BlogPost } from '../types';

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    blogService
      .getPosts()
      .then((data) => {
        if (mounted) {
          setPosts(data);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load posts');
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { posts, loading, error };
};
