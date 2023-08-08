function Star($target, state, setState, min, max) {
  const $starWrapper = document.createElement("div");
  const $starBorder = document.createElement("div");
  const $star = document.createElement("div");
  $starWrapper.className = "starWrapper";
  $starBorder.className = "starBorder";
  $star.className = "star";

  const curRate = state.rate;

  this.render = () => {
    $starBorder.appendChild($star);
    $starWrapper.appendChild($starBorder);
    $target.appendChild($starWrapper);

    $starWrapper.dataset.min = min;

    let percent;
    if (min >= curRate) {
      percent = 0;
    } else if (curRate > min && curRate < max) {
      percent = ((curRate - min) / (max - min)) * 100;
    } else if (curRate >= max) {
      percent = 100;
    }

    $star.style.background = `linear-gradient(to right, orangered ${percent}%, white ${percent}%)`;
  };

  this.render();
}

export default Star;
