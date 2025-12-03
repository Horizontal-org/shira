import { faker } from '@faker-js/faker'

export type Person = {
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

const newPerson = (): Person => {
  return {
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
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}