// faker module to generate data
import { faker } from '@faker-js/faker';

// types
import { ContactThreadType } from '../components/types';

function getMockedUsers(randomDataLength: number): ContactThreadType[] {
    const result: ContactThreadType[] = [];

    for (let i = 0; i < randomDataLength; i++) {
        const mockUserSchema: ContactThreadType = {
            _id: faker.datatype.uuid(),
            name: faker.name.findName(),
            avatar: faker.image.avatar(),
            online: faker.datatype.boolean(),
            isSelected: i === 0 ? !false : false,
        };
        result.push(mockUserSchema);
    }

    return result;
}

// mocked threads
export const mockedContactThread: ContactThreadType[] = getMockedUsers(10);