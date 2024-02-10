import styled from "@emotion/styled";

export const DisplayWrapper = styled.div`
    grid-column: 1 / -1;
    grid-row: span 1;
    background-color: rgba(255, 255, 255, 0.15);

    padding: 0.1rem;
    margin-bottom: 4px;

    font-family: "Iceland", sans-serif;

    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.9);

    overflow: hidden;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    word-wrap: break-word;
    word-break: break-all;

    flex-grow: 1;
  }

  .calculator-glass {
    position: relative;
    opacity: 0.8;
    filter: alpha(opacity=80);
  }

  .glass-block2 {
    position: absolute;
    top: 50%;
    left: -30%;
    transform: translate(-50%, -50%);
    transform: rotate(50deg);
    width: 100%;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    z-index: 1;
  }

  .glass-block1 {
    position: absolute;
    top: 50%;
    left: -20%;
    transform: translate(-50%, -50%);
    transform: rotate(50deg);
    width: 100%;
    height: 4px;
    background-color: rgba(255, 255, 255, 0.02);
    border-radius: 10px;
    z-index: 1;
  }
  .glass-block3 {
    position: absolute;
    top: 50%;
    left: 40%;
    transform: translate(-50%, -50%);
    transform: rotate(50deg);
    width: 100%;
    height: 80px;
    background-color: rgba(255, 255, 255, 0.02);
    border-radius: 10px;
    z-index: 1;
  }

 .prev-operand {
    color: rgb(254, 208, 123);
    font-size: 1.4rem;
    padding:0;
  }

  .curr-operand {
    color: rgb(255, 187, 60);
    font-size: 1.9rem;
    padding: 0;
  }

  .limit-msg {
    height: 16px;
    margin: 0;
    padding: 0;
    color: rgb(255, 187, 60);
    font-size: 1.7rem;
  }
`;
