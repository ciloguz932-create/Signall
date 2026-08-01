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
  return ({ children, href }: { children: any; href: string }) => {
    return <a href={href}>{children}</a>;
  };
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
