import { useState, useEffect } from 'react'
import { BASE_URL } from './global'
import SearchForm from './components/SearchForm'
import Song from './components/Song'
import axios from 'axios'
import './styles/App.css'

const App = () => {
  
  //URL to search for Artist
  const [artist,setArtist] = useState('')
  const [songId,setSongId] = useState('')
  const [songList,setSongList] = useState('')

  const artistUrl = `${BASE_URL}/search`
  const lyricsUrl = `${BASE_URL}/songs/${songId}/lyrics`
  //const apiKey = process.env.REACT_APP_RAPIDAPI_KEY


  const handleClick = async () => {    
    //Get me 20 songs by the artist in the search
      const options = {
        method: 'GET',
        params: {q: artist, per_page: '20', page: '1'},
        headers: {
          'X-RapidAPI-Key': `6a96ef12e3mshbaf4615790c6073p140476jsn118ebe42f2ca`,
          'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
      }

      //API Call
      const response = await axios.get(artistUrl, options)
      setSongList(response.data.response.hits)
      console.log(response.data.response.hits);
      console.log(response);
      
      //Reset Artist input field
      setArtist('')
  }

// Search form component with input and button
// SongList.jsx - here song list
// SongDetail - api_path to pull song lyric .... map((SONG) => {api_path})

  return (
    <div>
      <SearchForm
        artist={artist}
        setArtist={setArtist}
        handleClick={handleClick}
      />
      <div className='songGrid'>
        {songList.map((song) => (
          <Song 
            key={song.result.api_path}
            song={song.result}
          />
        ))}
      </div>
    </div>
  )
}

export default App;
