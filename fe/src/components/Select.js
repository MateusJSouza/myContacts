import styled from 'styled-components';

export default styled.select`
  width: 100%;
  border: none;
  background: #fff;
  border: 2px solid #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  height: 52px;
  border-radius: 4px;
  outline: none;

  font-size: 16px;

padding: 0 16px;

  transition: border-color 0.2s ease-in;
  appearance: none; // desabilita os estilos padrões do input

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;
