import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRole } from './useRole';
import { useAppSelector } from '../store/hooks';

// Mock the hooks
vi.mock('../store/hooks', () => ({
  useAppSelector: vi.fn(),
}));

describe('useRole', () => {
  it('should return isAdmin true for admin role (case-insensitive)', () => {
    useAppSelector.mockReturnValue({ role: 'ADMIN', id: '1' });
    const { result } = renderHook(() => useRole());
    
    expect(result.current.isAdmin).toBe(true);
    expect(result.current.isUser).toBe(false);
    expect(result.current.role).toBe('admin');
  });

  it('should return isUser true for user role', () => {
    useAppSelector.mockReturnValue({ role: 'user', id: '2' });
    const { result } = renderHook(() => useRole());
    
    expect(result.current.isAdmin).toBe(false);
    expect(result.current.isUser).toBe(true);
    expect(result.current.role).toBe('user');
  });

  it('should handle null user', () => {
    useAppSelector.mockReturnValue(null);
    const { result } = renderHook(() => useRole());
    
    expect(result.current.isAdmin).toBe(false);
    expect(result.current.isUser).toBe(false);
    expect(result.current.role).toBe(null);
    expect(result.current.user).toBe(null);
  });

  it('should handle undefined role', () => {
    useAppSelector.mockReturnValue({ id: '3' });
    const { result } = renderHook(() => useRole());
    
    expect(result.current.isAdmin).toBe(false);
    expect(result.current.isUser).toBe(false);
    expect(result.current.role).toBe(null);
  });

  it('should handle invalid role', () => {
    useAppSelector.mockReturnValue({ role: 'moderator', id: '4' });
    const { result } = renderHook(() => useRole());
    
    expect(result.current.isAdmin).toBe(false);
    expect(result.current.isUser).toBe(false);
    expect(result.current.role).toBe('moderator');
  });
});
