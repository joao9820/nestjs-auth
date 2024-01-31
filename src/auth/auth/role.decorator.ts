import { SetMetadata } from '@nestjs/common';

export const Role = (role: string) => SetMetadata('role', role);

//Um decorator pode alterar o comportamento de uma variável, função, método ou classe
//Ou trabalhar com metadata
//o SetMetadata do Nestjs facilita a gravação e recuperação dos dados na memória, aonde utilizar o decorator
