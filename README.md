# steganography-node-api
a simple nodeJs api that hide a message in a bitmap image, using Least Significant Bit LSB
---

## Language
**Javascript/Typescript**


## Minimum Requirements
NodeJs
REST API Client

## Run in local
~~~ bash
npm install
npm run dev-start
~~~ 


## Endpoints
Collection available for running Successful tests and Failed cases</br>
</br>
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/16227218-f3f49269-907a-4899-b948-a2c787092c03?action=collection%2Ffork&collection-url=entityId%3D16227218-f3f49269-907a-4899-b948-a2c787092c03%26entityType%3Dcollection%26workspaceId%3D68ac0672-2bf2-40f8-a03e-c77bc6f362eb)
</br>
[API Documentation](https://documenter.getpostman.com/view/16227218/UVCCdNVx#c3148b6e-68e0-42ab-ae0b-41a9e6f94e41)

- **post** localhost/3003/upload
    - Content-Type: multipart/form-data
    - form data key: file

- **get** localhost:3003/get-image?fileName=
    - query key: fileName
    - exemple: localhost:3003/get-image?fileName=encoded_test.bmp

- **post** localhost:3003/write-message-on-image
    - body keys: fileName and message

- **get** localhost:3003/decode-message-from-image?fileName=
    - query key: fileName
    - exemple: localhost:3003/decode-message-from-image?fileName=1637167884402.bmp



# Notes

Fluxo Principal
 Routes => Controller => Business

- SteganoBusiness.ts | Concentra as regras de Estegnografia
    - stringToBitsArray
        - converte em bits cada caractere de uma string e cada um desses bit são armazenados indivualmente em um array;
        - retorna um array;
    - toEmbedSteganography
        - grava uma mensagem no arquivo de imagem. A Rotina em resumo:
            - Validação básica dos inputs;
            - Verifica se o arquivo existe;
            - Verifica se o tamanho do arquivo irá comportar a gravação da mensagem. Obs.: Incluí uma margem de segurança de 142 bytes + 80bytes que correspondem aos **headers** do arquivo e da própria mensagem respectivamente;
            - Converte a mensagem em array de bits, incluindo um ***header*** somente com a informação total de bytes a serem gravados, que para no processo de decode percorra extamente o length necessário. Obs.: o **header** irá comportar um máximo de 10dígitos que correspondem a 9.999.999.999bytes, sendo que essa informação será distribuida ao longo de 80bytes do arquivo;
            - Cria uma cópia do arquivo;
            - Copia e bufferiza os bytes do arquivo a ter a mensagem gravada. Importante: os dados a serem manipulados do arquivo serão sempre do final do arquivo para que não sobreponha algum cabeçalho da imagem;
            - Para cada byte do arquivo em buffer, será substituido o último bit por um novo que corresponde a mensagem. A gravação da mensagem será em ordem reversa, conforme a seguir
              
                Last File Byte (length -1)
                |OriginalBit|B993|B994|B995|B996|B997|B998|B999||
                |--|--|--|--|--|--|--|--|--|
                |Newbit| | | | | | | |B1|
                
                penult File Byte (length -2)
                |OriginalBit|B985|B986|B987|B988|B989|B990|B991||
                |--|--|--|--|--|--|--|--|--|
                |Newbit| | | | | | | |B2|
                
                antepenult File Byte (length -3)
                |OriginalBit|B977|B978|B979|B980|B981|B982|B983||
                |--|--|--|--|--|--|--|--|--|
                |Newbit| | | | | | | |B3|            
              
            -    Ao final, o buffer será escrito no arquivo na posição correspondente a de recorte;
    - decodeSteganography
        - Resgata e faz a leitura da mensagem que está gravada na image. Em resumo:
            - Validação básica dos inputs;
            - Verifica se o arquivo existe;
            - Faz a leitura dos últimos 80bytes do arquivo, os quais contém a informação de quantos bytes foram gravados e com isso percorerrá a leitura em tamanho justo;
            - Após a informação dos bytes gravados, inicia a rotina de recuperação do bits gravados e ao final convertará os bits em informação de caratere, que por sua vez será convertido em string/mensagem

- FileBusiness.ts | Concentra as regras de onde e como os arquivos serão armazenados
    - getImagePath
        - Informa o caminho o qual o arquivo com a mensagem esteganografada está.
            - Validação básica dos inputs;
            - Verifica se o arquivo existe;
            - Retorna com o caminho de onde a imagem com esteganografia está;
    - saveFileConfig
        - Contém as regras sobre upload de uma imagem. Essas regras serão utilizadas pela lib Multer na camada de Controle


## To do & Possible Features
- feature: caso o arquivo não comportar a gravação da mensagem, poderia ser dada a opção de redimensionar o tamanho do arquivo. Poderia ser facilmente implementado usando o Jimp Js;
- feature: criptografar mensagem antes de gravar na imagem;
- feature: aplicar recurso para salvar imagens em banco de dados ou nuvem, trazendo uma camada de Banco de Dados e aplicando inversão de dependência em Business
- to do: validação aprimorada dos inputs
- to do: melhorar renomeação dos arquivos, tanto para uploads quanto para esteganografados
- to do: aprimorar tipos e aplica-los ao longo do código
- to do: refatorar loop de interação dos bits aplicando bitwise
- to do: em caso de ampliação, poderia ser aplicado rotas separando ações de arquivo e ações de esteganografia | de fato tinha feito, mas acabei apagando por ter poucas ações


## Libs
- External NodeJs libs
    - Express Js - server http
    - Multer Js - handle upload
    - Jest - tests

- Embed NodeJs libs
    - fs - write and read files
    - buffer - aloc and manipulates data in buffer memory
    - path - resolve directory path


## Unity Test
Business Stegano</br>
PASS  src/tests/SteganoBusiness.test.ts</br>
    Suit for "stringToBitsArray"</br>
        ✓ Should failed to pass message to bit array</br>
        ✓ Should be sucessfully in pass message to bit array</br>
    Suit for "toEmbedSteganography"</br>
        ✓ Should failed for empty message</br>
        ✓ Should failed for empty fileName</br>
        ✓ Should failed for invalid fileName extension</br>
        ✓ Should failed for inexistent fileName</br>
        ✓ Should failed for file sizeless for write</br>
        ✓ Should be sucessfully in create steganography</br>
    Suit for "decodeSteganography"</br>
        ✓ Should failed for empty file name</br>
        ✓ Should failed for invalid fileName extension</br>
        ✓ Should failed for inexistent fileName</br>
        ✓ Should be sucessfully in decode steganography</br>
</br>
Business File</br>
PASS  src/tests/FileBusiness.test.ts</br>
  Suit for "getImagePath"</br>
    ✓ Should failed for empty fileName)</br>
    ✓ Should failed for invalid fileName extension</br>
    ✓ Should failed for inexistent fileName</br>
    ✓ Should be successfully for a valid fileName