import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import PersonCard from "@/components/PersonCard";

describe('cards', () => {
  const props = {
    name: 'John Doe',
    gender: 'Male',
    id: '309c1379-8579-4401-916e-bc6a17b2b39f',
    image: '',
  };

  it('Ensure that the card component renders the relevant card data', () => {
    const { getByText, queryByRole } = render(<PersonCard {...props} />);

    const renderedName = getByText(props.name);
    expect(renderedName).toBeInTheDocument();
    const renderedGender = getByText(props.gender);
    expect(renderedGender).toBeInTheDocument();
    const renderedImage = queryByRole('img');
    expect(renderedImage).not.toBeInTheDocument();
  });
});
