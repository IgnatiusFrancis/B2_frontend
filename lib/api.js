

const baseUrl = "https://b2xclusive.onrender.com/api/v1"

export async function getMovies() {
  const url = `${baseUrl}/track/movies`;
    //const response = await fetch(url, { cache: "no-store" });

 const response = await fetch(url, {
  next: {
    revalidate: 60 * 60, 
    tags: ['movies'],
  },
});

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  return data?.data?.movies || [];
}

export async function getUsers() {
  const url = `${baseUrl}/users/allUsers`;
  

 const response = await fetch(url, {
  next: {
    revalidate: 60 * 60, 
    tags: ['users'],
  },
});
//const response = await fetch(url, );
  //const response = await fetch(url, { next: { revalidate: 60 } }); 
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  return data?.data || [];
}

export async function fetchMovies(page, limit, type ) {


  const pageQuery = page ? `&page=${page}` : '';  
  const limitQuery = limit ? `?limit=${limit}` : '';
  const typeQuery = type ? `&type=${type}` : '';  
  const url = `${baseUrl}/track/movies${limitQuery}${pageQuery}${typeQuery}`;
 // const response = await fetch(url, { cache: "no-store" });


 const response = await fetch(url, {
  next: {
    revalidate: 60 * 60, 
    tags: ['movies'],
  },
});

const data = await response.json();
  const movies= data?.data?.movies || [];
  // Group movies by type

  const groupedMovies = movies.reduce(
    (acc, movie) => {
      acc[movie.type].push(movie);
      return acc;
    },
    { SINGLE: [], SEASONAL: [], SERIES: [] } // Initial groups
  );

  return groupedMovies;
}

export async function fetchSeriesData(id) {
  const url = `${baseUrl}/track/season/${id}`;
  
  //const response = await fetch(url, { cache: "no-store" });
  const response = await fetch(url, {
    next: {
      revalidate: 60 * 60, 
      tags: ['series'],
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch series data");
  }
  const data = await response.json();

  return data?.data || null;
} 

export async function fetchMovie(id) {
  const url = `${baseUrl}/track/movie/${id}`; 
  const response = await fetch(url, { 
    next: {
      revalidate: 60 * 60, 
      tags: ['movie'],
    },
  });
  // const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to fetch movie data");
  }
  const data = await response.json();

  return data?.data || null;
}

export async function getEvents(limit) {
  const query = limit ? `?limit=${limit}` : '';
  const url = `${baseUrl}/event/events${query}`;

  const response = await fetch(url, {
    next: {
       revalidate: 60 * 60, 
      tags: ['events'],
    },
  });

//  const response = await fetch(url, { cache: "no-store" });
  //const response = await fetch(url, );

  if (!response.ok) {
    return null
    // throw new Error('Failed to fetch events');
  }



  const data = await response.json();
  return data?.data || null; 
}


export async function getEvent(id) {
  const url = `${baseUrl}/event/${id}`;
  
  const response = await fetch(url, {
    next: {
      revalidate: 60 * 60, 
      tags: ['event'],
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch event data");
  }
  const data = await response.json();

  return data?.data || null;
}

export async function getPosts(limit) {
  const query = limit ? `?limit=${limit}` : '';
  const url = `${baseUrl}/post/posts${query}`;
  
  //const response = await fetch(url, { cache: "no-store" });
  const response = await fetch(url, {
    next: {
       revalidate: 60 * 60, // Revalidate every hour
      tags: ['posts'],
    },
  });
 
  if (!response.ok) {
    return null
    // throw new Error('Failed to fetch events');
  }

  const data = await response.json();
  return data?.data || null; 
}

export async function getPost(id) {
  const url = `${baseUrl}/post/${id}`;
  
  const response = await fetch(url, {
    next: {
      revalidate: 60 * 60, 
      tags: ['post'],
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch post data");
  }
  const data = await response.json();

  return data?.data || null;
}

export async function getArtists() {
  const url = `${baseUrl}/artist/artists`; 
  //const response = await fetch(url, { cache: "no-store" });
  const response = await fetch(url, {
    next: {
      revalidate: 60 * 60, 
      tags: ['artists'],
    },
  });

  //const response = await fetch(url, ); 

  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }

  const data = await response.json();
  return data?.data || null; 
} 

export async function getArtist(id) {
  const url = `${baseUrl}/artist/${id}`;
  
  const response = await fetch(url, {
    next: {
      revalidate: 60 * 60, 
      tags: ['artist'],
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch Video data");
  }
  const data = await response.json();

  return data?.data || null;
}

export async function getAudios() {
  const url = `${baseUrl}/track/audios`; 
   //const response = await fetch(url, { cache: "no-store" });

  const response = await fetch(url, {
    next: {
      revalidate: 60 * 60, 
      tags: ['audios'],
    },
  });

  //const response = await fetch(url, ); // Cache for 60 seconds

  if (!response.ok) {
    throw new Error('Failed to fetch audios');
  }

  const data = await response.json();
  return data?.data.audios || null; 
}

export async function getVideos() {
  const url = `${baseUrl}/track/videos`; 
  const response = await fetch(url, {
    next: {
      revalidate: 60 * 60, 
      tags: ['videos'],
    },
  });

 // const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error('Failed to fetch audios');
  }

  const data = await response.json();
  return data?.data.videos || null; 
}

export async function fetchVideo(id) {
  const url = `${baseUrl}/track/video/${id}`;
  
  const response = await fetch(url, {
    next: {
      revalidate: 60 * 60, 
      tags: ['video'],
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch Video data");
  }
  const data = await response.json();

  return data?.data || null;
}

export async function fetchVideoByArtist(id, limit) {
  const query = limit ? `?limit=${limit}` : '';
  const url = `${baseUrl}/track/video/artist/${id}${query}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60 * 60, 
      tags: ['artistVideos'],
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch Video data");
  }
  const data = await response.json();

  return data?.data || null;
} 

export async function getAlbums( limit) {
  const query = limit ? `?limit=${limit}` : '';
  const url = `${baseUrl}/track/albums${query}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60 * 60, 
      tags: ['albums'],
    },
  });

 // const response = await fetch(url, { cache: "no-store" });
 
  if (!response.ok) {
    throw new Error("Failed to fetch albums data");
  }
  const data = await response.json();

  return data?.data || null;
} 

export async function getTopArtists( ) {
 
  const url = `${baseUrl}/artist/top/artists`

  const response = await fetch(url, {
    next: {
      revalidate: 60 * 60, 
      tags: ['topArtists'],
    },
  });
  // const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to fetch top artists data");
  }
  const data = await response.json();

  return data?.data || null;
} 

export async function getTrendingVideos( ) {
 
  const url = `${baseUrl}/track/trending/videos`
  //const response = await fetch(url, { cache: "no-store" });
  const response = await fetch(url, {
    next: {
      revalidate: 60 * 60, 
      tags: ['trendingVideos'],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch trending videos");
  }
  const data = await response.json();

  return data?.data || null;
} 
