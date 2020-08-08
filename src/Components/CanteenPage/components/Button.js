import styled from "styled-components";

export const ButtonContainer = styled.button`
  text-transform: capitalize;
  font-size: 1.4rem;
  background: transparent;

  border: 0.05rem solid #c59d5f;
  color: var(--navColor);
  border-radiues: 0.5rem;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  margin: 0.2rem 0.5rem 0.2rem 0;
  transition: all 0.5s ease-in-out;
  &:hover {
    // background: var(--lightBlue);
    // color: var(--mainBlue);
    background: hsl(210, 22%, 49%);
    color: black;
  }
  &:focus {
    outline: none;
  }
`;
