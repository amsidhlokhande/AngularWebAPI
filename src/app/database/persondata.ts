import { InMemoryDbService } from 'angular-in-memory-web-api';

export class PersonDatabase implements InMemoryDbService {
  createDb() {
    let persons: Person[] = [ {
      id: 1,
      name: 'Amsidh Lokhande',
      email: 'amsidhlokhande@gmail.com',
      age: 38
    },
    {
      id: 2,
      name: 'Aditya Lokhande',
      email: 'adityalokhande@gmail.com',
      age: 7
    },
    {
      id: 3,
      name: 'Adithi Lokhande',
      email: 'adithilokhande@gmail.com',
      age: 11
    },
    {
      id: 4,
      name: 'Anjali Lokhande',
      email: 'anjalilokhande@gmail.com',
      age: 35
    }
    ];
    return { persons };
  }

}

export interface Person {
  id: number;
  name: string;
  age: number;
  email: string;
}
