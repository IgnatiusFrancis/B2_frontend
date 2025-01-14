"use client";
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Loader2, Music, Upload } from 'lucide-react';
import Tiptap from "@/components/TipTap";

const AddMusic = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [artists, setArtists] = useState([]);
  const [isLoadingArtists, setIsLoadingArtists] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    description: '',
    duration: '',
    artistId: '',
    audioFile: null,
    thumbnailFile: null
  });

  // Token validation
  const validateToken = useCallback(async () => {
    const token = localStorage.getItem('b2xclusiveadmin');
    if (!token) {
      toast.error('Please sign in to continue');
      router.push('/login');
      return null;
    }

    try {
      const cleanToken = token.replace(/^['"](.*)['"]$/, '$1');
      const decoded = jwtDecode(cleanToken);
      
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem('b2xclusiveadmin');
        toast.error('Session expired. Please sign in again');
        router.push('/login');
        return null;
      }
      
      return cleanToken;
    } catch (error) {
      console.error('Token validation error:', error);
      toast.error('Authentication error');
      router.push('/login');
      return null;
    }
  }, [router]);

  // Fetch artists
  const fetchArtists = useCallback(async (token) => {
    setIsLoadingArtists(true);
    try {
      const response = await axios.get(
        'https://b2xclusive.onrender.com/api/v1/artist/artists',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setArtists(response.data.data);
    } catch (error) {
      toast.error('Failed to load artists');
      console.error('Artist fetch error:', error);
    } finally {
      setIsLoadingArtists(false);
    }
  }, []);

  useEffect(() => {
    const initializeComponent = async () => {
      const token = await validateToken();
      if (token) {
        fetchArtists(token);
      }
    };
    initializeComponent();
  }, [validateToken, fetchArtists]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = await validateToken();
      if (!token) return;

      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'audioFile') {
          submitData.append('audios', formData.audioFile);
        } else if (key === 'thumbnailFile') {
          submitData.append('thumbnail', formData.thumbnailFile);
        } else {
          submitData.append(key, formData[key]);
        }
      });

      const response = await axios.put(
        'https://b2xclusive.onrender.com/api/v1/track/createAudio',
        submitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.success(response.data.message);
      router.push('/admin');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create music');
      console.error('Submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Add New Music</h1>
        <p className="text-gray-600 mt-2">Upload and publish new music tracks</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Track Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg"
              placeholder="Enter track title"
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <input
                type="text"
                value={formData.subTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, subTitle: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="Enter subtitle"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Artist</label>
              <select
                value={formData.artistId}
                onChange={(e) => setFormData(prev => ({ ...prev, artistId: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                required
                disabled={isLoadingArtists}
              >
                <option value="">Select an artist</option>
                {artists.map((artist) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="e.g. 3:45"
                required
              />
            </div>
          </div>
        </div>

        {/* Media Upload Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Thumbnail Upload */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <label className="block text-sm font-medium mb-4">Cover Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                onChange={(e) => setFormData(prev => ({ ...prev, thumbnailFile: e.target.files[0] }))}
                className="hidden"
                id="thumbnail-upload"
                accept="image/*"
              />
              <label htmlFor="thumbnail-upload" className="cursor-pointer">
                {formData.thumbnailFile ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <Image
                      src={URL.createObjectURL(formData.thumbnailFile)}
                      alt="Cover preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-8">
                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload cover image</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Audio Upload */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <label className="block text-sm font-medium mb-4">Audio File</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                onChange={(e) => setFormData(prev => ({ ...prev, audioFile: e.target.files[0] }))}
                className="hidden"
                id="audio-upload"
                accept="audio/*"
              />
              <label htmlFor="audio-upload" className="cursor-pointer">
                <div className="flex flex-col items-center py-8">
                  <Music className={`w-12 h-12 mb-2 ${formData.audioFile ? 'text-blue-500' : 'text-gray-400'}`} />
                  <p className="text-sm text-gray-600">
                    {formData.audioFile ? formData.audioFile.name : 'Click to upload audio file'}
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <label className="block text-sm font-medium mb-4">Track Description</label>
          <Tiptap
            content={formData.description}
            onChange={(newContent) => setFormData(prev => ({ ...prev, description: newContent }))}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Publishing...
            </>
          ) : (
            'Publish Track'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddMusic;