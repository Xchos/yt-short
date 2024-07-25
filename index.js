#!/usr/bin/env node
const fs = require('fs');
const yargs = require('yargs');
const { exec } = require('child_process');
const axios = require('axios');


const { readApiKey, saveApiKey, readDefaultLanguage, saveDefaultLanguage, readModel, saveModel } = require('./config');

yargs
    .command({
        command: 'get <url>',
        describe: 'Get shorten youtube video in text output',
        handler: (argv) => {
            const url = argv.url;
            const apiKey = readApiKey();
            const cmd = `yt-dlp -f "bestaudio[ext=m4a]" --extract-audio --audio-format mp3 ${url} -o output.mp3`;
            console.log(`Watching video, please wait...`);
            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error downloading MP3: ${error.message}`);
                    return;
                }
                console.log(`Video watched, working on summary ...\n\n`);

                const mp3File = fs.readFileSync('output.mp3');
                const blob = new Blob([mp3File], { type: 'audio/mp3' });

                const formData = new FormData();
                formData.append('file', blob, 'output.mp3');
                formData.append('model', 'whisper-large-v3');
                formData.append('temperature', '0');
                formData.append('response_format', 'json');

                axios.post('https://api.groq.com/openai/v1/audio/transcriptions', formData, {
                    headers: {
                        'Authorization': `bearer ${apiKey}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                    .then((response) => {

                        const bulkText = response.data.text;
                        const lang = readDefaultLanguage()
                        const instructionSet = `Summarize the bulk text (video transcript) into 1 short paragraph that describes what can be seen in the video (main message). Output will be in defined language: ${lang}`;
                        const instructionSet2 = `Based on the bulk text (video transcript) rate video entertaiment, information and suggest if its worth watching. Output as short as possible - just list of all ratings. Output will be in defined language: ${lang}`;

                        axios.post('https://api.groq.com/openai/v1/chat/completions', {
                            messages: [
                                {
                                    role: 'system',
                                    content: instructionSet,
                                },
                                {
                                    role: 'user',
                                    content: bulkText,
                                },
                            ],
                            model: readModel()
                        }, {
                            headers: {
                                'Authorization': `bearer ${apiKey}`
                            }
                        }).then((response) => {
                            console.log(response.data.choices[0].message.content);

                            axios.post('https://api.groq.com/openai/v1/chat/completions', {
                                messages: [
                                    {
                                        role: 'system',
                                        content: instructionSet2,
                                    },
                                    {
                                        role: 'user',
                                        content: bulkText,
                                    },
                                ],
                                model: readModel()
                            }, {
                                headers: {
                                    'Authorization': `bearer ${apiKey}`
                                }
                            }).then((response) => {
                                console.log(`${response.data.choices[0].message.content}\n\n`);
                            }).catch((error) => {
                                console.error(`Error making API rating call: ${error.message}`);
                            });
                        }).catch((error) => {
                            console.error(`Error making API transcript call: ${error.message}`);
                        });

                    })
                    .catch((error) => {
                        console.error(`Error making API transcript call: ${error.message}`);
                    });
                fs.unlink('output.mp3', (error) => { });
                fs.unlink('output.m4a', (error) => { });
            });
        },
    })
    .command({
        command: 'config',
        describe: 'settings',
        builder: (yargs) => {
            yargs.option('apiKey', {
                type: 'string',
                describe: `Groq API key`,
                demandOption: false,
            });
            yargs.option('lang', {
                type: 'string',
                describe: `default language [${readDefaultLanguage()}]`,
                demandOption: false,
            });
            yargs.option('model', {
                type: 'string',
                describe: `model to use [${readModel()}]`,
                demandOption: false,
            });
        },
        handler: (argv) => {
            if (argv.apiKey) {
                saveApiKey(argv.apiKey);
                console.log('Groq API key saved');
            }
            if (argv.lang) {
                saveDefaultLanguage(argv.lang);
                console.log('Default language saved', argv.lang);
            }
            if (argv.model) {
                saveModel(argv.model);
                console.log('Model saved', argv.model);
            }
        },
    })
    .demandCommand()
    .help()
    .argv;
