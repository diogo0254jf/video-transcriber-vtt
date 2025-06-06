# Video Transcriber Vtt

Este projeto automatiza a transcrição de vídeos em formato `.mp4` usando a API Deepgram e converte as transcrições em arquivos de legenda no formato `.vtt`.

This project automates the transcription of `.mp4` videos using the Deepgram API and converts the transcripts into `.vtt` subtitle files.

---

## 🇧🇷 Estrutura do Projeto

```
json_to_vtt.js
package.json
Transcripts/
Videos/
VTT/
```

- **Videos/**: Coloque aqui seus arquivos `.mp4`.
- **Transcripts/**: As transcrições em `.json` geradas pela Deepgram serão salvas aqui.
- **VTT/**: As legendas geradas em formato `.vtt` serão salvas aqui.

## 🇧🇷 Como usar

1. Instale as dependências:

   ```sh
   npm install
   ```

2. Coloque seus vídeos `.mp4` na pasta `Videos/`.

3. Execute o script principal:

   ```sh
   node json_to_vtt.js
   ```

4. As transcrições serão salvas em `Transcripts/` e as legendas em `VTT/`.

## 🇧🇷 Observações

- O script utiliza uma chave de API da Deepgram embutida no código. Para uso em produção, recomenda-se utilizar variáveis de ambiente para maior segurança.
- O script processa todos os arquivos `.mp4` encontrados na pasta `Videos/`.

---

## 🇺🇸 Project Structure

```
json_to_vtt.js
package.json
Transcripts/
Videos/
VTT/
```

- **Videos/**: Place your `.mp4` files here.
- **Transcripts/**: The `.json` transcripts generated by Deepgram will be saved here.
- **VTT/**: The generated `.vtt` subtitle files will be saved here.

## 🇺🇸 How to use

1. Install the dependencies:

   ```sh
   npm install
   ```

2. Put your `.mp4` videos in the `Videos/` folder.

3. Run the main script:

   ```sh
   node json_to_vtt.js
   ```

4. The transcripts will be saved in `Transcripts/` and the subtitles in `VTT/`.

## 🇺🇸 Notes

- The script uses a Deepgram API key embedded in the code. For production use, it is recommended to use environment variables for better security.
- The script processes all `.mp4` files found in the `Videos/` folder.

---

## Dependências / Dependencies

- [@deepgram/sdk](https://www.npmjs.com/package/@deepgram/sdk)
- [fs](https://www.npmjs.com/package/fs)

## Licença / License

ISC
