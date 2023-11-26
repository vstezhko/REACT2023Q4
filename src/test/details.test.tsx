import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes';
import Details from "@/components/Details";
import { characterResponseMock } from "@/test/mocks/responses/characterResponseMock";

vi.mock('next/router', () => require('next-router-mock'));

describe('Details Component', () => {
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    const { findByText } = render(
      <Details
        detailsData={characterResponseMock.data.attributes}
        handleClose={() => {}}
      />
    );
    const nameLabel = await findByText(
      characterResponseMock.data.attributes.name
    );
    expect(nameLabel).toBeInTheDocument();
  });

  mockRouter.useParser(createDynamicRouteParser(['/details/:id', '/']));

  it('Ensure that clicking the close button hides the component', async () => {
    const handleClose = () => {
      mockRouter.push('/');
    };
    await mockRouter.push('/details/309c1379-8579-4401-916e-bc6a17b2b39f');
    const { queryByTestId, getByTestId } = render(
      <Details
        detailsData={characterResponseMock.data.attributes}
        handleClose={handleClose}
      />
    );
    const detailsBeforeClose = getByTestId('details');
    expect(detailsBeforeClose).toBeInTheDocument();
    const close = getByTestId('close');
    fireEvent.click(close);
    await waitFor(async () => {
      const detailsAfterClose = await queryByTestId('details');
      expect(detailsAfterClose).toBeInTheDocument();
    });
  });
});
