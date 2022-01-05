import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const test = [
      {
        Id: 1,
        PhysicalName: 'FD123',
        AliasName: 'AuditSQLDEV',
        ProjectName: 'VRC',
      },
      {
        Id: 2,
        PhysicalName: 'FD124',
        AliasName: 'AuditSQLUAT',
        ProjectName: 'VRC',
      },
      {
        Id: 3,
        PhysicalName: 'FD125',
        AliasName: 'AuditSQLTest',
        ProjectName: 'VRC',
      },
      {
        Id: 4,
        PhysicalName: 'FD126',
        AliasName: 'AuditSQLProd',
        ProjectName: 'VRC',
      },
      {
        Id: 5,
        PhysicalName: 'FD127',
        AliasName: 'PACTDEV',
        ProjectName: 'PACT',
      },
      {
        Id: 6,
        PhysicalName: 'FD128',
        AliasName: 'PACTUAT',
        ProjectName: 'PACT',
      },
      {
        Id: 7,
        PhysicalName: 'FD129',
        AliasName: 'PACTTest',
        ProjectName: 'PACT',
      },
      {
        Id: 8,
        PhysicalName: 'FD223',
        AliasName: 'PACTProd',
        ProjectName: 'PACT',
      },
      {
        Id: 9,
        PhysicalName: 'FD224',
        AliasName: 'AuditSQLDEV',
        ProjectName: 'VRC',
      },
      {
        Id: 10,
        PhysicalName: 'FD225',
        AliasName: 'IWASDEV',
        ProjectName: 'IWAS',
      },
      {
        Id: 11,
        PhysicalName: 'FD226',
        AliasName: 'IWASUAT',
        ProjectName: 'IWAS',
      },
      {
        Id: 12,
        PhysicalName: 'FD227',
        AliasName: 'IWASTest',
        ProjectName: 'IWAS',
      },
      {
        Id: 13,
        PhysicalName: 'FD228',
        AliasName: 'IWASProd',
        ProjectName: 'IWAS',
      },
      {
        Id: 14,
        PhysicalName: 'FD229',
        AliasName: 'WASSDEV',
        ProjectName: 'WASS',
      },
      {
        Id: 15,
        PhysicalName: 'FD330',
        AliasName: 'WASSUAT',
        ProjectName: 'WASS',
      },
      {
        Id: 16,
        PhysicalName: 'FD331',
        AliasName: 'WASSTest',
        ProjectName: 'WASS',
      },
      {
        Id: 17,
        PhysicalName: 'FD332',
        AliasName: 'WASSProd',
        ProjectName: 'WASS',
      },
      {
        Id: 18,
        PhysicalName: 'FD333',
        AliasName: 'ETimeDEV',
        ProjectName: 'ETime',
      },
      {
        Id: 19,
        PhysicalName: 'FD334',
        AliasName: 'ETimeTest',
        ProjectName: 'ETime',
      },
      {
        Id: 20,
        PhysicalName: 'FD335',
        AliasName: 'ETimeProd',
        ProjectName: 'ETime',
      },
      {
        Id: 21,
        PhysicalName: 'FD336',
        AliasName: 'EGateDev',
        ProjectName: 'EGate',
      },
      {
        Id: 22,
        PhysicalName: 'FD337',
        AliasName: 'EGateTest',
        ProjectName: 'EGate',
      },
      {
        Id: 23,
        PhysicalName: 'FD338',
        AliasName: 'EGateUAT',
        ProjectName: 'EGate',
      },
      {
        Id: 24,
        PhysicalName: 'FD339',
        AliasName: 'EGatePROD',
        ProjectName: 'EGate',
      },
      {
        Id: 25,
        PhysicalName: 'FD440',
        AliasName: 'DB2Dev',
        ProjectName: 'DB2',
      },
      {
        Id: 26,
        PhysicalName: 'FD441',
        AliasName: 'DB2Prod',
        ProjectName: 'DB2',
      },
      {
        Id: 27,
        PhysicalName: 'FD442',
        AliasName: 'DB2UAT',
        ProjectName: 'DB2',
      },
      {
        Id: 28,
        PhysicalName: 'FD443',
        AliasName: 'DB2Test',
        ProjectName: 'DB2',
      },
      {
        Id: 29,
        PhysicalName: 'FD444',
        AliasName: 'FTBNET2Dev',
        ProjectName: 'FTBNET2',
      },
      {
        Id: 30,
        PhysicalName: 'FD445',
        AliasName: 'FTBNET2PreProd',
        ProjectName: 'FTBNET2',
      },
      {
        Id: 31,
        PhysicalName: 'FD446',
        AliasName: 'FTBNET2Prod',
        ProjectName: 'FTBNET2',
      },
    ];
    const employees = [
      {
        id: 1,
        firstName: 'hehehe',
        lastName: 'Pham',
        email: 'hoang@gmail.com',
      },
      {
        id: 2,
        firstName: 'Tam',
        lastName: 'La2',
        email: 'tam@gmail.com',
      },
      {
        id: 3,
        firstName: 'Khanh',
        lastName: 'Nguyen',
        email: 'khanh@yahoo.com',
      },
      {
        id: 4,
        firstName: 'khoi17',
        lastName: 'tatasas',
        email: 'haha@gmail.com',
      },
      {
        id: 5,
        firstName: 'asas',
        lastName: 'as',
        email: 'asas@gmail.com',
      },
      {
        id: 6,
        firstName: '122',
        lastName: '122',
        email: '2q@gmail.com',
      },
      {
        id: 7,
        firstName: 'kokook',
        lastName: '2323',
        email: 'kaka@gmai.com',
      },
      {
        id: 8,
        firstName: '12',
        lastName: '1212',
        email: 'ka@gmail.com',
      },
      {
        id: 9,
        firstName: '12',
        lastName: '12',
        email: '12@yahoo.com',
      },
      // {
      //   id: 10,
      //   firstName: '121',
      //   lastName: '1212',
      //   email: '1@gmail.com',
      // },
      // {
      //   id: 11,
      //   firstName: 'asasas',
      //   lastName: 'hoang',
      //   email: '12121@haha',
      // },
      // {
      //   id: 12,
      //   firstName: 'hehe',
      //   lastName: '1212',
      //   email: 'asasa22@gmail.com',
      // },
    ];
    return { test, employees };
  }
}
