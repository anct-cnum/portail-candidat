import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

describe('footer', () => {

  it('devrait faire le rendu du footer sans erreur', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('FAQ')).toBeInTheDocument();
    expect(getByText('Accessibilité: non conforme')).toBeInTheDocument();
    expect(getByText('Mentions légales')).toBeInTheDocument();
    expect(getByText('Données personnelles')).toBeInTheDocument();
  });
});
