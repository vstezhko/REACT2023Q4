import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import PersonCard from '../src/components/PersonCard';
import { MemoryRouter } from 'react-router-dom';

describe('cards', () => {
  it('Ensure that the card component renders the relevant card data', () => {
    const name = 'TestName';
    const gender = 'TestGender';
    const image = undefined;
    const { getByText, queryByRole } = render(
      <MemoryRouter>
        <PersonCard name={name} gender={gender} id={'id'} image={image} />
      </MemoryRouter>
    );

    const renderedName = getByText(name);
    expect(renderedName).toBeInTheDocument();
    const renderedGender = getByText(gender);
    expect(renderedGender).toBeInTheDocument();
    const renderedImage = queryByRole('img');
    expect(renderedImage).not.toBeInTheDocument();
  });
});
