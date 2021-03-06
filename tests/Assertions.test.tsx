import React from 'react';
import { render } from '@testing-library/react-native';
import * as fontawesome from '@fortawesome/fontawesome-svg-core';

import SvgIcon from '../src/components/SvgIcon';
import { AssertionError } from '../src/assert';

const faCoffee: fontawesome.IconDefinition = {
  prefix: 'fas',
  iconName: 'coffee',
  icon: [
    640,
    512,
    [],
    'f0f4',
    'M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z'
  ]
};

const faCircle: fontawesome.IconDefinition = {
  prefix: 'fas',
  iconName: 'circle',
  icon: [
    640,
    512,
    [],
    'f0f4',
    'M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z'
  ]
};

fontawesome.library.add(faCoffee, faCircle);

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  // @ts-ignore
  console.error.mockRestore();
});

describe('test assertions in SvgIcon component', () => {
  describe('when [prefix,iconName] is not registered in library', () => {
    test('assertion error is thrown', () => {
      let catchedAssertionError = false;
      try {
        render(<SvgIcon icon={['fas', 'users']} />);
      } catch (error) {
        if (error instanceof AssertionError) {
          catchedAssertionError = true;
        }
      }

      expect(catchedAssertionError).toBe(true);
    });
  });
  describe('when height or width props are specified without a size prop', () => {
    test('assertion error is thrown', () => {
      let catchedAssertionError = false;
      try {
        // @ts-ignore
        render(<SvgIcon icon={faCoffee} height={32} width={32} />);
      } catch (error) {
        if (error instanceof AssertionError) {
          catchedAssertionError = true;
        }
      }

      expect(catchedAssertionError).toBe(true);
    });
  });

  describe('when height or width props are specified WITH a size prop', () => {
    test('assertion error is thrown', () => {
      let catchedAssertionError = false;
      try {
        // @ts-ignore
        render(<SvgIcon icon={faCoffee} size={64} height={32} width={32} />);
      } catch (error) {
        if (error instanceof AssertionError) {
          catchedAssertionError = true;
        }
      }

      expect(catchedAssertionError).toBe(true);
    });
  });

  describe('when extra props are given', () => {
    test('assertion error is thrown', () => {
      console.error('fuck');
      let catchedAssertionError = false;
      try {
        // @ts-ignore
        render(<SvgIcon icon={faCoffee} color="purple" foo="bar" />);
      } catch (error) {
        if (error instanceof AssertionError) {
          catchedAssertionError = true;
        }
      }

      expect(catchedAssertionError).toBe(true);
    });
  });
});
