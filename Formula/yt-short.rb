class YtShort < Formula
    desc "Asks Groq for summary of YouTube video link"
    homepage "https://github.com/xchos/yt-short"
    version "1.0.0"
  
    depends_on "node"
    depends_on "yt-dlp"
    depends_on "ffmpeg"
  
    def install
      system "npm", "install", "-g", "yt-short"
    end
  
    def caveats
      "Make sure you have Node.js installed and yt-dlp and ffmpeg are installed and in your PATH."
    end
  
    test do
      system "yt-short", "--version"
    end
  end