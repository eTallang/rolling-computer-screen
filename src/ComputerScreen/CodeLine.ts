interface CodeFragment {
  left: number;
  width: number;
}

export class CodeLine {
  private lineParts: CodeFragment[] = [];
  private dy = 2;

  constructor(
    private context: CanvasRenderingContext2D,
    private y: number,
    private lineHeight: number,
    private containerWidth: number
  ) {
    this.lineParts = this.createLineParts();
  }

  createLineParts = (): CodeFragment[] => {
    let noOfItems = 6 + Math.round(Math.random() * 3);
    if (noOfItems % 2 === 0) {
      noOfItems++;
    }

    const weightedList = new Array(noOfItems).fill(1).map((_, index) => {
      if (index === 0 || index === noOfItems - 1) {
        return 0.2 + Math.random() * 10;
      }
      return 1 + Math.random() * (index % 2 === 0 ? 1 : 6);
    });

    const totalWeight = weightedList.reduce((prev, curr) => prev + curr);
    let offsetLeft = 0;

    return weightedList.map((fragment) => {
      const width = (fragment / totalWeight) * this.containerWidth;
      const left = offsetLeft;

      offsetLeft += width;

      return {
        left: left,
        width: width,
      };
    });
  };

  update() {
    this.y -= this.dy;
    this.renderUI();
  }

  isOutOfBounds(): boolean {
    return this.y < -(this.lineHeight / 2);
  }

  private renderUI() {
    this.context.lineJoin = "round";
    this.context.lineWidth = this.lineHeight;
    this.lineParts.forEach((part, index) => {
      this.context.beginPath();
      this.context.moveTo(part.left, this.y);
      this.context.lineTo(part.left + part.width, this.y);
      this.context.closePath();
      this.context.strokeStyle = index % 2 === 0 ? "transparent" : "#579f8e";
      this.context.shadowColor = "rgb(140 241 218 / 0.2)";
      this.context.shadowBlur = 10;
      this.context.stroke();
    });
  }
}
