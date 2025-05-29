const fs = require("fs");
const { createClient } = require("@deepgram/sdk");
require("dotenv").config();

function getListOfVideosFilesAndTranscripts() {
  const videoFiles = fs
    .readdirSync("./Videos")
    .filter((file) => file.endsWith(".mp4"));

  generateTranscript(videoFiles);
}

getListOfVideosFilesAndTranscripts();

function generateVtt(videoFiles) {
  for (const videoFile of videoFiles) {
    const transcriptFilePath = `./Transcripts/${videoFile.replace(
      ".mp4",
      ".json"
    )}`;
    const data = fs.readFileSync(transcriptFilePath, "utf8");

    const json = JSON.parse(data).results.utterances;

    for (const item of json) {
      const vttFilePath = `./VTT/${videoFile.replace(".mp4", ".vtt")}`;
      fs.appendFileSync(
        vttFilePath,
        `${toVttTimestamp(item.start)} --> ${toVttTimestamp(item.end)}\n`
      );
      fs.appendFileSync(vttFilePath, `${item.transcript}\n\n`); // Adiciona o texto
    }
  }
}

function toVttTimestamp(num) {
  const seconds = parseFloat(num);
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const millis = Math.round((seconds - Math.floor(seconds)) * 1000);

  const pad = (n, z = 2) => String(n).padStart(z, "0");
  const padMillis = (n) => String(n).padStart(3, "0");

  return `${pad(minutes)}:${pad(secs)}.${padMillis(millis)}`;
}

async function generateTranscript(videoFiles) {

  
  for (const videoFile of videoFiles) {
    console.log(`Processing ${videoFile}...`);
    
    const deepgram = createClient(process.env.DEEPGRAM_API_KEY);
    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      fs.readFileSync(`./Videos/${videoFile}`),
      {
        model: 'nova-3',
        language: 'en',
        smart_format: true,
        utterances: true,
      }
    );

    if (!fs.existsSync("./Transcripts")) {
      fs.mkdirSync("./Transcripts");
    }
    fs.writeFileSync(
      `./Transcripts/${videoFile.replace(".mp4", ".json")}`,
      JSON.stringify(result, null, 2)
    );    

    if (error) throw error;
    if (!error) console.dir(result, { depth: null });
  }

  generateVtt(videoFiles);
}
