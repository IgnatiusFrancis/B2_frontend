import { revalidateTag } from "next/cache";


export async function revalidateData(tag) {
  try {
    revalidateTag(tag);
    return { success: true };
  } catch (error) {
    console.error('Revalidation error:', error);
    return { success: false, error: error.message };
  }
}