import styled from 'styled-components';

export const Container = styled.div`
  /*
    Quero que, se a tela tiver mais de 500px, o container ocupe apenas 500px,
    mas se o usuário tiver em um dispositivo menor, ele irá ocupar 100% do espaço
  */
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 16px;
`;
