import styled from "@emotion/styled";

interface AppWrapperProps {
  isCalculatorOpen: boolean;
}

export const AppWrapper = styled.div<AppWrapperProps>`
  z-index: 9999;

  transform: ${(props) =>
    props.isCalculatorOpen ? "translateX(-2%)" : "translateX(120%)"};
  transition: all 300ms linear;
  position: absolute;
  bottom: 3%;
  right: 1.6%;

  .calc-grid {
    background-color: black;
    width: 17rem;
    display: grid;
    grid-template-columns: repeat(32, 0.46rem);
    grid-template-rows: minmax(7rem, auto) repeat(40, 0.39rem);
    justify-content: center;
    padding: 20px;
    gap: 1px;

    border-radius: 10px;
    box-shadow: 5px 0px 20px 4px rgba(0, 0, 0, 1);
    user-select: none;
  }

  @media (min-width: 500px) {
    .calc-grid {
      width: 19.3rem;
      gap: 2px;
    }
  }
`;
