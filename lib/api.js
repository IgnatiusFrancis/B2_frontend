

const baseUrl = "https://b2xclusive.onrender.com/api/v1"

// export async function getMovies() {
//   const url =
//     `${baseUrl}/movies?page=1&limit=12`;

//   const response = await fetch(url, { cache: "no-store" }); // No caching for dynamic data
//   if (!response.ok) {
//     throw new Error("Failed to fetch movies");
//   }
//   const data = await response.json();

//   return data?.data?.movies || [];
// }

export async function getMovies() {
  const url = `${baseUrl}/track/movies?page=1&limit=12`;
  const response = await fetch(url, ); // Cache for 60 seconds
 // const response = await fetch(url, { next: { revalidate: 60 } }); // Cache for 60 seconds
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  return data?.data?.movies || [];
}


export async function fetchSeriesData(id) {
  const url = `${baseUrl}/track/season/${id}`;
  
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to fetch series data");
  }
  const data = await response.json();

  return data?.data || null;
}

export async function fetchMovie(id) {
  const url = `${baseUrl}/track/movie/${id}`;
  
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to fetch movie data");
  }
  const data = await response.json();

  return data?.data || null;
}

export async function getEvents() {
  const url = `${baseUrl}/event/events`; 
  const response = await fetch(url, {
    next: {
      revalidate: 60 * 60, // Revalidate every hour
      tags: ['events'],
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }

  const data = await response.json();
  return data?.data || null; 
}

export async function getPosts() {
  const url = `${baseUrl}/post/posts`; 
  const response = await fetch(url, {
    next: {
      revalidate: 60 * 60, // Revalidate every hour
      tags: ['events'],
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }

  const data = await response.json();
  return data?.data || null; 
}

export async function getArtists() {
  const url = `${baseUrl}/artist/artists`; 
  const response = await fetch(url, {
    next: {
      revalidate: 60 * 60, 
      tags: ['artist'],
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }

  const data = await response.json();
  return data?.data || null; 
} 


export async function getAudios() {
  const url = `${baseUrl}/track/audios`; 
  const response = await fetch(url, {
    next: {
      revalidate: 60 * 60, 
      tags: ['audios'],
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch audios');
  }

  const data = await response.json();
  return data?.data.audios || null; 
}