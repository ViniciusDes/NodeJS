import React from 'react';
import logoIconPlanoSaude from '../images/EXEOrange.png';
import CardMUI from '../components/Card/index';
const Main = () => {
  return (
    <div>
      <CardMUI
        image={logoIconPlanoSaude}
        textHeader="Plano de Saude"
        textBody="Entre para incluir o arquivo do plano de saúde e validar os dados do
        arquivo."
        destiny="Health"
      />
    </div>
  );
};

export default Main;
