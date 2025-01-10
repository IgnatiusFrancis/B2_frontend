import React from "react";

const ArtistBiography = ({ bio }) => (
  <div>
    <p>{bio || "Biography not available."}</p>
  </div>
);

export default ArtistBiography;
