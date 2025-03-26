export function formatTitleFromSlug(slug) {
    if (!slug) return "";
  
    // Replace hyphens with spaces and split into words
    let words = slug.replace(/-/g, " ").split(" ");
  
    // Check if the last part is a season identifier (e.g., "S01", "s02")
    let lastWord = words[words.length - 1];
    let isSeason = /^[sS]\d{2}$/.test(lastWord);
  
    // Extract title part (remove season if present)
    let titleWords = isSeason ? words.slice(0, -1) : words;
  
    // Capitalize each word properly
    let formattedTitle = titleWords
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  
    // Append season identifier if present
    return isSeason ? `${formattedTitle} ${lastWord.toUpperCase()}` : formattedTitle;
  }