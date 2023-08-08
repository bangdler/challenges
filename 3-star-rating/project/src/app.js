import Star from "./star.js";

const DESCRIPTIONS = [
  "We're sorry to hear that you had a bad experience. We would like to learn more about what happened and how we can make things right.",
  "We apologize for the inconvenience you experienced. We appreciate your feedback and would like to work with you to address any issues.",
  "Thank you for your feedback. We're sorry to hear that your experience wasn't perfect. We would love to hear more about your concerns to see how we can improve.",
  "Thank you for your positive feedback! We're glad to know that you had a great experience and we appreciate your support.",
  "We're thrilled to hear you had such a positive experience. Thank you for choosing our product/service.",
  "Perfect!",
];

const THROTTLE_TIME_60HZ = 16;

function App($target) {
  this.$layout = document.createElement("div");
  this.$question = document.createElement("p");
  this.$starBox = document.createElement("div");
  this.$rate = document.createElement("p");
  this.$description = document.createElement("p");
  this.throttle = false;

  this.state = {
    rate: 0,
    isSelected: false,
  };

  this.setState = (newState) => {
    this.state = newState;
    this.update();
  };

  this.update = () => {
    const $newStarBox = document.createElement("div");
    $newStarBox.className = "starBox";
    for (let i = 0; i < 5; i++) {
      new Star($newStarBox, this.state, this.setState, i, i + 1);
    }
    this.$starBox.replaceWith($newStarBox);
    this.$starBox = $newStarBox;

    this.$rate.innerText = this.state.rate;

    if (this.state.isSelected) {
      const descriptionIdx = Math.floor(this.state.rate);
      this.$description.innerText = DESCRIPTIONS[descriptionIdx];
    }
  };

  this.render = () => {
    this.$layout.className = "layout";
    this.$starBox.className = "starBox";
    this.$layout.appendChild(this.$question);
    this.$layout.appendChild(this.$starBox);
    this.$layout.appendChild(this.$rate);
    this.$layout.appendChild(this.$description);
    this.$question.innerText =
      "How many stars would you give to our Online Code Editor?";

    for (let i = 0; i < 5; i++) {
      new Star(this.$starBox, this.state, this.setState, i, i + 1);
    }

    this.$rate.innerText = this.state.rate;

    const descriptionIdx = Math.floor(this.state.rate);
    this.$description.innerText = DESCRIPTIONS[descriptionIdx];

    $target.appendChild(this.$layout);
  };

  this.handleClick = (e) => {
    if (!e.target.closest(".starBox")) return;
    const newState = {
      ...this.state,
      isSelected: !this.state.isSelected,
    };
    this.setState(newState);
  };

  this.handleMousemove = (e) => {
    if (this.state.isSelected) return;
    if (this.throttle) return;

    this.throttle = true;
    setTimeout(() => {
      this.throttle = false;

      const $curStarWrapper = e.target.closest(".starWrapper");
      if (!$curStarWrapper) return;

      const $curStar = $curStarWrapper.querySelector(".star");
      const min = +$curStarWrapper.dataset.min;
      const percent =
        e.offsetX < 0
          ? 0
          : Math.floor((e.offsetX / $curStarWrapper.clientWidth) * 100);

      $curStar.style.background = `linear-gradient(to right, lime ${percent}%, white ${percent}%)`;

      const rate = (min + percent / 100).toFixed(1);
      const newState = {
        ...this.state,
        rate,
      };

      this.setState(newState);
    }, THROTTLE_TIME_60HZ);
  };

  this.setEvent = () => {
    $target.addEventListener("click", this.handleClick);
    $target.addEventListener("mousemove", this.handleMousemove);
  };

  this.render();
  this.setEvent();
}

export default App;
