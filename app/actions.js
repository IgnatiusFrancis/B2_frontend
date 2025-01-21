"use server";

import { revalidateTag } from "next/cache";

export default async function action(tag) {
    try {
     
        revalidateTag(tag);
        return { revalidated: true, now: Date.now() }
      } catch (error) {
        console.error('Revalidation error:', error);
        return { success: false, error: error.message };
      }
}
 
