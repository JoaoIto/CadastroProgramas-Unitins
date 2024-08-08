import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ProcessoProgramaInputDto {
    @ApiProperty({ type: String, example: 'RPI, número do RPI' })
    @IsString()
    rpi: string;

    @ApiProperty({ type: String, example: 'Protocolo do INPI, número do protocolo' })
    @IsString()
    protocoloINPI: string;

    @ApiProperty({ type: 'string', format: 'binary', example: 'boleto.pdf' })
    @IsNotEmpty({ message: 'O boleto é obrigatório!' })
    boleto?: any;

    @ApiProperty({ type: 'string', format: 'binary', example: 'certificadoRegistro.pdf' })
    @IsNotEmpty({ message: 'O documento de certificado de registro é obrigatório!' })
    certificadoRegistro: any; 

    @ApiProperty({ type: 'string', format: 'binary', example: 'veracidade.pdf' })
    @IsNotEmpty({ message: 'O documento de veracidade é obrigatório!' })
    veracidade?: any;

}
