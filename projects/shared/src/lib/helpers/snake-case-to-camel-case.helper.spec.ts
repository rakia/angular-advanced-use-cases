import { snakeCaseToCamelCase } from './snake-case-to-camel-case.helper';

test('snakeCaseToCamelCase converts snake case to camel case', () => {
  const snakeCaseStr = 'my_snake_case_string';
  const expected = 'mySnakeCaseString';
  const result = snakeCaseToCamelCase(snakeCaseStr);
  expect(result).toBe(expected);
});
