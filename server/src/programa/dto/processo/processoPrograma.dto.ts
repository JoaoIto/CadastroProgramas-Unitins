import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProcessoProgramaInputDto {
    @ApiProperty({ type: 'string', format: 'binary', example: 'rpi.pdf' })
    @IsNotEmpty({ message: 'O RPI é obrigatório!' })
    rpi: any;

    @ApiProperty({ type: 'string', format: 'binary', example: 'protocoloINPI.pdf' })
    @IsNotEmpty({ message: 'O protocolo do INPI é obrigatório!' })
    protocoloINPI: any;

    @ApiProperty({ type: 'string', format: 'binary', example: 'boleto.pdf' })
    @IsNotEmpty({ message: 'O boleto é obrigatório!' })
    boleto?: any;

    @ApiProperty({ type: 'string', format: 'binary', example: 'certificadoRegistro.pdf' })
    @IsNotEmpty({ message: 'O documento de certificado de registro é obrigatório!' })
    certificadoRegistro: any; 

    @ApiProperty({ type: 'string', format: 'binary', example: 'veracidade.pdf' })
    @IsNotEmpty({ message: 'O documento de veracidade é obrigatório!' })
    veracidade?: any;

    @ApiProperty({ type: String, example: 'SHA-256' })
    @IsString()
    @IsNotEmpty({ message: 'O código hash é obrigatório!' })
    codigoHash: string;
}
