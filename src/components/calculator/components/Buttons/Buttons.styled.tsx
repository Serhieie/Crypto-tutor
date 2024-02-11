import styled from "@emotion/styled";

export const StyledButtons = styled.button`
  position: relative;
  cursor: pointer;
  font-size: 2rem;

  display: flex;
  outline: none;
  border: none;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  background-color: #3d4247;
  box-shadow: inset 1px 1px 12px #232629;
  border-radius: 2px;

  color: rgba(255, 255, 255, 0.6);

  transition: all 300ms ease-in-out;

  &:hover,
  &:focus {
    opacity: 0.6;
    color: rgba(255, 255, 255, 1);
    box-shadow: inset 4px 2px 16px #232629;
  }

  &.span-two.first-item:hover,
  &.span-two.first-item:focus,
  &.span-two.last-item:hover,
  &.span-two.last-item:focus {
    opacity: 0.85;
    color: rgba(255, 255, 255, 1);
    box-shadow: inset 4px 2px 16px #232629;
  }

  &.item {
    transition: all 300ms ease-in-out;
    grid-column: span 8;
    grid-row: span 8;
  }

  &.item.del {
    grid-column: span 5;
    font-size: 1rem;
  }

  &.item.percentage {
    grid-column: span 5;
    grid-row: span 8;
  }

  &.item.pow,
  &.item.sqrt {
    font-size: 1.6rem;
    grid-column: span 6;
    grid-row: span 4;
  }

  &.item.pow {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  &.item.sqrt {
    font-size: 1rem;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  &.item.multiply,
  &.item.add,
  &.item.subtract,
  &.item.divide {
    grid-column: span 8;
    grid-row: span 8;
    background-color: rgb(196, 155, 73);
    color: rgba(0, 0, 0, 0.6);
  }

  &.item.multiply:focus,
  &.item.add:focus,
  &.item.subtract:focus,
  &.item.divide:focus,
  &.item.multiply:hover,
  &.item.add:hover,
  &.item.subtract:hover,
  &.item.divide:hover {
    opacity: 0.6;
    color: rgba(255, 255, 255, 1);
    box-shadow: inset 4px 2px 16px #232629;
  }

  &.item.divide {
    border-top-right-radius: 10px;
  }

  &.item.decimal {
    grid-column: span 8;
  }

  &.item.zero {
    grid-column: span 8;
    border-bottom-left-radius: 10px;
  }

  .glass-block-btn {
    position: absolute;
    top: -65%;
    right: -30%;
    width: 60%;
    height: 200%;
    background-color: rgba(255, 255, 255, 0.01);
    transform: rotate(140deg);
    border-radius: 2px;
    z-index: 1;
  }

  .glass-block-btn2 {
    position: absolute;
    width: 8%;
    height: 100%;
    right: 0;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 2px;
    z-index: 1;
  }

  &.span-two.first-item {
    grid-column: span 8;
    grid-row: span 8;
    background-color: rgb(169, 42, 42);
    border-top-left-radius: 10px;
  }

  &.span-two.last-item {
    grid-column: span 16;
    grid-row: span 8;
    background-color: rgb(31, 57, 151);
    border-bottom-right-radius: 10px;
  }
`;
