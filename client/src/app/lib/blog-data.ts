import * as blogApi from "../services/blog-service";

// Re-export everything from the service
export const getAllPosts = blogApi.getAllPosts;
export const getPostBySlug = blogApi.getPostBySlug;
export const getPostsByCategory = blogApi.getPostsByCategory;
export const getAllCategories = blogApi.getAllCategories;
export const getCategoryBySlug = blogApi.getCategoryBySlug;
