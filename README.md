# steganography-node-api
a simple api thats hide a message in a bitmap image, using Least Significant Bit LSB


draft notes:

//a mesagem a ser gravada precisa ser diluída somente nos arquivos de informaçãode pixel e em quantidade de bytes suficientes  para não sobrescrever dados de cabeçalho do arquivo

// as informações (msg + info ultimo byte) a serem gravadas no arquivo são alocadas em um buffer, cada byte a ser g


penult File Byte (length -2)
|OriginalBit|B1|B2|B3|B4|B5|B6|B7||
|--|--|--|--|--|--|--|--|--|
|Newbit| | | | | | | |B2|

Last File Byte (length -1)
|OriginalBit|B1|B2|B3|B4|B5|B6|B7||
|--|--|--|--|--|--|--|--|--|
|Newbit| | | | | | | |B1|


//os 80 últimos bytes do arquivo contém as informações de qual byte termina a mesagem
80bytes (10digitos x 8 bits) pq considera 10digitos para informação da qty de bytes necessaria para gravaçação, e partir daí dilui os bits dessa informação ao longo de 80bytes do arquivo

//a iteiração para pegar os bytes do arquivo deve ser sempre reversa, ou seja, do último byte em diante.

//melhorias
caso o arquivo não comportar a mensagem, poderia ser dada a opção de redimensionar o tamanho da imagem
poderia ser facilmente implementado usando o jimp js para o redimensionamento