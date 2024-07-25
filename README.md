**YouTube Video Summarizer**
==========================

A command-line tool that summarizes YouTube videos using the Groq API.

**Installation**
---------------

To install the YouTube Video Summarizer, run the following command:

```bash
brew install yt-short
```

**Post-Installation Configuration**
---------------------------------

After installation, you need to configure the tool with your Groq API key. Run the following command:

```bash
yt-short config --apiKey your-groq-api-key
```

You can also optionally configure the default language and model used for summarization:

```bash
yt-short config --lang <language-code>  # default: en
yt-short config --model <model-name>  # default: llama-3.1-8b-instant
```

**Usage**
-----

To summarize a YouTube video, run the following command:

```bash
yt-short get <youtube-video-url>
```

Replace `<youtube-video-url>` with the URL of the YouTube video you want to summarize.

**Options for Configuration**
---------------------------

The following options are available for configuration:

* `--apiKey`: Set your Groq API key.
* `--lang`: Set the default language used for summarization.
* `--model`: Set the model used for summarization.

**Examples**
--------

* Summarize a YouTube video: `yt-short get https://www.youtube.com/watch?v=dQw4w9WgXcQ`
* Configure your Groq API key: `yt-short config --apiKey your-groq-api-key`
* Set the default language to English: `yt-short config --lang en`

**Troubleshooting**
---------------

If you encounter any issues, please check the following:

* Make sure you have installed the tool correctly.
* Verify that your Groq API key is correct.
* Check the YouTube video URL is correct.

**Contributing**
------------

If you‛d like to contribute to the YouTube Video Summarizer, please fork the repository and submit a pull request.

**License**
-------

The YouTube Video Summarizer is licensed under the [MIT License](https://opensource.org/licenses/MIT).