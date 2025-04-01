document.addEventListener('DOMContentLoaded', function() {
    // Audio element
    const audio = new Audio();
    let currentSongIndex = 0;
    let isPlaying = false;
    
    // Songs playlist
    const songs = [
        {
            title: "Sunny Day",
            artist: "Joyful Beats",
            src: "songs/song1.mp3",
            cover: "images/cover1.jpg.jpg"
        },
        {
            title: "Night Drive",
            artist: "Synth Wave",
            src: "songs/song2.mp3",
            cover: "images/cover2.jpg.jpg"
        },
        {
            title: "Morning Coffee",
            artist: "Chill Vibes",
            src: "songs/song3.mp3",
            cover: "images/cover3.jpg.jpg"
        },
        {
            title: "Summer Breeze",
            artist: "Tropical Mix",
            src: "songs/song4.mp3",
            cover: "images/cover4.jpg.jpg"
        }
    ];
    
    // DOM Elements
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const progressBar = document.getElementById('progress-bar');
    const songTitle = document.getElementById('song-title');
    const artist = document.getElementById('artist');
    const albumCover = document.getElementById('album-cover');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const songList = document.getElementById('song-list');
    const musicPlayer = document.querySelector('.music-player');
    
    // Initialize the player
    function initPlayer() {
        // Create playlist
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.textContent = `${song.title} - ${song.artist}`;
            li.addEventListener('click', () => playSong(index));
            songList.appendChild(li);
        });
        
        // Load the first song
        loadSong(currentSongIndex);
        
        // Event listeners
        playBtn.addEventListener('click', togglePlay);
        prevBtn.addEventListener('click', prevSong);
        nextBtn.addEventListener('click', nextSong);
        volumeSlider.addEventListener('input', setVolume);
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', nextSong);
        audio.addEventListener('loadedmetadata', updateDuration);
        progressBar.parentElement.addEventListener('click', setProgress);
    }
    
    // Load a song
    function loadSong(index) {
        const song = songs[index];
        songTitle.textContent = song.title;
        artist.textContent = song.artist;
        albumCover.src = song.cover;
        audio.src = song.src;
        
        // Update active song in playlist
        const playlistItems = songList.querySelectorAll('li');
        playlistItems.forEach(item => item.classList.remove('playing'));
        playlistItems[index].classList.add('playing');
    }
    
    // Play/Pause toggle
    function togglePlay() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }
    
    // Play song
    function playSong(index) {
        if (typeof index === 'number') {
            currentSongIndex = index;
            loadSong(currentSongIndex);
        }
        
        audio.play();
        isPlaying = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        musicPlayer.classList.add('playing');
    }
    
    // Pause song
    function pauseSong() {
        audio.pause();
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        musicPlayer.classList.remove('playing');
    }
    
    // Previous song
    function prevSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = songs.length - 1;
        }
        loadSong(currentSongIndex);
        if (isPlaying) {
            audio.play();
        }
    }
    
    // Next song
    function nextSong() {
        currentSongIndex++;
        if (currentSongIndex >= songs.length) {
            currentSongIndex = 0;
        }
        loadSong(currentSongIndex);
        if (isPlaying) {
            audio.play();
        }
    }
    
    // Set volume
    function setVolume() {
        audio.volume = volumeSlider.value;
    }
    
    // Update progress bar
    function updateProgress() {
        const { currentTime, duration } = audio;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        
        // Update current time
        currentTimeEl.textContent = formatTime(currentTime);
    }
    
    // Update duration
    function updateDuration() {
        durationEl.textContent = formatTime(audio.duration);
    }
    
    // Set progress bar on click
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }
    
    // Format time (seconds to mm:ss)
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Initialize the player
    initPlayer();
});