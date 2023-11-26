import { describe, it, expect, vi } from 'vitest';
import { useManagePage } from '@/hooks/useManagePage';
import mockRouter from 'next-router-mock';
import { render } from '@testing-library/react';

const pushSpy = vi.spyOn(mockRouter, 'push');

describe('useManagePage', () => {
  it('Changes page and pageSize correctly', async () => {
    const query = {
      id: 'your-id',
      searchValue: 'search-value',
      pageSize: 10,
    };

    const TestComponent = () => {
      const { handlePageChange, handlePageSizeChange } = useManagePage(
        mockRouter,
        query
      );

      handlePageChange(2);
      expect(pushSpy).toHaveBeenCalledWith(
        'your-id?searchValue=search-value&page=2&pageSize=10'
      );

      handlePageSizeChange(20);
      expect(pushSpy).toHaveBeenCalledWith(
        'your-id?searchValue=search-value&page=1&pageSize=20'
      );

      return null;
    };

    render(<TestComponent />);
  });
});
