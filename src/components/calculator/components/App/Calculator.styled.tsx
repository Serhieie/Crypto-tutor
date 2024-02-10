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
    box-shadow: 12px 10px 40px rgba(10, 9, 7, 0.8);
    user-select: none;
    z-index: 10000;
  }

  .glass-block-main {
    position: absolute;
    transform: rotate(50.5deg);
    left: 0;
    width: 200%;
    height: 20%;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    z-index: 999;
    flex-shrink: 0;
  }

  .glass-block-main2 {
    position: absolute;
    transform: rotate(139deg);
    top: 0;
    width: 95%;
    height: 400%;
    background-color: rgba(255, 255, 255, 0.022);
    border-radius: 10px;
    z-index: 1;
    flex-shrink: 0;
    pointer-events: none;
  }

  @media (min-width: 500px) {
    .calc-grid {
      width: 19.3rem;
      gap: 2px;
    }
  }
`;
