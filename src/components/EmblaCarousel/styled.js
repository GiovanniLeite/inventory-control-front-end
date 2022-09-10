import styled from 'styled-components';

export const Container = styled.div`
  padding: 0;

  .embla {
    position: relative;
    background-color: #f7f7f7;
    padding: 20px;
    max-width: 670px;
    margin-left: auto;
    margin-right: auto;
  }

  .embla__viewport {
    overflow: hidden;
    width: 100%;
  }

  .embla__viewport.is-draggable {
    cursor: move;
    cursor: grab;
  }

  .embla__viewport.is-dragging {
    cursor: grabbing;
  }

  .embla__container {
    display: flex;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -webkit-tap-highlight-color: transparent;
    margin-left: -10px;
  }

  .embla__slide {
    padding-left: 10px;
    min-width: 100%;
    position: relative;
  }

  .embla__slide__inner {
    position: relative;
    overflow: hidden;
  }

  .embla__slide__img {
    width: 100%;
  }

  .embla--thumb {
    padding-top: 0;
    margin-top: -15px;
  }

  .embla__container--thumb {
    cursor: default;
    margin-left: -8px;
  }

  .embla__slide--thumb {
    padding-left: 8px;
    min-width: 20%;
  }

  .embla__slide__inner--thumb {
    touch-action: manipulation;
    cursor: pointer;
    border: 0;
    outline: 0;
    margin: 0;
    padding: 0;
    height: 60px;
    width: 100%;
    background-color: transparent;
    position: relative;
    display: block;
    overflow: hidden;
  }

  .embla__slide__thumbnail {
    position: absolute;
    opacity: 0.2;
    top: 0;
    bottom: 0;
    left: -10000%;
    right: -10000%;
    margin: auto;
    min-width: 1000%;
    min-height: 1000%;
    max-width: none;
    transform: scale(0.1);
    transition: opacity 0.2s;
  }

  .embla__slide--thumb.is-selected .embla__slide__thumbnail {
    opacity: 1;
  }
`;
