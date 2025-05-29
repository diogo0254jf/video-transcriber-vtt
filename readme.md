Collecting workspace information```markdown
# lixos

Este projeto automatiza a transcrição de vídeos em formato `.mp4` usando a API Deepgram e converte as transcrições em arquivos de legenda no formato `.vtt`.

## Estrutura do Projeto

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

## Como usar

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

## Observações

- O script utiliza uma chave de API da Deepgram embutida no código. Para uso em produção, recomenda-se utilizar variáveis de ambiente para maior segurança.
- O script processa todos os arquivos `.mp4` encontrados na pasta `Videos/`.

## Dependências

- [@deepgram/sdk](https://www.npmjs.com/package/@deepgram/sdk)
- [fs](https://www.npmjs.com/package/fs)

## Licença

ISC
```
