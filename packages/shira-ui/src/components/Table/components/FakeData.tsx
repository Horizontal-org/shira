import { faker } from '@faker-js/faker'

export type Person = {
  id: number
  name: string
  email: string
  dateInvited: Date
  status: 'registered' | 'invited'
  subRows?: Person[]
}

const range = (len: number) => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = (i: number): Person => {
  return {
    id: i,
    name: faker.person.fullName(),
    email: faker.internet.exampleEmail(),
    dateInvited: faker.date.recent(),
    status: faker.helpers.shuffle<Person['status']>([
      'registered',
      'invited'
    ])[0]!,
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!
    return range(len).map((_d, i): Person => {
      return {
        ...newPerson(i + 1),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}