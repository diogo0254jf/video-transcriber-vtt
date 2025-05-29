const fs = require("fs");
const { createClient } = require("@deepgram/sdk");
require("dotenv").config();

function getListOfVideosFilesAndTranscripts() {
  // busque todos os arquivos mp4 na pasta Videos
  const videoFiles = fs
    .readdirSync("./Videos")
    .filter((file) => file.endsWith(".mp4"));
 // console.log(videoFiles, "videoFiles");

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
   // console.log(data);

    const json = JSON.parse(data).results.utterances;

   // console.log(json, "json");

    // Faz um laço de repetição percorrendo o JSON
    for (const item of json) {
      // coloque em um aruqivo com o mesmo nome com extenção .vtt
      const vttFilePath = `./VTT/${videoFile.replace(".mp4", ".vtt")}`;
      fs.appendFileSync(
        vttFilePath,
        `${toVttTimestamp(item.start)} --> ${toVttTimestamp(item.end)}\n`
      ); // Adiciona o tempo de início e fim
      fs.appendFileSync(vttFilePath, `${item.transcript}\n\n`); // Adiciona o texto
    }
  }
}

function toVttTimestamp(num) {
  // Converte para número float
  const seconds = parseFloat(num);
  // Calcula minutos e segundos
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const millis = Math.round((seconds - Math.floor(seconds)) * 1000);

  // Formata para dois dígitos e três casas decimais
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

   // console.log(`Transcribing ${videoFile}...`);
    if (!fs.existsSync("./Transcripts")) {
      fs.mkdirSync("./Transcripts");
    }
    fs.writeFileSync(
      `./Transcripts/${videoFile.replace(".mp4", ".json")}`,
      JSON.stringify(result, null, 2)
    );
   // console.log(`Transcript saved for ${videoFile}`);
    

    if (error) throw error;
    if (!error) console.dir(result, { depth: null });
  }

 // console.log("Transcripts generated successfully!");
  generateVtt(videoFiles);
}

// 00:00.000 --> 00:06.000
// As background, I'm one of the originating founders of the Canadian Institute of Stress
