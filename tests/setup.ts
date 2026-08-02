// Jest setup file for Next.js application

// Polyfills required for Next.js testing
import '@testing-library/jest-dom';
import 'jest-canvas-mock';

// Mock Next.js modules
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock('next/link', () => {
  const { createElement } = jest.requireActual('react') as typeof import('react');
  return ({ children, href }: { children: React.ReactNode; href: string }) =>
    createElement('a', { href }, children);
});

// Mock canvas for HTMLCanvasElement
HTMLCanvasElement.prototype.getContext = jest.fn();

// Global test configuration
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Suppress console errors during tests
console.error = jest.fn();
console.warn = jest.fn();
