import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
// Vc vai esta adcionando o idioma pt-br no intl

import React from 'react';

import Routes from './src/routes';
// Aqui e onde vai a nossas rotas.

export default function App() {
  return (
    <Routes />
  );
}
